# Make your portfolio look back — Sasi’s build guide

A static tutorial showing how Sasi turned two real photos into a stylized avatar, generated seven reference poses, animated a head turn in Google Flow, and mapped the resulting video to the cursor. This is the tutorial site; the final personal portfolio is a separate project.

## Preview locally

From the project folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Open [http://localhost:4173](http://localhost:4173). No project dependencies or build step. For testing in browsers that require HTTP byte-range responses for video seeking, serve the same `public/` folder with a range-capable static server.

## How the demo works

Move the mouse left or right over the video, or use the Head Direction slider by touch or keyboard. The demo starts near the forward-facing pose. It seeks within a paused video, holding only the latest target and waiting for the previous seek to finish. Reduced motion disables mouse scrubbing while keeping the slider available. If the video fails, the supplied poster appears instead.

The original assets are included unchanged: two photos, the avatar master, seven poses, their contact sheet, the poster, and the 3.42-second, 1920 × 1080 H.264 MP4. The MP4 has an opaque background. The poses are animation references, not frames swapped in by the browser. The original generated clip moved back and forth; the supplied MP4 isolates one turn so cursor motion maps consistently to head direction. See [Google Flow’s guide to start and end frames](https://support.google.com/flow/answer/16353334).

## Publish to GitHub and Vercel

Publish only after Sasi approves sharing the photos, avatar and video. A private GitHub repository does not make the deployed site private.

1. In the approved GitHub account or organization, create an **empty** repository named `sasi-3d-avatar-guide`. Choose the approved visibility. Leave GitHub’s README, license and .gitignore options unchecked.
2. From this project folder (the one containing `vercel.json`), run the commands below. Replace `YOUR_GITHUB_OWNER` with the actual account or organization:

   ```sh
   git init -b main
   git add .
   git commit -m "Prepare Sasi's 3D avatar guide"
   git remote add origin https://github.com/YOUR_GITHUB_OWNER/sasi-3d-avatar-guide.git
   git push -u origin main
   ```

3. Open [Vercel → New Project](https://vercel.com/new), connect the approved GitHub account if needed, and import `sasi-3d-avatar-guide`. Select **Other**, leave **Root Directory** at the repository root, and use `public` as the **Output Directory**. The included `vercel.json` sets the output directory and skips install and build commands. Select **Deploy** after approval.
4. Open the URL Vercel reports for the deployment. Check the desktop mouse, touch and keyboard slider, all three prompt tabs, copy buttons and mobile menu. Test the site from a signed-out browser before sharing. Future pushes to the configured production branch can redeploy the site automatically.
5. For a link preview with an image, add an `og:image` tag with the absolute HTTPS URL of `/assets/avatar-master.webp` once the final hostname is confirmed, then redeploy.

Official references: [GitHub: push local code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github), [Vercel: configure a static project](https://vercel.com/docs/builds/configure-a-build).

## Files

- `public/index.html` — tutorial and demo markup
- `public/styles.css` — responsive editorial layout
- `public/script.js` — video seeking, mobile navigation and copyable prompts
- `public/assets/` — Sasi’s original project assets
- `CODEX_PROMPT.md` — original project brief
- `vercel.json` — serves only the `public/` folder
