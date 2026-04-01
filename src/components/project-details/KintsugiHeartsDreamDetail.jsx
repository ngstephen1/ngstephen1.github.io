import Link from "next/link";

const toolsRows = [
  ["Music generation", "Suno v5, ElevenLabs Music"],
  ["Mixing/MIDI", "Ableton Live, Novation Launchkey MK3 (MIDI), GarageBand"],
  ["Multimodal LLMs", "GPT-5 Thinking, Gemini 2.5 Pro"],
  ["Images/Style", "Midjourney, Gemini 2.5 Flash"],
  ["Text to Video", "Kling 2.5, Veo3, Luma AI, Vidu Q2, Sora2, WAN-2.5"],
  [
    "Video (general)",
    "Midjourney, Veo3, Sora2, Kling 2.5, FAL (fal.ai), WAN-2.5, Vidu Q2",
  ],
  ["Elements to Video", "Veo3, Midjourney, Vidu Q2"],
  [
    "Lip-Sync",
    "OpenArt Lipsync, CapCut, Kling, Sync.so, Nanobanana",
  ],
  ["Edit/Grade", "CapCut Pro"],
  ["Model Hub / A-B tests", "FAL (fal.ai)"],
];

const workflowRows = [
  [
    "1. Concept & Creative Direction",
    "Brainstorm story/theme/message; define emotion, audience, tone; create moodboard, visual refs, shot list.",
    "Translate human feelings into prompts with GPT-5 / Gemini; ideate storyboards and lyric tone; generate concept art and moodboards with Midjourney / FAL; lock visual style.",
  ],
  [
    "2. Songwriting & Composition",
    "Write lyrics, melody, chords; record instruments & vocals in studio.",
    "Use Suno / ElevenLabs to draft duet; iterate genre and tempo; export stems.",
  ],
  [
    "3. Casting & Pre-Production",
    "Hire actors, makeup, costume, crew; scout locations; plan lighting & schedule.",
    "Design virtual characters from hand sketches in Midjourney; block scenes with text-to-video models; choose lenses and lighting through prompts.",
  ],
  [
    "4. Filming / Production",
    "Shoot with cameras and lighting; record B-roll; capture multiple takes and angles.",
    "Generate shots with Kling / WAN / Veo / Vidu / Sora; apply expressive face and lip-sync with Nanobanana / OpenArt / CapCut / Sync.so; keep one consistent look per sequence.",
  ],
  [
    "5. Post-Production (Editing)",
    "Edit in Final Cut or Premiere; beat-sync; captions; transitions; unify grade; add credits.",
    "Edit in CapCut Pro; beat-map to stems; add captions, warm-cool grade, rain SFX, logo, and credits; export 16:9 master.",
  ],
  [
    "6. Sound Mixing & Mastering",
    "Balance vocals and instruments; deliver final master.",
    "Mix Suno stems in Ableton / CapCut; use gentle plate and hall; target around -14 LUFS / -1 dBTP.",
  ],
];

const automationSnippet = String.raw`# 1) Consistency Kit

CONSISTENCY = {
    "style": "cinematic diary,pencil/graphite lines,soft film grain,warm tungsten + cool rain rim",
    "palette": ["warm_amber", "slate_blue", "soft_ivory", "desaturated_teal"],
    "motifs": ["brass lantern","kintsugi gold seams","rain on glass","kraft notebook"],
    "female": {
        "name": "Sophia",
        "hair": "long dark-brown wavy",
        "look": "sweet-girl style, shirt+skirt, 5'3, average build",
        "persona": "independent,energetic,understanding",
        "props": ["kraft notebook","piano"]
    },
    "male": {
        "name": "Bryan",
        "hair": "short black, a bit messy",
        "look": "T-shirt, baggy jeans, gentle eyes, lean-muscular",
        "persona": "soft,protective,thoughtful",
        "props": ["brass lantern","mosaic frame"]
    }
}

# 2) Prompt template

PROMPT_TMPL = (
    "STYLE:{style} | PALETTE:{palette} | MOTIFS:{motifs} | "
    "CHARACTERS: {female_look}; {male_look} | "
    "SCENE:{scene_desc} | CAMERA:{camera} | LIGHT:{light} | MOOD:{mood} | "
    "KEEP: faces consistent, wardrobe consistent, props present (lantern,kintsugi,notebook)"
)

def render_prompt(scene_desc:str, camera:str, light:str, mood:str) -> str:
    return PROMPT_TMPL.format(
        style=CONSISTENCY["style"],
        palette=",".join(CONSISTENCY["palette"]),
        motifs=",".join(CONSISTENCY["motifs"]),
        female_look=CONSISTENCY["female"]["look"],
        male_look=CONSISTENCY["male"]["look"],
        scene_desc=scene_desc, camera=camera, light=light, mood=mood
    )

# 3) Scene spec

@dataclass
class Scene:
    id: str
    kind: str        # "image" | "video" | "lipsync" | "music" | "llm"
    provider: str    # e.g. "fal", "wan", "kling", "openart_lipsync", "elevenlabs", "suno"
    scene_desc: str
    camera: str = "35–50mm, shallow DOF, slow push-in"
    light: str  = "warm tungsten key, cool rain rim"
    mood: str   = "sad-hopeful, intimate"
    ref_images: List[str] = None  # optional URLs or local paths (pencil+real refs)

# 4) Provider adapters

def call_llm_rewrite(prompt:str) -> str:
    """Optional: have an LLM polish the prompt for the target model style."""
    url = os.getenv("LLM_URL")
    key = os.getenv("LLM_API_KEY")
    if not url or not key:
        return prompt
    headers = {"Authorization": f"Bearer {key}"}
    payload = {
        "model": os.getenv("LLM_MODEL","gpt-4o-mini"),
        "messages": [
            {"role":"system","content":"Rewrite for text-to-(image|video) model; keep constraints; no extra fluff."},
            {"role":"user","content":prompt}
        ]
    }
    try:
        r = requests.post(url, headers=headers, json=payload, timeout=60)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"].strip()
    except Exception:
        return prompt

def submit_image_fal(prompt:str, refs:List[str] | None)->Dict[str,Any]:
    return {"status":"queued","provider":"fal","prompt":prompt,"refs":refs}

def submit_video_wan(prompt:str, refs:List[str] | None)->Dict[str,Any]:
    return {"status":"queued","provider":"wan","prompt":prompt}

def submit_lipsync_openart(audio_url:str, frame_img:str)->Dict[str,Any]:
    return {"status":"queued","provider":"openart_lipsync","frame":frame_img,"audio":audio_url}

def submit_music_suno(song_desc:str)->Dict[str,Any]:
    return {"status":"queued","provider":"suno","desc":song_desc}

def dispatch(scene:Scene, prompt:str)->Dict[str,Any]:
    match scene.kind, scene.provider:
        case ("image","fal"):
            return submit_image_fal(prompt, scene.ref_images)
        case ("video","wan"):
            return submit_video_wan(prompt, scene.ref_images)
        case ("lipsync","openart_lipsync"):
            return submit_lipsync_openart(audio_url=os.getenv("LYRIC_LINE_URL",""), frame_img=scene.ref_images[0])
        case ("music","suno"):
            return submit_music_suno(prompt)
        case _:
            return {"status":"skipped","why":"no adapter"}

# 5) Batch runner

def run_batch(scenes:List[Scene], use_llm=True) -> List[Dict[str,Any]]:
    jobs = []
    for sc in scenes:
        base_prompt = render_prompt(sc.scene_desc, sc.camera, sc.light, sc.mood)
        final_prompt = call_llm_rewrite(base_prompt) if use_llm else base_prompt
        job = dispatch(sc, final_prompt)
        job["id"] = sc.id
        job["prompt"] = final_prompt
        jobs.append(job)
        time.sleep(0.2)
    return jobs

# 6) Example

if __name__ == "__main__":
    scenes = [
        Scene(
            id="C01",
            kind="image",
            provider="fal",
            scene_desc="Rainy window; reflection of brass lantern; kintsugi frame on sill; pencil-diary texture",
            ref_images=["/refs/sophia_pencil.png", "/refs/bryan_pencil.png"],
        ),
        Scene(
            id="C02",
            kind="video",
            provider="wan",
            scene_desc="City bus arrives in rain; sodium lights; wet asphalt reflections; handheld gentle",
        ),
        Scene(
            id="CH1_A",
            kind="lipsync",
            provider="openart_lipsync",
            scene_desc="Sophia close-up by window, warm tungsten/cool rim; sing 'We don’t have much, but we have a light'",
            ref_images=["/frames/sophia_close.png"],
        ),
        Scene(
            id="MUS1",
            kind="music",
            provider="suno",
            scene_desc="Pop/Asia-Pop duet ~93 BPM, intro piano+violin, sad-hopeful; use provided lyrics verbatim",
        ),
    ]
    out = run_batch(scenes, use_llm=True)
    print(json.dumps(out, indent=2))`;

const algorithmSnippet = String.raw`from dataclasses import dataclass
import numpy as np

@dataclass
class Kit:
    face_emb: np.ndarray
    clip_txt: np.ndarray
    palette_lab: np.ndarray
    thresholds: dict
    controls: dict
    seeds: dict

@dataclass
class Scene:
    text: str
    pose: np.ndarray | None
    add_on: dict

def acs(scene, kit, driver, trials=16):
    w = {"face": .4, "clip": .2, "color": .2, "prop": .1, "temp": .1}
    best = None
    for h in sample_hparams(kit.controls, kit.seeds, trials):
        prompt = render_prompt(scene, kit, h)
        shot = driver.generate(prompt, h)

        m = measure(shot, kit, scene)
        f = {
            "face": face_score(m["face_dist"], kit.thresholds["face"]),
            "clip": m["clip_sim"],
            "color": np.exp(-m["deltaE_mean"] / max(kit.thresholds["color"], 1e-6)),
            "prop": prop_score(m["props"]),
            "temp": temp_score(m),
        }
        S = sum(w[k] * f[k] for k in w)
        rec = {"S": S, "m": m, "f": f, "h": h, "prompt": prompt, "shot": shot}
        if best is None or S > best["S"]:
            best = rec
        if pass_hard(m, kit.thresholds):
            return rec

        for k in w:
            if violated(m, k, kit.thresholds):
                w[k] *= 1.5
        Z = sum(w.values())
        w = {k: v / Z for k, v in w.items()}
    return best

def face_score(d, tau):
    return np.clip((tau - d) / max(tau, 1e-6), 0, 1)

def prop_score(props):
    sig = lambda z: 1 / (1 + np.exp(-z))
    return sig(props.get("lantern", 0) - .5) * sig(props.get("kintsugi", 0) - .5)

def temp_score(m):
    if "flow_epe" not in m:
        return 1.0
    l1, l2, l3 = .8, .1, .1
    return float(np.exp(-(l1 * m["flow_epe"] + l2 * m.get("deltaE_t", 0) + l3 * m.get("face_dist_t", 0))))

def pass_hard(m, th):
    ok = (
        m["face_dist"] <= th["face"]
        and m["deltaE_mean"] <= th["color"]
        and m["props_ok"]
    )
    if "flow_epe" in m:
        ok &= m["flow_epe"] <= th.get("flow", 10.0)
    return ok

def violated(m, key, th):
    checks = {
        "face": m["face_dist"] > th["face"],
        "color": m["deltaE_mean"] > th["color"],
        "prop": not m["props_ok"],
        "clip": m["clip_sim"] < 0.30,
        "temp": m.get("flow_epe", 0) > th.get("flow", 10.0),
    }
    return checks[key]

# you implement: sample_hparams, render_prompt, driver.generate, measure`;

const lyrics = `[Verse 1]
Rain on the glass, our names half-drawn,
Noise at the door, but the hush stayed on.
Your hand brushed mine for the very first time
Two small sparks learning how to shine.

[Verse 1B]
Bus seats hum under city gray,
Pages slipped open when your notebook strayed.
A shy "hello," a glance held long
Love hummed softly before it learned a song.

[Pre-Chorus]
If the night stands tall, we'll make it small,
We won't leave the room when the storm comes to call.

[Chorus]
We don't have much, but we have a light,
A lantern kept in each other's sight.
If everything breaks, we'll gold the seam
Kintsugi hearts in a first-love dream.
Hold on to me when the colors drain,
I'll paint them back with your name.
We're not unscarred, but we're still bright
You and I, where we keep the light.

[Verse 2]
Tiny cafe with the hairline cups,
You take the wind and you hold me up.
First time our fingers decided to stay
Two quiet bravest on a rainy day.

[Verse 2B]
Blue-shard frame where a vase once broke,
We learned to mend by the words we spoke.
Little brave things that we do each day
That's how we stay when the world won't stay.

[Pre-Chorus 2]
If the rain runs hard, let it write our street,
I'll count your breaths while you count my beats.

[Chorus]
We don't have much, but we have a light,
A lantern kept in each other's sight.
If everything breaks, we'll gold the seam
Kintsugi hearts in a first-love dream.
Hold on to me when the colors drain,
I'll paint them back with your name.
We're not unscarred, but we're still bright
You and I, where we keep the light.

[Bridge - call & response, hush]
(You) If distance grows, I'll leave the door wide.
(Me) Porch light on. I'm on your side.
(You) If years draw maps across our skin,
(Me) Read them home, then start again.
(Both) When I lose my way, say my name
I'll find you waiting in the frame.

[Breakdown - whispers]
Stay... stay... (I'm here.)
Stay... stay... (Don't fear.)

[Instrumental - 8 bars]
melodic violin solo quoting the chorus motif

[Final Chorus - bigger, stacked harmonies]
We don't have much, but we have a light,
A lantern held through the tender night.
If everything breaks, we'll gold the seam
Kintsugi hearts in a first-love dream.
Hold on to me when the colors drain,
I'll sing them back with your name.
We're not unscarred, but we're still bright
First love, forever. Where we keep the light.

[Outro]
Breathe with me slow till the stars grow kind,
Two hands, one room, and an endless time.
If the world goes quiet, we'll be alright
You in my chest, where I keep the light.`;

function Section({ title, children }) {
  return (
    <section className="w-full space-y-3 border-t border-white border-opacity-10 pt-5">
      <h3 className="text-xl text-white">{title}</h3>
      {children}
    </section>
  );
}

function Body({ children, className = "" }) {
  return (
    <p className={`text-base leading-8 text-white opacity-80 ${className}`}>
      {children}
    </p>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="w-full overflow-x-auto rounded-lg bg-dark-purple-100 p-4 text-sm leading-6 text-[#e8ddff]">
      <code>{children}</code>
    </pre>
  );
}

export default function KintsugiHeartsDreamDetail() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Section title="Story">
        <Body className="italic">
          A real first-love story in rain, violin, and lantern light.
        </Body>
        <Body>
          In the MV, two shy teens who meet on a rainy bus learn to gold the
          seams of their lives through small fights, hospital nights, and quiet
          promises until they keep choosing each other at dawn.
        </Body>
        <Body>
          <span className="font-medium text-white">Kintsugi metaphor:</span>{" "}
          from Japan&apos;s art of mending pottery with gold, a broken heart can
          be healed and return stronger, more beautiful, and more resilient.
        </Body>
      </Section>

      <Section title="Audience & Message">
        <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-white opacity-80">
          <li>
            <span className="font-medium text-white">Audience:</span> people
            who are having first love, have had first love, or have never had
            first love. Basically, everyone.
          </li>
          <li>
            <span className="font-medium text-white">Core message:</span> Love
            lasts when we keep choosing each other, even first love. If love
            can last, let first love try.
          </li>
        </ul>
      </Section>

      <Section title="Research Questions">
        <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-white opacity-80">
          <li>Can AI convey emotions through memory?</li>
          <li>How good is AI&apos;s ability to create a music video?</li>
          <li>How does love or first love feel like?</li>
          <li>How much money can we save for creative work?</li>
        </ol>
        <blockquote className="space-y-3 rounded-lg border border-white border-opacity-10 bg-white bg-opacity-5 p-4 text-base leading-8 text-white opacity-85">
          <p>
            <Link
              href="https://en.wikipedia.org/wiki/Blackpink"
              target="_blank"
              className="underline"
            >
              BLACKPINK
            </Link>
            &apos;s music videos are widely reported online to have
            multi-million-dollar production budgets.
          </p>
          <p>
            <Link
              href="https://www.youtube.com/watch?v=2S24-y0Ij3Y"
              target="_blank"
              className="underline"
            >
              Kill This Love
            </Link>{" "}
            is often reported around $1.4M in fan and media estimates. See{" "}
            <Link
              href="https://www.nme.com/news/music/blackpink-music-video-yg-entertainment-largest-production-budget-3277585"
              target="_blank"
              className="underline"
            >
              NME
            </Link>{" "}
            and{" "}
            <Link
              href="https://koreajoongangdaily.joins.com/2022/07/26/entertainment/kpop/Korea-Kpop-Blackpink/20220726152405230.html"
              target="_blank"
              className="underline"
            >
              Korea JoongAng Daily
            </Link>
            .
          </p>
          <p>
            <Link
              href="https://www.youtube.com/watch?v=IHNzOHi8sJs"
              target="_blank"
              className="underline"
            >
              DDU-DU DDU-DU
            </Link>{" "}
            is often reported around $1.3M in circulating fan and media claims,
            including this{" "}
            <Link
              href="https://www.instagram.com/p/DDbehChyb_K/"
              target="_blank"
              className="underline"
            >
              Instagram roundup
            </Link>
            .
          </p>
        </blockquote>
      </Section>

      <Section title="At a Glance">
        <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-white opacity-80">
          <li>A Pop / Asia-Pop duet with a 4:41 cinematic music video.</li>
          <li>
            Multimodal pipeline: real-life story to inspiration to lyrics to
            music stems to storyboards to images to video shots to lip-sync to
            edit to mix/master.
          </li>
        </ul>
      </Section>

      <Section title="Tools">
        <div className="w-full overflow-x-auto rounded-lg border border-white border-opacity-10">
          <table className="min-w-full border-collapse text-left text-sm text-white opacity-85">
            <thead className="bg-white bg-opacity-10">
              <tr>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Tools</th>
              </tr>
            </thead>
            <tbody>
              {toolsRows.map(([category, tools]) => (
                <tr key={category} className="border-t border-white border-opacity-10">
                  <td className="px-4 py-3 align-top font-medium text-white">
                    {category}
                  </td>
                  <td className="px-4 py-3">{tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Model Catalog">
        <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-white opacity-80">
          <li>
            <span className="font-medium text-white">Video models used:</span>{" "}
            Veo3, Sora2, Kling 2.5, WAN-2.5, Vidu Q2, Midjourney, and Luma AI.
          </li>
          <li>
            <span className="font-medium text-white">Lip-sync models:</span>{" "}
            CapCut Lipsync, Kling lipsync, OpenArt Lipsync, Sync.so, and
            Nanobanana.
          </li>
          <li>
            <span className="font-medium text-white">Image models:</span>{" "}
            Midjourney and Gemini 2.5 Flash.
          </li>
          <li>
            <span className="font-medium text-white">Orchestration / A-B:</span>{" "}
            FAL (fal.ai) hosted multiple image and video back ends we evaluated.
          </li>
        </ul>
      </Section>

      <Section title="How We Built It">
        <ol className="list-decimal space-y-3 pl-6 text-base leading-8 text-white opacity-80">
          <li>
            <span className="font-medium text-white">Inspiration & story:</span>{" "}
            inspired by a real story arc, love musical notes, 50+ switched
            spots, 6+ cities, MV lessons, lyrics in the shower, on the bus, and
            during lunch.
          </li>
          <li>
            <span className="font-medium text-white">Lyrics & music:</span>{" "}
            used piano and acoustic guitar to guide Suno v5 and ElevenLabs,
            changed 500+ prompt words 100+ times, and used an LLM as conductor
            and reviewer.
          </li>
          <li>
            <span className="font-medium text-white">
              Characters & Consistency Kit Algorithm:
            </span>{" "}
            hand-drew reference sheets for the female and male leads, then
            layered artist keywords so a real artistic sense could guide the AI.
          </li>
          <li>
            <span className="font-medium text-white">
              Storyboards & prompts:
            </span>{" "}
            beat-mapped bars to seconds and wrote a Consistency-Kit Algorithm
            plus Scene-Add-On prompt system, iterating 80+ times to keep output
            patterns stable.
          </li>
          <li>
            <span className="font-medium text-white">Imagery:</span> Midjourney
            and Gemini produced style frames and pencil-diary plates until
            faces, props, and motifs stayed consistent.
          </li>
          <li>
            <span className="font-medium text-white">Motion:</span> Veo3,
            Sora2, Kling, WAN, and Vidu turned frames into moving scenes, while
            FAL helped test and lock a single look per sequence.
          </li>
          <li>
            <span className="font-medium text-white">Lip-sync:</span> OpenArt,
            CapCut, Kling, Nanobanana, and Sync.so handled natural mouth motion
            and micro-expressions for solo and duet lines.
          </li>
          <li>
            <span className="font-medium text-white">Edit & finish:</span>{" "}
            CapCut Pro handled beat-sync, captions, and rain foley. Ableton
            Live handled mix and master. Final export was 16:9.
          </li>
        </ol>
      </Section>

      <Section title="Workflow: Real-Life vs AI Music Video">
        <div className="w-full overflow-x-auto rounded-lg border border-white border-opacity-10">
          <table className="min-w-[780px] border-collapse text-left text-sm text-white opacity-85">
            <thead className="bg-white bg-opacity-10">
              <tr>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Real-Life Music Video</th>
                <th className="px-4 py-3 font-medium">AI Music Video</th>
              </tr>
            </thead>
            <tbody>
              {workflowRows.map(([stage, real, ai]) => (
                <tr key={stage} className="border-t border-white border-opacity-10">
                  <td className="px-4 py-3 align-top font-medium text-white">
                    {stage}
                  </td>
                  <td className="px-4 py-3 align-top">{real}</td>
                  <td className="px-4 py-3 align-top">{ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Song Description for AI Models">
        <div className="space-y-3 text-base leading-8 text-white opacity-80">
          <Body>
            <span className="font-medium text-white">Style:</span> Pop /
            Asia-Pop duet (male + female), sad-hopeful, cinematic.
          </Body>
          <Body>
            <span className="font-medium text-white">Tempo / Length:</span>{" "}
            92-94 BPM, target around 4:00.
          </Body>
          <Body>
            <span className="font-medium text-white">Lyrics:</span> use the
            provided lyrics as-is.
          </Body>
          <Body>
            <span className="font-medium text-white">Form:</span> Intro(8) →
            V1 → V1B → Pre → Chorus → V2 → V2B → Pre2 → Chorus → Bridge
            (call/response) → Breakdown (whispers) → 4-bar Lift → 8-bar e-gtr
            Solo → Final Chorus (bigger) → Outro.
          </Body>
          <div>
            <h4 className="text-lg text-white">Arrangement</h4>
            <ul className="list-disc space-y-2 pl-6 text-base leading-8">
              <li>Intro: solo piano and violin with rain, no drums.</li>
              <li>Verses: piano plus light fingerpicked acoustic guitar.</li>
              <li>Pre: soft pads and strings, light cello swells, no kick.</li>
              <li>
                Chorus: clean pop drums, warm bass, piano forward, wide BGVs,
                optional violin counterline.
              </li>
              <li>Bridge: drop to piano and cello, intimate call/response.</li>
              <li>Breakdown: whispers, no drums.</li>
              <li>Lift: 4-bar tom build, no EDM crash.</li>
              <li>
                Final Chorus: full band, stacked harmonies, subtle rhythm
                guitars, soaring violin.
              </li>
              <li>Outro(8): return to piano and violin with rain tail.</li>
            </ul>
          </div>
          <Body>
            <span className="font-medium text-white">Mix:</span> vocals on top,
            slightly soft drum bus, gentle plate and hall, radio-clean.
          </Body>
          <Body>
            <span className="font-medium text-white">Stems to export:</span>{" "}
            <code className="rounded bg-white bg-opacity-10 px-2 py-1 text-sm">
              male_lead, female_lead, bgvs, piano, ac_gtr, violin, strings /
              cello, bass, drums, egtr(solo + rhythm), fx / foley
            </code>
          </Body>
        </div>
      </Section>

      <Section title="Built With">
        <Body>
          Suno v5, Ableton Live, Novation MK3, ElevenLabs Music, GarageBand,
          Midjourney, Gemini 2.5 Flash, Veo3, Sora2, Kling 2.5, Python,
          WAN-2.5, Vidu Q2, Fal Sandbox (fal.ai), Sync.so, Luma AI,
          Nanobanana, OpenArt Lipsync, CapCut Pro, GPT-5 Thinking, and Gemini
          2.5 Pro.
        </Body>
      </Section>

      <Section title="Consistency Kit Algorithm">
        <Body className="italic">
          To keep AI patterns output consistent: AI experiment with Python and
          math.
        </Body>
        <h4 className="text-lg text-white">
          Automate Consistency Kit, Less Manual Steps, Save Time
        </h4>
        <CodeBlock>{automationSnippet}</CodeBlock>
        <h4 className="text-lg text-white">Consistency Kit Algorithm</h4>
        <CodeBlock>{algorithmSnippet}</CodeBlock>
      </Section>

      <Section title="What’s Next">
        <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-white opacity-80">
          <li>
            Publish a prompt and pipeline template so others can make
            emotionally coherent AI music videos.
          </li>
          <li>Explore multi-lingual versions with localized lyric captions.</li>
          <li>Release instrumental and stems for community remixes.</li>
          <li>Partner with local bands and artists to support them with AI.</li>
          <li>Perform with the AI MV and a karaoke version.</li>
          <li>Improve MV structure and song quality.</li>
        </ul>
      </Section>

      <Section title="Lyrics — Kintsugi Hearts Dream">
        <pre className="w-full whitespace-pre-wrap rounded-lg border border-white border-opacity-10 bg-white bg-opacity-5 p-4 text-sm leading-7 text-white opacity-85">
          {lyrics}
        </pre>
      </Section>

      <div className="w-full border-t border-white border-opacity-10 pt-5 text-sm text-white opacity-70">
        Submission for{" "}
        <Link
          href="https://www.chromaawards.com/"
          target="_blank"
          className="underline"
        >
          Chroma Awards
        </Link>
        .
      </div>
    </div>
  );
}
