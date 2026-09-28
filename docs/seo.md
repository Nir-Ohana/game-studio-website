# SEO verification and indexing

Updated September 28, 2026.

The homepage, Shelly Jigsaw, Rocket Rabbit and Shelly privacy policy have unique titles, descriptions, canonical URLs and social previews. Dedicated game pages contain current game information, screenshots, FAQs and crawlable links. JSON-LD connects Organization, WebSite, WebPage, VideoGame and BreadcrumbList entities. Games remain labeled in development; no unverified offers, ratings or launch dates are published.

The generated sitemap at https://ohana-studios.me/sitemap-index.xml lists the four canonical pages through sitemap-0.xml. robots.txt permits crawling and advertises that sitemap. The legacy privacy redirect is excluded from the sitemap; the privacy policy and app-ads.txt remain available.

## Verification

Astro type checks, production build and nine build-output SEO tests pass. Independent source and generated-output review found no important defects. Chromium checks cover all four pages at 1440, 768, 390 and 320 pixels, including image decoding, font loading and keyboard-operated FAQs. Desktop and mobile screenshots were visually reviewed.

The mobile Lighthouse baseline on the previous live homepage scored performance 89, accessibility 100, best practices 100 and SEO 100, with LCP 3.0 seconds, CLS 0 and total blocking time 0. The SEO score is a limited automated audit, not proof of indexing or complete SEO coverage.

Observed performance fixes include locally served Nunito, smaller WebP background images, 128-pixel display icons and responsive screenshot variants. The updated local preview scored 100 in all four categories with LCP 1.4 seconds, CLS 0 and total blocking time 0. Live mobile measurements after successful publication:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | 97 | 100 | 100 | 100 | 0.95 s | 0 | 0 ms |
| Shelly Jigsaw | 100 | 100 | 100 | 100 | 1.12 s | 0 | 0 ms |
| Rocket Rabbit | 100 | 100 | 100 | 100 | 1.16 s | 0 | 0 ms |

GitHub Pages deployment [36470509763](https://github.com/Nir-Ohana/game-studio-website/actions/runs/36470509763) published commit `360adb5`. Production Chromium checks confirmed all four canonical pages, JSON-LD, image loading and mobile layout; robots, sitemap XML, privacy redirect and app-ads.txt also passed. Lighthouse 13.5.0 JSON reports and browser screenshots are saved locally outside the repository in `C:/Users/Nir/AppData/Local/Temp/ohana-seo-20260928/`.

Lighthouse results are laboratory measurements and vary by run. Field Core Web Vitals were not obtained: the public PageSpeed API returned HTTP 429 with its unauthenticated daily quota exhausted. Do not treat these laboratory results as real-user Core Web Vitals evidence.

## Google indexing

Search Console is not connected to this session. GSC Wizard was suggested but has not been connected. Public search did not provide positive indexing evidence; that does not establish whether Google has indexed the site. No sitemap submission or indexing request has been made on the user's behalf.

With access to the verified Search Console property, submit `https://ohana-studios.me/sitemap-index.xml`, inspect the homepage and both game URLs, and request indexing where appropriate. If property verification is needed, Google's HTML verification meta tag can be added to the shared layout. Actual indexing remains Google's decision.

## References

- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [VideoGame vocabulary](https://schema.org/VideoGame)
- [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
