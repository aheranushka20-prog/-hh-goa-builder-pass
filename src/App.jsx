import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  const [name, setName] = useState("");
  const [builderTitle, setBuilderTitle] = useState("");
  const [builderBuild, setBuilderBuild] = useState("");
  const [builderLine, setBuilderLine] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const passRef = useRef(null);

  const [builderId] = useState(
    `HH-26-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`
  );

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.onerror = () => {
      alert("Unable to load this photo. Please try another image.");
    };

    reader.readAsDataURL(file);
  };

  const downloadPass = async () => {
    if (!passRef.current) return;

    try {
      setIsDownloading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const dataUrl = await toPng(passRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#f7f0df",
      });

      const link = document.createElement("a");

      const safeName =
        name.trim().replace(/\s+/g, "-") || "HH-Goa";

      link.download = `${safeName}-HH-Goa-Builder-Pass.png`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Unable to download pass:", error);

      alert(
        "Something went wrong while creating your pass. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const shareOnX = () => {
    const shareText =
      "I'm building in Goa with Hacker House 2026. Meet my Builder Identity. #FrameInGoa";

    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;

    window.open(xUrl, "_blank", "noopener,noreferrer");
  };

  const copyShareText = async () => {
    const text =
      "I'm building in Goa with Hacker House 2026. Meet my Builder Identity. #FrameInGoa";

    try {
      await navigator.clipboard.writeText(text);
      alert("Share text copied!");
    } catch {
      alert(text);
    }
  };

  const canClaim =
    name.trim() &&
    builderTitle.trim() &&
    builderBuild.trim();

  if (started) {
    return (
      <main className="builder-page">
        {/* HEADER */}
        <header className="builder-header">
          <button
            className="back-button"
            onClick={() => setStarted(false)}
          >
            ← Exit field guide
          </button>

          <div className="builder-header-center">
            <span>HH GOA 2026</span>
            <strong>BUILDER FIELD GUIDE</strong>
          </div>

          <div className="builder-progress">
            03 <span>/</span> 03
          </div>
        </header>

        <section className="builder-layout">

          {/* =========================
              LEFT EDITOR
          ========================= */}

          <div className="builder-editor">

            {/* INTRO */}
            <div className="editor-intro">
              <span className="section-kicker">
                FIELD GUIDE
              </span>

              <h1>
                Build your
                <br />
                <em>identity.</em>
              </h1>

              <p>
                Three signals. One field pass.
                <br />
                Make yours worth remembering.
              </p>
            </div>

            {/* =========================
                01 / FACE
            ========================= */}

            <div className="builder-step">
              <div className="step-number">
                01 / FACE
              </div>

              <h2>
                Put yourself on the map.
              </h2>

              <p className="step-copy">
                Add the face behind the build.
              </p>

              <div className="photo-upload-area">

                <div
                  className={`photo-upload-preview ${
                    photo ? "has-photo" : ""
                  }`}
                  style={
                    photo
                      ? {
                          backgroundImage: `url("${photo}")`,
                        }
                      : {}
                  }
                >
                  {!photo && (
                    <>
                      <span className="photo-cross">
                        +
                      </span>

                      <span>
                        YOUR PHOTO
                      </span>
                    </>
                  )}
                </div>

                <div className="photo-upload-info">
                  <span>
                    {photo
                      ? "PHOTO READY ✓"
                      : "PORTRAIT / JPG / PNG"}
                  </span>

                  <label className="small-action">
                    {photo
                      ? "CHANGE PHOTO"
                      : "ADD PHOTO"}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handlePhotoUpload}
                      hidden
                    />
                  </label>
                </div>

              </div>
            </div>

            {/* =========================
                02 / IDENTITY
            ========================= */}

            <div className="builder-step">
              <div className="step-number">
                02 / IDENTITY
              </div>

              <h2>
                Who's behind the build?
              </h2>

              <p className="step-copy">
              
              </p>

              {/* NAME */}

              <label className="field-label">
                YOUR NAME

                <input
                  type="text"
                  placeholder="e.g. Anushka Aher"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  maxLength={30}
                />
              </label>

              {/* BUILDER TITLE */}

              <label className="field-label">
                BUILDER TITLE

                <input
                  type="text"
                  placeholder="e.g. Creative Technologist"
                  value={builderTitle}
                  onChange={(e) =>
                    setBuilderTitle(e.target.value)
                  }
                  maxLength={30}
                />
              </label>
            </div>

            {/* =========================
                03 / BUILD
            ========================= */}

            <div className="builder-step">
              <div className="step-number">
                03 / BUILD
              </div>

              <h2>
                What do you build?
              </h2>

              <p className="step-copy">
              
                <br />
              </p>

              {/* BUILD */}

              <label className="field-label">
                YOUR BUILD

                <input
                  type="text"
                  placeholder="e.g. AI tools, creative websites, robots..."
                  value={builderBuild}
                  onChange={(e) =>
                    setBuilderBuild(e.target.value)
                  }
                  maxLength={65}
                />
              </label>

              <p className="build-helper">
              
              </p>

              {/* BUILDER LINE */}

              <label className="field-label">
                BUILDER LINE

                <input
                  type="text"
                  placeholder="e.g. Turning weird ideas into useful things."
                  value={builderLine}
                  onChange={(e) =>
                    setBuilderLine(e.target.value)
                  }
                  maxLength={65}
                />
              </label>
            </div>

            {/* =========================
                CLAIM
            ========================= */}

            <div className="claim-area">
              <button
                className="claim-button"
                onClick={downloadPass}
                disabled={
                  isDownloading || !canClaim
                }
              >
                {isDownloading
                  ? "CREATING YOUR PASS..."
                  : "CLAIM MY FIELD PASS →"}
              </button>

              <p>
              
              </p>
            </div>

          </div>

          {/* =========================
              RIGHT PREVIEW
          ========================= */}

          <div className="builder-preview-panel">
            <div className="preview-sticky">

              <div className="preview-heading">
                <div>
                  <span className="section-kicker">
                    LIVE ARTIFACT
                  </span>

                  <h2>
                    Your field pass
                  </h2>
                </div>

                <span className="live-dot">
                  LIVE
                </span>
              </div>

              <div className="pass-stage">

                <div className="pass-shadow-sheet pink-sheet" />

                <div className="pass-shadow-sheet yellow-sheet" />

                <div
                  className="field-pass signal-default"
                  ref={passRef}
                >

                  {/* CORNER MARKS */}

                  <div className="pass-corner-mark top-left">
                    +
                  </div>

                  <div className="pass-corner-mark top-right">
                    +
                  </div>

                  <div className="pass-corner-mark bottom-left">
                    +
                  </div>

                  <div className="pass-corner-mark bottom-right">
                    +
                  </div>

                  {/* TOP */}

                  <div className="pass-top">

                    <div className="pass-brand">
                      <span className="hh-mark">
                        HH
                      </span>

                      <div>
                        <strong>
                          HACKER HOUSE
                        </strong>

                        <span>
                          GOA / 2026
                        </span>
                      </div>
                    </div>

                    <div className="field-number">
                      FIELD
                      <strong>01</strong>
                    </div>

                  </div>

                  {/* LABEL */}

                  <div className="pass-label">
                    BUILDER FIELD PASS
                  </div>

                  {/* PHOTO */}

                  <div
                    className={`pass-photo ${
                      photo
                        ? "pass-photo-filled"
                        : ""
                    }`}
                    style={
                      photo
                        ? {
                            backgroundImage: `url("${photo}")`,
                          }
                        : {}
                    }
                  >

                    {!photo && (
                      <div className="pass-photo-placeholder">
                        <span>
                          YOUR
                        </span>

                        <strong>
                          PHOTO
                        </strong>
                      </div>
                    )}

                    <div className="photo-index">
                      IMG / 01
                    </div>

                  </div>

                  {/* IDENTITY */}

                  <div className="pass-identity">

                    <span className="identity-label">
                      BUILDER IDENTITY
                    </span>

                    <h3>
                      {name ||
                        "YOUR NAME"}
                    </h3>

                    <div className="pass-stack">
                      {builderBuild ||
                        "AI · WEB · DESIGN"}
                    </div>

                    <div className="pass-title">
                      {builderTitle ||
                        "FUTURE BUILDER"}
                    </div>

                    <p className="pass-line">
                      “
                      {builderLine ||
                        "Build something worth remembering."}
                      ”
                    </p>

                  </div>

                  {/* SIGNAL */}

                  <div className="pass-signal">
                    <span>
                      SIGNAL
                    </span>

                    <strong>
                      BUILD
                    </strong>
                  </div>

                  <div className="pass-divider" />

                  {/* BOTTOM */}

                  <div className="pass-bottom">

                    <div className="pass-id">
                      <span>
                        BUILDER ID
                      </span>

                      <strong>
                        {builderId}
                      </strong>

                      <small>
                        GOA · INDIA · 28—31 OCT 2026
                      </small>
                    </div>

                    <div className="qr-wrap">
                      <QRCodeSVG
                        value={`HH Goa Builder ${builderId}`}
                        size={64}
                        bgColor="#f7f0df"
                        fgColor="#10251d"
                        level="M"
                      />
                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="pass-footer">
                    <span>
                      #FRAMEINGOA
                    </span>

                    <span>
                      BUILD · SHIP · CONNECT
                    </span>
                  </div>

                  {/* STAMP */}

                  <div className="pass-stamp">
                    GOA
                    <br />
                    BUILDER
                  </div>

                </div>
              </div>

              {/* META */}

              <div className="preview-meta">
                <span>
                  STATIC BUILDER ARTIFACT
                </span>

                <span>
                  HH GOA / 2026
                </span>
              </div>

              {/* SHARE */}

              <div className="share-area">

                <button
                  className="share-button"
                  onClick={shareOnX}
                >
                  𝕏 SHARE ON X
                </button>

                <button
                  className="copy-button"
                  onClick={copyShareText}
                >
                  COPY SHARE TEXT
                </button>

              </div>

            </div>
          </div>

        </section>
      </main>
    );
  }

  /* =====================================================
     LANDING PAGE
  ===================================================== */

  return (
    <main className="app">

      <div className="grain" />

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="brand">

          <span className="brand-mark">
            HH
          </span>

          <div className="brand-copy">
            <strong>
              HACKER HOUSE
            </strong>

            <span>
              GOA / 2026
            </span>
          </div>

        </div>

        <div className="nav-center">
          BUILDER FIELD GUIDE
        </div>

        <div className="nav-right">
          <span>
            28—31 OCT
          </span>

          <span className="nav-dot" />

          <span>
            GOA, INDIA
          </span>
        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-copy">

          <div className="hero-kicker">
            <span className="yellow-marker" />

            HH GOA 2026 / BUILDER FIELD GUIDE
          </div>

          <h1>
            WHO ARE YOU
            <br />
            <span>
              BUILDING AS?
            </span>
          </h1>

          <p className="hero-description">
            Goa is the setting.
            <br />
            <strong>
              Building is the reason.
            </strong>
          </p>

          <button
            className="hero-button"
            onClick={() => setStarted(true)}
          >
            <span>
              FIND YOUR BUILDER IDENTITY
            </span>

            <strong>
              →
            </strong>
          </button>

          <div className="hero-trust">
            <span>
              ✦ NO SIGNUP
            </span>

            <span>
              ✦ FREE
            </span>

            <span>
              ✦ GENERATED LOCALLY
            </span>
          </div>

          <p className="privacy-note">
            Your photo stays in your browser.
          </p>

        </div>

        {/* HERO ART */}

        <div className="hero-art">

          <div className="sun-disc" />

          <div className="palm-line palm-one">
            ⌁
          </div>

          <div className="palm-line palm-two">
            ⌁
          </div>

          <div className="hero-sheet sheet-pink" />

          <div className="hero-sheet sheet-yellow" />

          <div className="hero-field-pass">

            <div className="pass-corner-mark top-left">
              +
            </div>

            <div className="pass-corner-mark top-right">
              +
            </div>

            <div className="hero-pass-top">

              <div className="pass-brand">

                <span className="hh-mark">
                  HH
                </span>

                <div>
                  <strong>
                    HACKER HOUSE
                  </strong>

                  <span>
                    GOA / 2026
                  </span>
                </div>

              </div>

              <div className="field-number">
                FIELD
                <strong>
                  01
                </strong>
              </div>

            </div>

            <div className="pass-label">
              BUILDER FIELD PASS
            </div>

            <div className="hero-pass-photo">

              <div>
                <span>
                  YOUR
                </span>

                <strong>
                  PHOTO
                </strong>
              </div>

              <small>
                IMG / 01
              </small>

            </div>

            <div className="hero-pass-info">

              <span>
                BUILDER IDENTITY
              </span>

              <h2>
                Your Name
              </h2>

              <p>
                AI · WEB · DESIGN
              </p>

              <strong>
                FUTURE BUILDER
              </strong>

              <em>
                “Build something worth remembering.”
              </em>

            </div>

            <div className="hero-signal">
              SIGNAL
              <strong>
                BUILD
              </strong>
            </div>

            <div className="hero-pass-divider" />

            <div className="hero-pass-bottom">

              <div>
                <span>
                  BUILDER ID
                </span>

                <strong>
                  {builderId}
                </strong>

                <small>
                  GOA · INDIA
                </small>
              </div>

              <QRCodeSVG
                value={`HH Goa Builder ${builderId}`}
                size={58}
                bgColor="#f7f0df"
                fgColor="#10251d"
                level="M"
              />

            </div>

            <div className="hero-pass-footer">

              <span>
                #FRAMEINGOA
              </span>

              <span>
                BUILD · SHIP · CONNECT
              </span>

            </div>

            <div className="pass-stamp hero-stamp">
              GOA
              <br />
              BUILDER
            </div>

          </div>

          <div className="coordinate-label">
            15°29′N / 73°49′E
          </div>

          <div className="hero-note-tag">
            <span>
              FIELD NOTE 01
            </span>

            <strong>
              MAKE SOMETHING REAL.
            </strong>
          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="landing-footer">

        <div>
          <span>
            HH GOA 2026
          </span>

          <strong>
            28—31 OCTOBER
          </strong>
        </div>

        <div className="footer-center">
          <span>
            #FRAMEINGOA
          </span>

          <i />

          <span>
            GOA · INDIA
          </span>
        </div>

        <div>
          <span>
            247 BUILDERS
          </span>

          <strong>
            BUILD · SHIP · LAUNCH
          </strong>
        </div>

      </footer>

    </main>
  );
}

export default App;