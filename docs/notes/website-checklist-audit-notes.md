# Website Checklist Audit Notes

## Source review

The supplied [Checklist Design website index](https://www.checklist.design/website) exposes specialised website checklists. The **Landing Page** checklist is directly applicable to SunEx’s public homepage and vertical landing experiences. It evaluates eight areas: a clear headline, a supporting subheadline, a tangible hero visual, one primary conversion action, social proof, outcome-led benefits, objection handling, and a repeated bottom-of-page CTA.[^landing]

## Initial audit scope

The SunEx review will prioritise the Landing Page checklist, then apply relevant Contact Us, About, Privacy, Accessibility, performance, and responsive-design checks where they fit the current marketing website. The audit will distinguish implemented experience from verified evidence and will not treat unverified metrics, logos, reviews, or testimonials as complete.

## Contact-us criteria

The **Contact Us** checklist evaluates five relevant concerns: brand-aligned personality, clear contact methods, social options where appropriate, segmentation between support and sales contact paths, and navigation access from the header or footer.[^contact] The current SunEx guided enquiry flow will be measured against each of these items.

## Availability note

The Privacy item shown in the source directory did not resolve at the predictable `/website/privacy` address and redirected to the source site’s 404 page during review. It will therefore be treated as an internal audit item rather than a Checklist Design criterion; the SunEx contact form still needs a visible privacy notice because it collects enquiry information.

## About and FAQ criteria

The **About** checklist tests for an authentic origin story, plainly stated mission or values, a human team presentation, credible milestones or traction, relevant backers where applicable, and a clear next step.[^about] The **FAQ** checklist tests whether information answers real decision questions, includes an escalation path, and scales with topic navigation and search when the question set becomes large.[^faq]

[^landing]: [Checklist Design, “Landing Page Website”](https://www.checklist.design/website/landing-page).
[^contact]: [Checklist Design, “Contact Us Website”](https://www.checklist.design/website/contact-us).
[^about]: [Checklist Design, “About Website”](https://www.checklist.design/website/about).
[^faq]: [Checklist Design, “FAQ Website”](https://www.checklist.design/website/faq).

## Current SunEx evidence

The desktop and mobile route review covered Home, About, UrbanTree Product, SkillConnect Education, Healthcare, and Contact. The site has a clear responsive visual system, prominent contextual CTAs, working route-level navigation, guided contact segmentation, an accessible interactive UrbanTree treatment selector, an individual-course SkillConnect catalogue, and interactive Healthcare care-journey imagery. The current automated validation passes **15 tests**, TypeScript checking, and the production build.

The Home experience includes a clear headline/subheadline combination, tangible vertical imagery, benefit-oriented explanation, proof indicators, and a lower-page enquiry CTA. The Contact experience contains brand-aligned guided choices, a direct email address, location information, response-time guidance, and a persisted enquiry form with success and error states. The About experience includes mission, vision, values, identifiable leadership, and a CTA.

## Observed gaps and qualifications

The website does not currently present verified customer logos, case studies, testimonials, deployment stories, or named partner proof. No FAQ or self-service decision-support page exists, and there is no privacy notice or privacy-policy link adjacent to the enquiry form. The form does not display a phone contact method or social channels. The About page has no explicit founding narrative or dated milestones; investor/backer presentation should remain absent unless verified material is supplied.

At the technical level, there is a global title, description, favicon, analytics script, lazy route loading, a 404 route, an error boundary, keyboard-operable selectors, aria-live updates, and reduced-motion handling. The audit also found no `robots.txt` or sitemap in the public directory, no per-page metadata or Open Graph tags, no visible skip link, and the viewport meta tag currently restricts user zoom with `maximum-scale=1`. The current production build is valid but has not been measured with Lighthouse, automated accessibility analysis, field performance data, or a published-site crawl.

## Sitemap implementation constraint

The sitemap protocol and Google’s current guidance require fully qualified, absolute URLs in sitemap entries.[^sitemap-protocol] [^sitemap-google] Because SunEx has not provided an approved final public domain, the implementation adds root-level crawl rules and route-aware canonical metadata but intentionally does not publish a sitemap with guessed URLs.

[^sitemap-protocol]: [Sitemaps.org, “Sitemaps XML format”](https://www.sitemaps.org/protocol.html).
[^sitemap-google]: [Google Search Central, “Build and submit a sitemap”](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
