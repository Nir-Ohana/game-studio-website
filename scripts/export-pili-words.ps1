param(
    [string]$GamePath = 'C:\dev\venn-puzzle',
    [string]$Godot = 'C:\dev\godot\Godot_v4.7.1-stable_win64_console.exe'
)

# Exports Pili Words with the game's own Web preset and installs it as the
# website demo in public/pili-words-play. The game checkout is only read.
$ErrorActionPreference = 'Stop'
$sitePath = Split-Path $PSScriptRoot -Parent
$GamePath = (Resolve-Path -LiteralPath $GamePath).Path
$Godot = (Resolve-Path -LiteralPath $Godot).Path
$outputPath = Join-Path ([IO.Path]::GetTempPath()) ('pili-words-web-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $outputPath | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)

$log = Join-Path $outputPath 'export.log'
& $Godot --headless --path $GamePath --export-release Web (Join-Path $outputPath 'index.html') *> $log
$text = [IO.File]::ReadAllText($log)
if ($text -match '(?m)(SCRIPT ERROR:|ERROR:)') { throw "Export failed. Log: $log" }
foreach ($file in @('index.html', 'index.js', 'index.wasm', 'index.pck')) {
    if (-not (Test-Path -LiteralPath (Join-Path $outputPath $file))) { throw "Export missing $file. Log: $log" }
}
Remove-Item -LiteralPath $log

# Give each game pack a content-based URL so returning visitors get new puzzles.
$packPath = Join-Path $outputPath 'index.pck'
$packName = 'index.' + (Get-FileHash -LiteralPath $packPath -Algorithm SHA256).Hash.Substring(0, 12).ToLowerInvariant() + '.pck'
Move-Item -LiteralPath $packPath -Destination (Join-Path $outputPath $packName)
$htmlPath = Join-Path $outputPath 'index.html'
$html = [IO.File]::ReadAllText($htmlPath)
$html = $html.Replace('"index.pck":', ('"' + $packName + '":'))
$html = $html.Replace('"executable":"index"', ('"executable":"index","mainPack":"' + $packName + '"'))
[IO.File]::WriteAllText($htmlPath, $html, $utf8)

$destination = Join-Path $sitePath 'public/pili-words-play'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $outputPath -File | Copy-Item -Destination $destination -Force
# Remove only superseded packs inside the website's demo directory.
$destination = (Resolve-Path -LiteralPath $destination).Path
if ($destination -ne [IO.Path]::GetFullPath((Join-Path $sitePath 'public/pili-words-play'))) { throw 'Unexpected demo destination.' }
Get-ChildItem -LiteralPath $destination -File | Where-Object { $_.Name -match '^index(\.[0-9a-f]{12})?\.pck$' -and $_.Name -ne $packName } | Remove-Item -Force
Remove-Item -LiteralPath $outputPath -Recurse -Force
Write-Output "Updated $destination with $packName."
