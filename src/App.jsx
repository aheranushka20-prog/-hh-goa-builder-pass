import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import "./App.css";

const STACKS = [
  "AI",
  "WEB",
  "DESIGN",
  "DATA",
  "HARDWARE",
  "STARTUPS",
];

function App() {
  const passRef = useRef(null);
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [builderTitle, setBuilderTitle] = useState("");
  const [builderLine, setBuilderLine] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const builderId = "HH-26-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const toggleStack = (stack) => {
    setSelectedStacks((current) => {
      if (current.includes(stack)) {
        return current.filter((item) => item !== stack);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, stack];
    });
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const downloadPass = async () => {
    if (!passRef.current || !name.trim() || selectedStacks.length === 0) {
      return;
    }

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(passRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#f5e8c8",
      });

      const link = document.createElement("a");
      link.download = `${name.trim().replace(/\s+/g, "-")}-HHGOA-Builder-Pass.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Unable to download pass:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const sharePass = async () => {
    const text =
      "I’m building in Goa with Hacker House 2026. Meet my Builder Identity. #FrameInGoa";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hacker House Goa Builder Pass",
          text,
        });
      } catch {
        // User cancelled sharing.
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    }
  };

  const copyId = async () => {
    await navigator.clipboard.writeText(builderId);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const stackText =
    selectedStacks.length > 0
      ? selectedStacks.join(" • ")
      : "YOUR STACK";

  return (
    <main className="app">
      <div className="grain" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="builder-header">
        <button className="back-button" type="button">
          ← BACK
        </button>

        <div className="builder-header-center">
          <span>HACKER HOUSE</span>
          <strong>GOA · 2026</strong>
        </div>

        <div className="builder-progress">
          <span>01</span> / 01
        </div>
      </header>

      {/* =====================================================
          HERO / WORLD
      ===================================================== */}

      <section className="builder-world">
        <div className="builder-world-top">
          <div className="world-label">
            <span className="pink-line" />
            BUILDER DETAILS
          </div>

          <h1>
            Put yourself
            <br />
            <em>on the map.</em>
          </h1>

          <p>
            
            <br />
          
          </p>

          <div className="background-code code-1">{"< >"}</div>
          <div className="background-code code-2">{"{ }"}</div>
          <div className="background-code code-3">{"//"}</div>
          <div className="background-code code-4">{"< / >"}</div>
        </div>

        {/* Illustrated Goa landscape */}
        <div className="builder-jungle">
          <div className="illustration">
            <div className="illustration-sun" />

            <div className="illustration-mountain mountain-back" />
            <div className="illustration-mountain mountain-front" />

            <div className="illustration-water">
              <span />
              <span />
              <span />
            </div>

            <div className="illustration-ground" />

            <div className="illustration-house house-left">
              <div className="house-roof" />
              <div className="house-body">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="illustration-house house-right">
              <div className="house-roof" />
              <div className="house-body">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="illustration-palm palm-left">
              <div className="palm-leaves">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="palm-trunk" />
            </div>

            <div className="illustration-palm palm-right">
              <div className="palm-leaves">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="palm-trunk" />
            </div>

            <div className="tiny-leaf leaf-a">✦</div>
            <div className="tiny-leaf leaf-b">✦</div>
            <div className="tiny-leaf leaf-c">✦</div>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="builder-content">

          {/* =================================================
              LEFT EDITOR
          ================================================= */}

          <section className="builder-editor">
            <div className="editor-stamp">
              <span>BUILDERS</span>
              <strong>GOA</strong>
              <small>2026</small>
            </div>

            {/* STEP 01 */}
            <div className="builder-step">
              <div className="step-number">01 / FACE</div>

              <h2>Your portrait.</h2>

              <p className="step-copy">
                
              </p>

              <div className="photo-upload-area">
                <button
                  type="button"
                  className={`photo-upload-preview ${
                    photo ? "has-photo" : ""
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  style={
                    photo
                      ? {
                          backgroundImage: `url(${photo})`,
                        }
                      : undefined
                  }
                >
                  {!photo && (
                    <>
                      <span className="photo-cross">+</span>
                      <span>ADD PHOTO</span>
                      <small>JPG / PNG</small>
                    </>
                  )}

                  {photo && (
                    <span className="photo-overlay">
                      CHANGE PHOTO
                    </span>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={handlePhoto}
                />

                <div className="photo-upload-info">
                  <span>{photo ? "PHOTO READY." : "YOUR PORTRAIT"}</span>

                  {photo && (
                    <button
                      type="button"
                      className="small-action"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      CHANGE
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="builder-step">
              <div className="step-number">02 / BUILD</div>

              <h2>What are you building?</h2>

              <p className="step-copy">
                
              </p>

              <div className="stack-grid">
                {STACKS.map((stack) => {
                  const active = selectedStacks.includes(stack);

                  return (
                    <button
                      key={stack}
                      type="button"
                      className={`stack-option ${
                        active ? "active" : ""
                      }`}
                      onClick={() => toggleStack(stack)}
                    >
                      <span>{active ? "✓" : "+"}</span>
                      {stack}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 03 */}
            <div className="builder-step">
              <div className="step-number">03 / SIGNAL</div>

              <h2>Your signal.</h2>

              <p className="step-copy">
                
              </p>

              <label className="field-label">
                YOUR NAME
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anushka Aher"
                  maxLength={35}
                />
              </label>

              <label className="field-label">
                BUILDER ENERGY
                <input
                  value={builderTitle}
                  onChange={(e) => setBuilderTitle(e.target.value)}
                  placeholder="e.g. Future Founder"
                  maxLength={30}
                />
              </label>

              <label className="field-label">
                YOUR LINE
                <input
                  value={builderLine}
                  onChange={(e) => setBuilderLine(e.target.value)}
                  placeholder="e.g. Building things that matter."
                  maxLength={65}
                />
              </label>

              <div className="claim-area">
                <button
                  type="button"
                  className="claim-button"
                  disabled={
                    isDownloading ||
                    !name.trim() ||
                    selectedStacks.length === 0
                  }
                  onClick={downloadPass}
                >
                  {isDownloading
                    ? "CREATING PASS..."
                    : "CLAIM MY FIELD PASS →"}
                </button>

                <p>
                  
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT PREVIEW
          ================================================= */}

          <section className="builder-preview-panel">
            <div className="preview-heading">
              <div>
                <span className="section-kicker">LIVE PREVIEW</span>
                <h2>Your field pass.</h2>
              </div>

              <div className="live-dot">
                <i />
                LIVE
              </div>
            </div>

            <div className="pass-stage">
              <div className="pass-stage-sun" />

              <div className="pass-stage-mountain mountain-one" />
              <div className="pass-stage-mountain mountain-two" />

              <div className="pass-stage-wave">
                ~ ~ ~
              </div>

              <div className="pass-shadow-sheet pink-sheet" />
              <div className="pass-shadow-sheet yellow-sheet" />

              {/* PASS */}
              <article className="field-pass" ref={passRef}>

                <div className="pass-corner top-left">✦</div>
                <div className="pass-corner top-right">✦</div>
                <div className="pass-corner bottom-left">✦</div>
                <div className="pass-corner bottom-right">✦</div>

                <div className="pass-top">
                  <div className="pass-brand">
                    <div className="hh-mark">HH</div>

                    <div>
                      <strong>HACKER HOUSE</strong>
                      <span>GOA · 2026</span>
                    </div>
                  </div>

                  <div className="field-number">
                    <span>FIELD PASS</span>
                    <strong>01</strong>
                  </div>
                </div>

                <div className="pass-label">
                  BUILDER FIELD PASS
                </div>

                <div
                  className={`pass-photo ${
                    photo ? "pass-photo-filled" : ""
                  }`}
                  style={
                    photo
                      ? {
                          backgroundImage: `url(${photo})`,
                        }
                      : undefined
                  }
                >
                  {!photo && (
                    <div className="pass-photo-placeholder">
                      <span>YOUR</span>
                      <strong>PORTRAIT</strong>
                    </div>
                  )}

                  <small className="photo-index">01 / 01</small>
                </div>

                <div className="pass-identity">
                  <span className="identity-label">
                    BUILDER
                  </span>

                  <h3>
                    {name.trim() || "Your Name"}
                  </h3>

                  <div className="pass-stack">
                    {stackText}
                  </div>

                  <div className="pass-title">
                    {builderTitle.trim() || "BUILDER"}
                  </div>

                  <p className="pass-line">
                    {builderLine.trim() ||
                      "Build something worth remembering."}
                  </p>
                </div>

                <div className="card-goa-mark">
                  <div className="mini-sun" />
                  <div className="mini-wave">≈</div>
                  <div className="mini-palm">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="pass-signal">
                  <span>BUILD SIGNAL</span>
                  <strong>GOA</strong>
                </div>

                <div className="pass-divider" />

                <div className="pass-bottom">
                  <div className="pass-id">
                    <span>BUILDER ID</span>
                    <strong>{builderId}</strong>
                    <small>HACKER HOUSE GOA · 2026</small>
                  </div>

                  <div className="qr-wrap">
                    <div className="fake-qr">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>

                <div className="pass-footer">
                  <span className="frame-goa">
                    #FRAMEINGOA
                  </span>

                  <span>BUILD · CONNECT · SHIP</span>
                </div>
              </article>

              {/* decorative palms */}
              <div className="stage-palm stage-palm-left">
                <div className="palm-leaves">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="palm-trunk" />
              </div>

              <div className="stage-palm stage-palm-right">
                <div className="palm-leaves">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="palm-trunk" />
              </div>
            </div>

            <div className="preview-meta">
              <span>LOCAL GENERATION</span>
              <span>NO DATA UPLOAD</span>
            </div>

            <div className="share-area">
              <button
                type="button"
                className="share-button"
                onClick={sharePass}
              >
                {copied ? "COPIED ✓" : "SHARE YOUR PASS ↗"}
              </button>

              <button
                type="button"
                className="copy-button"
                onClick={copyId}
              >
                COPY BUILDER ID
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* =====================================================
          BOTTOM WORLD
      ===================================================== */}

      <section className="builder-bottom-world">
        <div className="bottom-copy">
          <span>HACKER HOUSE GOA · 2026</span>

          <h2>
            Build here.
            <br />
            <em>Leave a mark.</em>
          </h2>
        </div>

        <div className="bottom-icons">
          <div>✦</div>
          <div>⌁</div>
          <div>{"{}"}</div>
        </div>

        <div className="bottom-palm">
          <div className="palm-leaves">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="palm-trunk" />
        </div>
      </section>
    </main>
  );
}

export default App;