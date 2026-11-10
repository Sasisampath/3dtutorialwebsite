const prompts = {
  avatar: {
    title: 'Generate your 3D avatar',
    text: `Create a premium stylised 3D character based on the real photographs I am uploading.

IMPORTANT: The real photographs are the source of facial identity. Use any separately uploaded illustration only as an art-style reference.

Preserve my actual hairstyle, natural skin tone, eyebrows, eye shape, nose, lips, facial proportions, moustache and beard pattern. Do not invent blonde hair, a different face or lighter skin.

Art direction: an elegant blend of sophisticated stylised human character, smooth minimalist 3D geometry and subtle soft tactile materials. Premium but slightly playful. Expressive natural eyes, believable matte skin, thoughtful lighting.

Outfit: charcoal-grey overshirt jacket over a plain black crew-neck T-shirt.

Composition: waist-up, directly facing the camera, relaxed shoulders, slight closed-mouth smile. Clean warm off-white studio background, soft directional lighting, consistent framing.

No text, logos, hats, objects, extra people or exaggerated cartoon proportions.

This is the FRONT MASTER avatar. Its exact facial identity, clothing, lighting and scale must be preserved when I create left and right head-turn reference images.`
  },
  flow: {
    title: 'Animate the head turn in Google Flow',
    text: `Create one continuous, smooth character head-turn animation using the uploaded START and END images.

The exact same stylised 3D character slowly rotates his HEAD from looking far left (starting image), through a directly forward-facing position, to looking far right (ending image).

The movement is strictly left → centre → right, at a steady controlled speed, without reversing, bouncing or holding for long at the endpoints.

Only the head and eyes move. His torso, shoulders, clothing and camera remain stationary and front-facing. Keep the same black hairstyle, medium-brown skin, moustache and short chin beard throughout. Maintain a relaxed neutral expression with a slight closed-mouth smile.

Use a locked tripod camera. Preserve the off-white studio background, soft lighting, subject scale and exact frame composition.

NO camera pan or zoom. NO cuts. NO face morphing, changes of identity, talking, blinking, head wobble, body movement, cloth changes, text, extra subjects, sound or music.

The resulting video will be scrubbed forward and backward by the mouse cursor on a portfolio website. Make every intermediate head position coherent and easy to reverse.

After generation, review the whole clip. If it turns back or pauses, trim to a single clean left-to-right segment before using it on the web.`
  },
  codex: {
    title: 'Build the cursor-tracking portfolio in Codex',
    text: `You are a senior creative developer. Build a premium, original personal portfolio website using HTML/CSS/JavaScript or React + TypeScript (choose a lightweight solution).

I will supply two actual assets:
- character-turn-web.mp4: a trimmed, single-direction head-turn video
- character-poster.webp: front-facing still image

CRITICAL VISUAL GOAL:
The character must be HUGE, central, and visually dominant. Do not put it in a small right-side card or rigid 50/50 layout. Use a full-bleed layered hero. The character should occupy roughly 85–95% of hero height where the video crop allows, with its face near the centre of the viewport. Preserve the head in a 9:16 centre-crop preview for an Instagram Reel.

Use an editorial, creative portfolio layout with accessible navigation, intro headline, work/projects section and contact section. Do not invent personal contact details or case-study metrics.

CURSOR TRACKING:
Inspect the video timeline to identify the left, forward and right poses. On desktop, map mouse X / viewport width to a target time in the clip. Use bounded, throttled seeking or requestAnimationFrame; avoid overlapping seek requests. Mouse left means earlier frame, right means later frame. Do not autoplay the clip in a loop. Start from the forward-facing pose. Keep buttons usable and do not place an invisible pointer-blocking layer over the site.

Respect prefers-reduced-motion. On phones, use the static poster or an explicit slider. Add video error handling. The source video has an opaque studio background, so match its edges rather than assuming transparency.

Add a development-only toggleable 9:16 crop guide to help with reel framing. Check the UI at 1440×900 and 390×844 and test all cursor positions. Keep the avatar's facial identity, outfit and head visible. Optimise load time without making the face blurry.

Produce complete working source code, README, local build/run instructions and Vercel deployment guidance. Run tests and fix errors. Do not replace my assets with generated or stock faces. Do not push or deploy without my approval.`
  }
};

const $ = id => document.getElementById(id);
const tabButtons = [...document.querySelectorAll('[data-tab]')];
const promptText = $('promptText');
const promptActiveTitle = $('promptActiveTitle');
const promptPanel = $('promptPanel');
const toast = $('toast');
let activePrompt = 'avatar';
let toastTimeout;
function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2300);
}
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    notify('Copied to clipboard');
    return;
  } catch {
    // Older browsers and file previews may need a synchronous copy.
  }
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = value;
  input.readOnly = true;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  let copied = false;
  try {
    input.focus({ preventScroll: true });
    input.select();
    copied = document.execCommand('copy');
  } catch {
    // The browser may deny both clipboard APIs.
  } finally {
    input.remove();
    previousFocus?.focus({ preventScroll: true });
  }
  notify(copied ? 'Copied to clipboard' : 'Copy unavailable — select the text manually');
}
function selectPrompt(key) {
  if (!prompts[key]) return;
  activePrompt = key;
  promptText.textContent = prompts[key].text;
  promptActiveTitle.textContent = prompts[key].title;
  promptPanel.setAttribute('aria-labelledby', `tab-${key}`);
  tabButtons.forEach(tab => {
    const selected = tab.dataset.tab === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
}
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => selectPrompt(btn.dataset.tab));
  btn.addEventListener('keydown', e => {
    const i = tabButtons.indexOf(btn);
    let nextIndex;
    switch (e.key) {
      case 'ArrowLeft': nextIndex = (i - 1 + tabButtons.length) % tabButtons.length; break;
      case 'ArrowRight': nextIndex = (i + 1) % tabButtons.length; break;
      case 'Home': nextIndex = 0; break;
      case 'End': nextIndex = tabButtons.length - 1; break;
      default: return;
    }
    e.preventDefault();
    const next = tabButtons[nextIndex];
    selectPrompt(next.dataset.tab);
    next.focus();
  });
});
selectPrompt('avatar');
$('copyActive').addEventListener('click', () => copyText(prompts[activePrompt].text));
document.querySelectorAll('[data-prompt]').forEach(btn => btn.addEventListener('click', () => copyText(prompts[btn.dataset.prompt].text)));
$('copyGit').addEventListener('click', () => copyText($('gitCommands').textContent));

const menuButton = $('menuButton');
const nav = $('siteNav');
const mobileNav = matchMedia('(max-width: 850px)');
function setMenu(open) {
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
menuButton.addEventListener('click', event => {
  const open = !nav.classList.contains('open');
  setMenu(open);
  if (open && event.detail === 0) nav.querySelector('a').focus({ preventScroll: true });
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (nav.classList.contains('open') && !event.target.closest('#siteNav, #menuButton')) setMenu(false);
});
mobileNav.addEventListener('change', () => setMenu(false));
$('year').textContent = String(new Date().getFullYear());

// Scrub a single head turn. Keep only the newest target and never interrupt
// a seek already in progress. The native range input works by touch or keyboard.
const demoSurface = $('demoSurface');
const video = $('cursorVideo');
const slider = $('poseRange');
const poseLabel = $('poseLabel');
const demoCursor = $('demoCursor');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const seekInterval = 60;
let progress = 0.5;
let pending = false;
let seekTimer;
let nextSeekAt = 0;
let failed = false;

function scheduleSeek() {
  if (!pending || failed || !Number.isFinite(video.duration) || video.duration <= 0 ||
      video.seeking || seekTimer !== undefined) return;
  seekTimer = setTimeout(seekLatest, Math.max(0, nextSeekAt - performance.now()));
}
function seekLatest() {
  seekTimer = undefined;
  if (!pending || failed || video.seeking || !Number.isFinite(video.duration) || video.duration <= 0) return;
  if (performance.now() < nextSeekAt) {
    scheduleSeek();
    return;
  }
  pending = false;
  // Keep the right endpoint within the last frame of the clip.
  const target = Math.min(progress * video.duration, Math.max(0, video.duration - 0.01));
  if (Math.abs(video.currentTime - target) < 0.016) return;
  try {
    video.currentTime = target;
    nextSeekAt = performance.now() + seekInterval;
  } catch {
    showPoster();
  }
}
function requestProgress(value) {
  progress = Math.min(1, Math.max(0, value));
  const pct = Math.round(progress * 100);
  const direction = pct < 42 ? 'Left' : pct > 58 ? 'Right' : 'Centre';
  slider.value = String(pct);
  slider.style.setProperty('--pose', `${pct}%`);
  slider.setAttribute('aria-valuetext', `${direction}, ${pct} percent`);
  poseLabel.textContent = `${direction.toUpperCase()} · ${pct}%`;
  pending = true;
  scheduleSeek();
}
function updateCursorAvailability() {
  demoSurface.classList.toggle('can-scrub', !failed && !motionPreference.matches);
}
function showPoster() {
  failed = true;
  pending = false;
  clearTimeout(seekTimer);
  video.hidden = true;
  demoSurface.querySelector('.demo-poster').hidden = false;
  slider.disabled = true;
  $('demoStatus').hidden = false;
  updateCursorAvailability();
}
video.addEventListener('loadedmetadata', () => requestProgress(progress));
video.addEventListener('seeked', scheduleSeek);
video.addEventListener('error', showPoster);
motionPreference.addEventListener('change', updateCursorAvailability);
demoSurface.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || failed || motionPreference.matches) return;
  const box = demoSurface.getBoundingClientRect();
  if (box.width <= 0) return;
  const x = event.clientX - box.left;
  demoCursor.style.left = `${x}px`;
  demoCursor.style.top = `${event.clientY - box.top}px`;
  requestProgress(x / box.width);
});
slider.addEventListener('input', () => requestProgress(Number(slider.value) / 100));
if (video.error) showPoster();
else {
  updateCursorAvailability();
  requestProgress(progress);
}
