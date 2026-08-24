# SunEx Technologies Website Checklist Audit

**Prepared by:** Manus AI  
**Audit scope:** Current development version of the SunEx Technologies website  
**Reference framework:** Checklist Design’s Landing Page, Contact Us, About, and FAQ website checklists [1] [2] [3] [4]

## Executive assessment

> **Conclusion: the website has a strong marketing and interaction foundation, but it is not fully complete against the applicable checklist.**

The current site is visually cohesive, responsive, and conversion-oriented. It has clear vertical-specific messaging for UrbanTree, SkillConnect, and SunEx Healthcare; tangible hero visuals; route-level calls to action; a guided enquiry flow; a humanised About page; and several accessible interactive experiences. The current automated suite passes **15 tests**, TypeScript validation, and the production build.

Against the **20 directly applicable checklist items**, the current assessment is **12 complete, 4 partial, and 4 missing**. The main remaining work is not visual polish. It is **trust, decision support, privacy disclosure, and technical discoverability**.

| Assessment | Count | Interpretation |
|---|---:|---|
| Complete | 12 | The user-facing foundation is present and demonstrable. |
| Partial | 4 | A credible foundation exists, but supporting evidence or clarity is incomplete. |
| Missing | 4 | The visitor currently lacks information required for confidence or self-service. |
| Not applicable yet | 4 | Only needed when future content volume or verified company material justifies it. |

## Checklist compliance

### Landing page requirements

Checklist Design expects a conversion-oriented landing page to use a clear headline and subheadline, a tangible hero visual, one obvious action, outcome-led benefits, trust signals, objection handling, and a repeated CTA.[1]

| Requirement | Status | Current SunEx evidence | Required follow-up |
|---|---|---|---|
| Clear headline | **Complete** | The home hero communicates a distinct outcome for each vertical, such as “Air that helps cities breathe better.” | Maintain the current direct outcome-led style. |
| Supporting subheadline | **Complete** | Each hero adds a concise description of the relevant offer and audience. | Keep claims tied to approved material. |
| Tangible hero visual | **Complete** | UrbanTree, SkillConnect, and Healthcare have image-led hero scenes; UrbanTree uses the supplied device image. | Replace any remaining generic or stock-like imagery with approved real deployment assets when available. |
| Primary CTA | **Partial** | Contextual actions such as “Discuss UrbanTree” and “Talk to our learning team” are prominent. The home carousel still presents multiple possible actions as it rotates. | Add a stable page-level primary action or make the selected vertical explicit before the CTA changes. |
| Social proof | **Missing** | The site shows approved company indicators and a “Proof of impact” section, but not named verified deployments, partner logos, case studies, testimonials, or customer evidence. | Publish only approved partner logos, deployment locations, outcomes, or case studies. Do **not** fabricate reviews, ratings, or testimonials. |
| Key benefits | **Complete** | Each vertical describes clear outcomes and includes benefit-led interactive content. | Continue to favour outcomes over generic feature claims. |
| Objection handling | **Partial** | Guided enquiry, “Coming soon” labelling, and course-detail prompts help, but common questions on pricing, implementation, course duration, eligibility, and healthcare coordination are not answered. | Add an approved FAQ or decision-support section. |
| Repeated CTA | **Complete** | Major pages end with a clear conversation or enquiry action. | Keep destination-specific query parameters where possible. |

### Contact requirements

Checklist Design expects a contact experience to carry the brand, provide clear contact methods, segment different conversation types, and remain easy to reach from navigation.[2]

| Requirement | Status | Current SunEx evidence | Required follow-up |
|---|---|---|---|
| Brand personality | **Complete** | The guided enquiry flow uses the same visual language and focused, positive tone as the rest of the site. | Maintain this consistent experience. |
| Clear methods to contact | **Complete** | The form, direct email, India location, and response-time guidance are available on `/contact`. | Add a verified phone or WhatsApp option only if the business supports it. |
| Social contact options | **Missing** | No social-platform contact links are currently visible. | Add only active, monitored official profiles. Otherwise, this item may remain intentionally omitted. |
| Segmented contact methods | **Complete** | Visitors can select UrbanTree, SkillConnect, Healthcare, Partnership, CSR, or another focus before submitting. | Consider routing each focus to a tailored confirmation message or response SLA. |
| Easy to reach | **Complete** | Contact is present in desktop navigation, mobile navigation, footer, persistent conversation actions, and end-of-page CTAs. | No structural change is needed. |

### About requirements

Checklist Design recommends a clear origin story, mission or values, people, credible milestones, relevant backers, and a clear CTA.[3]

| Requirement | Status | Current SunEx evidence | Required follow-up |
|---|---|---|---|
| Origin story | **Partial** | The purpose and problem space are clear, but there is no explicit founding narrative: why SunEx began, the initial insight, or an early milestone. | Add a short founder-approved origin story. |
| Mission and values | **Complete** | Vision, mission, and six values are clearly presented. | No structural change is needed. |
| Team | **Complete** | The site introduces named founders and a mentor with roles and portraits. | Add more team profiles only when approved. |
| Milestones or traction | **Partial** | Home-page indicators provide some traction, but there is no dated company timeline or verified launch/deployment history. | Add a dated milestones section using approved facts only. |
| Investors or backers | **Not applicable** | No approved investor or accelerator material is available. | Do not add this section until verified information is supplied. |
| CTA | **Complete** | The page directs visitors to explore work or start a conversation. | No structural change is needed. |

### FAQ and decision support

Checklist Design treats FAQs as a structured self-service resource for decision questions, escalation, and—when content grows—topic navigation and search.[4]

| Requirement | Status | Current SunEx evidence | Required follow-up |
|---|---|---|---|
| Purposeful answers | **Missing** | There is no FAQ or equivalent self-service section. | Add answers to real questions approved by the sales, education, UrbanTree, and healthcare teams. |
| Escalation contact | **Missing** | Contact routes exist globally, but an FAQ experience does not yet point a visitor to the right route after an unanswered question. | Add “Still need help?” actions for each FAQ topic. |
| Table of contents | **Not applicable yet** | Not required until a sizeable FAQ exists. | Add topic navigation once there are roughly 10 or more questions. |
| Search | **Not applicable yet** | Not required until FAQ content is large enough to justify it. | Add keyword search only after the content volume warrants it. |
| Topic navigation | **Not applicable yet** | No FAQ topics are currently published. | Segment future questions by UrbanTree, Courses, Healthcare, Partnerships, and General. |

## Cross-cutting experience review

The responsive review covered Home, About, Product, Education, Healthcare, and Contact at desktop and mobile widths. Navigation remains usable on mobile; major headers, calls to action, content sections, course cards, and care-journey panels reflow without apparent viewport overflow. The site also supports keyboard-operable selection controls, labelled interactive groups, `aria-live` updates for changing content, and a reduced-motion path for non-essential animation.

The current functional baseline is healthy. The automated suite verifies server contact handling, shared navigation, Home, Product, Education, Healthcare, and Reveal behaviour. The latest validation passed 15 tests, `tsc --noEmit`, and the production build.

| Area | Status | Evidence | Priority |
|---|---|---|---|
| Responsive layout and navigation | **Complete** | Desktop and mobile route review shows clear reflow and a functioning menu. | Maintain. |
| Interaction accessibility | **Complete / partial** | Selected states, semantic buttons, aria labels, and live updates are present in major interactive sections. | Add a formal accessibility scan before publication. |
| Reduced motion | **Complete** | Core motion components and image transitions have reduced-motion handling. | Maintain. |
| Error route | **Complete** | A Not Found route and error boundary are registered. | Add a user-facing support link to the 404 page if needed. |
| Global SEO basics | **Partial** | A global title, meta description, language declaration, viewport, favicon, analytics, and route-level code splitting are present. | Add per-page metadata, canonical URLs, Open Graph/Twitter tags, and structured data where appropriate. |
| Crawlability | **Missing** | No `robots.txt` or sitemap was found in the public directory. | Add both before indexing or launch. |
| Zoom accessibility | **Missing** | The current viewport declaration uses `maximum-scale=1`, which can prevent user zoom. | Remove the zoom restriction. |
| Skip navigation | **Missing** | No visible skip-to-content link was found. | Add a focus-visible skip link before navigation. |
| Privacy disclosure | **Missing** | The enquiry form collects identity and contact information but has no visible privacy notice or policy link. | Add an approved privacy notice beside the submit action and a privacy-policy page. |
| Performance evidence | **Partial** | The production build succeeds and routes are lazy-loaded, but no Lighthouse, field-data, image-byte, or published-site audit has been completed. | Measure production performance before launch and optimise based on results. |

## Prioritized action plan

| Priority | Action | Why it matters | Evidence required before implementation |
|---|---|---|---|
| **P0** | Add a privacy notice beside the enquiry submit button and publish a privacy-policy page. | The site collects names, emails, phone numbers, organisations, and project messages. | Approved privacy copy and data-contact details. |
| **P0** | Remove `maximum-scale=1` from the viewport meta tag. | Visitors must be able to zoom text and interfaces as needed. | No business input required. |
| **P1** | Build a topic-based FAQ/decision-support section. | It completes the main objection-handling gap and reduces repetitive enquiries. | Approved answers for UrbanTree, courses, healthcare, partnership, and general enquiries. |
| **P1** | Add verified trust evidence. | This is the largest landing-page conversion gap. | Partner approvals, deployments, outcomes, certifications, or case-study material. |
| **P1** | Add `robots.txt`, `sitemap.xml`, per-page metadata, canonical URLs, and social-preview tags. | It improves discoverability and share quality. | Approved canonical domain and social-preview imagery. |
| **P2** | Add a short founder-approved origin story and dated company milestones. | This completes the About-page credibility narrative. | Approved founding year, timeline, and milestone facts. |
| **P2** | Add a skip link and run an automated accessibility audit. | It strengthens keyboard and assistive-technology access. | No business input needed for the skip link; audit results guide refinements. |
| **P2** | Run Lighthouse and published-site performance checks. | Build success is not proof of production speed or Core Web Vitals. | Published URL or an approved pre-production target. |

## Recommended next step

The recommended sequence is to complete the **privacy notice and zoom fix first**, then build an **approved FAQ**, then add **verified proof-of-impact content**. These changes will make the existing polished visual and interaction work more credible, accessible, and conversion-ready without inventing any customer evidence.

## References

[1]: [Checklist Design — Landing Page Website](https://www.checklist.design/website/landing-page)  
[2]: [Checklist Design — Contact Us Website](https://www.checklist.design/website/contact-us)  
[3]: [Checklist Design — About Website](https://www.checklist.design/website/about)  
[4]: [Checklist Design — FAQ Website](https://www.checklist.design/website/faq)
