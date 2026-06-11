# Product

## Register

brand

(The public site is the primary surface and carries the brand. The member dashboard and admin panel are product-register surfaces: quiet, familiar, task-first.)

## Users

1. **Legislative staff and public officials** (PA Senate offices, local government). They land here to vet NYTT before taking a meeting or reviewing a student white paper. Context: at a desk, skeptical, 90 seconds to decide if this is a real organization.
2. **Ambitious high-school students** considering applying to the research cohort, the Civic Media Center, or founding a chapter. Context: comparing NYTT against debate, Model UN, and competition circuits. They want proof this is real work, not a resume mill.
3. **Parents and educators** validating the organization before a student commits 4 to 6 hours a week.
4. **Members and chapter leads** (authenticated): check application status, register for events.
5. **NYTT admins**: approve chapters, publish journal posts, manage events.

## Product Purpose

NYTT is an intentionally small (~20 student) think tank whose policy papers are reviewed at the Pennsylvania Senate level. The site must do what the organization does: look like an institution, not a club. Success = a Senate staffer takes the org seriously, a strong student applies, and the operational flows (chapter applications, events, publishing) actually work.

## Brand Personality

**Rigorous. Civic. Young.**
The voice of a published document, not a startup. Confident declarative sentences. Real numbers, real names, real legislators. The energy comes from ambition and scale of access, never from visual noise.

## Anti-references

- The current nationalyouththinktank.org: dark navy glassmorphism, glow blobs, gradient stat cards. Generic AI-built SaaS look that undercuts the org's credibility.
- AI-slop landing pages: purple gradients, three equal feature cards, eyebrow labels over every section.
- Red-white-blue patriotic kitsch and government-website beigeness.
- Brookings/CFR stuffiness: this is still a youth organization; the type can be big and the layout confident.

## Design Principles

1. **Built like the documents we publish.** The org's product is policy papers entering the legislative record. The site borrows the language of civic print: Clarendon-weight serif display, structured grids, navy ink, a gold seal accent.
2. **Credibility before flash.** Restrained, motivated motion. Real photography and real data. Never inflate: claims on the page come from the brief or the founder's own statements.
3. **Selective, stated plainly.** "Six seats on research" is the message. Demanding standards are presented as facts, not hype.
4. **Two registers, one identity.** Marketing surfaces carry the brand voice; dashboard and admin are quiet, consistent tools that disappear into the task.
5. **Trust is structural.** Hashed passwords, no leaked fields in APIs, honest states (loading, empty, error) everywhere. The current site exposes chapter passwords through its public API; the rebuild treats that class of failure as a design failure too.

## Accessibility & Inclusion

WCAG AA minimum (4.5:1 body text, 3:1 large text), full keyboard navigation, visible focus states, `prefers-reduced-motion` honored on all animation, semantic landmarks, alt text written in the brand voice.
