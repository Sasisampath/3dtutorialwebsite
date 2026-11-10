# Codex prompt — Improve and publish Sasi's tutorial website

You are working in an existing repository containing a finished static tutorial website. Inspect `index.html`, `styles.css`, `script.js`, and `assets/` before making changes.

## Goal

Build a distinctive, shareable educational microsite explaining how I created a 3D cursor-tracking portfolio from my own photos. The website **already includes my real headshot, a second reference selfie, a 3D master portrait, seven avatar pose images, and a trimmed video of the character turning its head**. Never replace those with stock images.

Maintain the overall visual concept: a spacious editorial cream-and-charcoal guide, with rust-orange accents, large recognisable photos and avatar, a real interactive video scrubbing playground, six tutorial steps, prompt copy tabs, and GitHub → Vercel deployment instructions.

## Critical requirements

- Showcase the transformation from my actual portrait to my 3D avatar early in the page.
- Keep the character BIG and highly visible. Don't hide the main portrait in a small right-side card.
- Make the tutorial immediately understandable to a first-time visitor.
- Preserve the live demo: desktop mouse X controls video progress left-to-right; a slider provides mobile accessibility.
- The supplied video is a compressed, opaque-background MP4, not a transparent 3D rig. Don't use Three.js unless there is a real need; don't call this real-time face tracking.
- Ensure video seeking is throttled and does not endlessly issue overlapping seeks.
- Preserve the working copy-to-clipboard prompts.
- Avoid made-up achievements, URLs, contact details, or unverified claims.
- Make the site excellent at 1440px, 1280px, 768px and 390px viewports.
- Run the site in a local HTTP server and test all sections, the interaction demo, tab controls, copy buttons and mobile nav.

## Content to keep

1. Original photo references.
2. Front-facing stylised 3D master.
3. Seven angles (−60 to +60 degrees) with the same identity.
4. Google Flow frames-to-video animation and why a monotonic clip is necessary.
5. Video seeking with cursor-controlled playback.
6. Push to GitHub and import to Vercel.

## Deployment

Prepare the code for a GitHub repository and a Vercel static deployment. Only create a remote repository, push, or deploy after I provide the repository destination or authorise the required external actions. Never claim a live URL exists before deployment succeeds.

## Output

Provide a concise summary of changes, local testing results, and exact GitHub/Vercel deployment steps.
