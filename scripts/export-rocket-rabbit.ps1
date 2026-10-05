param(
    [string]$GamePath = 'C:\Users\Nir\orca\rocket-rabbit',
    [string]$Godot = 'C:\dev\godot\Godot_v4.7.1-stable_win64_console.exe'
)

$ErrorActionPreference = 'Stop'
$sitePath = Split-Path $PSScriptRoot -Parent
$GamePath = (Resolve-Path -LiteralPath $GamePath).Path
$Godot = (Resolve-Path -LiteralPath $Godot).Path
$stagePath = Join-Path ([IO.Path]::GetTempPath()) ('rocket-rabbit-web-' + [guid]::NewGuid())
$outputPath = Join-Path $stagePath 'output'
New-Item -ItemType Directory -Path $stagePath, $outputPath | Out-Null

# Export a separate copy, including the game's current uncommitted changes.
# The Android project and the player's local save are never modified.
foreach ($item in @('src', 'assets', 'project.godot', 'export_presets.cfg', 'default_bus_layout.tres')) {
    Copy-Item -LiteralPath (Join-Path $GamePath $item) -Destination $stagePath -Recurse
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
$projectPath = Join-Path $stagePath 'project.godot'
$project = [IO.File]::ReadAllText($projectPath)
$project = $project -replace '(?m)^run/main_scene=.*', 'run/main_scene="res://src/web_demo/WebDemo.tscn"'
$project = $project -replace '(?m)^renderer/rendering_method="mobile"', 'renderer/rendering_method="gl_compatibility"'
$project = $project -replace '(?m)^sensors/enable_(accelerometer|gyroscope)=true', 'sensors/enable_$1=false'
$project = $project -replace '(?m)^buses/default_bus_layout=.*', 'buses/default_bus_layout="res://default_bus_layout.tres"'
[IO.File]::WriteAllText($projectPath, $project, $utf8)
# A fresh import cannot load the custom theme font before its .fontdata exists.
[IO.File]::WriteAllText($projectPath, ($project -replace '(?m)^theme/custom_font=.*\r?\n', ''), $utf8)
$busPath = Join-Path $stagePath 'default_bus_layout.tres'
[IO.File]::WriteAllText($busPath, ([IO.File]::ReadAllText($busPath) -replace 'send = &""', 'send = &"Master"'), $utf8)

# Browser steering uses the game's own multi-touch arrows and BLAST button.
# Select it after ProfileService loads, before Main creates the HUD and tutorial.
$demoPath = Join-Path $stagePath 'src/web_demo/WebDemo.gd'
$demo = [IO.File]::ReadAllText($demoPath)
if ($demo -notmatch 'func _ready\(\) -> void:') { throw 'WebDemo entry point has changed; update the browser control override.' }
$demo = $demo -replace 'func _ready\(\) -> void:', "func _ready() -> void:`n`tProfileService.set_controls(`"touch`")"
[IO.File]::WriteAllText($demoPath, $demo, $utf8)
# Motion sensors are disabled for this export, so keep steering on touch controls.
$settingsPath = Join-Path $stagePath 'src/ui/SettingsScreen.gd'
$settings = [IO.File]::ReadAllText($settingsPath)
$settings = $settings -replace '(?m)^(\tsteering_button.text = [^\r\n]*)\r?$', ('${1}' + "`n`tsteering_button.disabled = true")
[IO.File]::WriteAllText($settingsPath, $settings, $utf8)

function Read-Log([string]$Path) {
    $stream = [IO.File]::Open($Path, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::ReadWrite)
    $reader = New-Object IO.StreamReader($stream)
    try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}

function Invoke-GodotStage([string]$Name, [string[]]$Arguments, [string]$DoneMarker) {
    $stdout = Join-Path $stagePath "$Name.log"
    $stderr = Join-Path $stagePath "$Name-errors.log"
    $process = Start-Process -FilePath $Godot -ArgumentList $Arguments -WindowStyle Hidden -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
    $deadline = (Get-Date).AddMinutes(5)
    $lastLength = -1
    $settled = 0
    while (-not $process.HasExited) {
        Start-Sleep -Seconds 1
        $log = Read-Log $stdout
        if ($log -match $DoneMarker -and $log.Length -eq $lastLength) { $settled++ } else { $settled = 0 }
        $lastLength = $log.Length
        # Some Windows Godot exports finish writing but leave the process running.
        if ($settled -ge 4) { $process.Kill(); break }
        if ((Get-Date) -gt $deadline) { $process.Kill(); throw "$Name timed out. Logs: $stagePath" }
    }
    $process.WaitForExit()
    $log = (Read-Log $stdout) + (Read-Log $stderr)
    if ($log -match '(?m)(SCRIPT ERROR:|ERROR:)') {
        $errors = ($log -split "`n" | Where-Object { $_ -match 'SCRIPT ERROR:|ERROR:' }) -join "`n"
        throw "$Name failed. Logs: $stagePath`n$errors"
    }
    if ($log -notmatch $DoneMarker) { throw "$Name did not complete. Logs: $stagePath`n$log" }
    Write-Output "$Name complete."
}

Write-Output "Staging current Rocket Rabbit at $stagePath"
Invoke-GodotStage 'import' @('--headless', '--path', ('"' + $stagePath + '"'), '--editor', '--import', '--quit') 'DONE.*loading_editor_layout'
[IO.File]::WriteAllText($projectPath, $project, $utf8)
Invoke-GodotStage 'export' @('--headless', '--path', ('"' + $stagePath + '"'), '--export-release', 'Web', ('"' + (Join-Path $outputPath 'index.html') + '"'), '--quit') 'DONE.*savepack'

foreach ($file in @('index.html', 'index.js', 'index.wasm', 'index.pck')) {
    if (-not (Test-Path -LiteralPath (Join-Path $outputPath $file))) { throw "Export missing $file. Logs: $stagePath" }
}
# Give each game pack a content-based URL so returning visitors get new controls.
$packPath = Join-Path $outputPath 'index.pck'
$packName = 'index.' + (Get-FileHash -LiteralPath $packPath -Algorithm SHA256).Hash.Substring(0, 12).ToLowerInvariant() + '.pck'
Move-Item -LiteralPath $packPath -Destination (Join-Path $outputPath $packName)
$htmlPath = Join-Path $outputPath 'index.html'
$html = [IO.File]::ReadAllText($htmlPath)
$html = $html.Replace('"index.pck":', ('"' + $packName + '":'))
$html = $html.Replace('"executable":"index"', ('"executable":"index","mainPack":"' + $packName + '"'))
[IO.File]::WriteAllText($htmlPath, $html, $utf8)
$destination = Join-Path $sitePath 'public/rocket-rabbit-play'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $outputPath -File | Copy-Item -Destination $destination -Force
# Remove only superseded packs inside the website's verified demo directory.
$destination = (Resolve-Path -LiteralPath $destination).Path
if ($destination -ne [IO.Path]::GetFullPath((Join-Path $sitePath 'public/rocket-rabbit-play'))) { throw 'Unexpected demo destination.' }
Get-ChildItem -LiteralPath $destination -File | Where-Object { $_.Name -match '^index(\.[0-9a-f]{12})?\.pck$' -and $_.Name -ne $packName } | Remove-Item -Force
Write-Output "Updated $destination. Export logs: $stagePath"
