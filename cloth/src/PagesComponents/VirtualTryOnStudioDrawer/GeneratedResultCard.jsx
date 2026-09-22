import "./GeneratedResultCard.css";

import {
  Download,
  RefreshCw,
  Sparkles,
  X,
  Maximize2,
} from "lucide-react";

import { useEffect, useState } from "react";

const GeneratedResultCard = ({
  generatedImage,
  uploadedImage,
  onTryAgain,
}) => {
  const [uploadedImageSource, setUploadedImageSource] = useState("");
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  /* =========================================================
     UPLOADED IMAGE SOURCE
  ========================================================= */

  useEffect(() => {
    if (!uploadedImage) {
      setUploadedImageSource("");
      return;
    }

    if (uploadedImage instanceof File) {
      const objectUrl = URL.createObjectURL(uploadedImage);

      setUploadedImageSource(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (typeof uploadedImage === "string") {
      setUploadedImageSource(uploadedImage);
      return;
    }

    setUploadedImageSource("");
  }, [uploadedImage]);

  /* =========================================================
     ESCAPE KEY + BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isImagePreviewOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsImagePreviewOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [isImagePreviewOpen]);

  /* =========================================================
     NO GENERATED IMAGE
  ========================================================= */

  if (!generatedImage) {
    return null;
  }

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = generatedImage;
    link.download = "virtual-try-on.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =========================================================
     OPEN IMAGE
  ========================================================= */

  const handleOpenPreview = () => {
    setIsImagePreviewOpen(true);
  };

  /* =========================================================
     CLOSE IMAGE
  ========================================================= */

  const handleClosePreview = () => {
    setIsImagePreviewOpen(false);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <section
        className="generated-result-card"
        aria-label="Virtual Try-On result"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="generated-result-header">
          <div
            className="generated-result-icon"
            aria-hidden="true"
          >
            <Sparkles size={20} />
          </div>

          <div className="generated-result-heading">
            <span className="generated-result-eyebrow">
              AI GENERATED
            </span>

            <h3>Your AI Try-On Result</h3>

            <p>
              Compare your original photo with your AI-generated
              look.
            </p>
          </div>
        </div>

        {/* =====================================================
            IMAGE COMPARISON
        ===================================================== */}

        <div className="generated-result-images">

          {/* ===================================================
              UPLOADED PHOTO — SMALL
          =================================================== */}

          <div className="generated-image-box generated-before-box">
            <div className="generated-image-label">
              <span>01</span>

              <strong>Uploaded Photo</strong>
            </div>

            <div className="generated-image-frame">
              {uploadedImageSource ? (
                <img
                  src={uploadedImageSource}
                  alt="Your uploaded customer photo"
                />
              ) : (
                <div className="generated-image-placeholder">
                  <span>No uploaded photo available</span>
                </div>
              )}
            </div>
          </div>

          {/* ===================================================
              AI RESULT — LARGE
          =================================================== */}

          <div className="generated-image-box generated-after-box">
            <div className="generated-image-label">
              <span>02</span>

              <strong>AI Result</strong>
            </div>

            <div
              className="generated-image-frame generated-result-frame"
              onClick={handleOpenPreview}
              role="button"
              tabIndex={0}
              aria-label="Open AI generated image in full screen"
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();

                  handleOpenPreview();
                }
              }}
            >
              <img
                src={generatedImage}
                alt="AI generated Virtual Try-On result"
              />

              {/* Desktop/mobile badge */}
              <div className="generated-result-badge">
                <Sparkles size={13} />

                <span>AI Result</span>
              </div>

              {/* Mobile only */}
              <div className="generated-image-mobile-overlay">
                <Maximize2 size={15} />

                <span>Tap to view</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="generated-result-actions">
          <button
            type="button"
            className="download-result-btn"
            onClick={handleDownload}
          >
            <Download
              size={18}
              aria-hidden="true"
            />

            <span>Download Result</span>
          </button>

          <button
            type="button"
            className="try-again-btn"
            onClick={onTryAgain}
          >
            <RefreshCw
              size={18}
              aria-hidden="true"
            />

            <span>Try Again</span>
          </button>
        </div>
      </section>

      {/* =======================================================
          FULL SCREEN IMAGE PREVIEW
      ======================================================= */}

      {isImagePreviewOpen && (
        <div
          className="generated-image-lightbox"
          onClick={handleClosePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen AI Virtual Try-On result"
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="generated-image-lightbox-close"
            onClick={(event) => {
              event.stopPropagation();

              handleClosePreview();
            }}
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>

          {/* IMAGE */}

          <div
            className="generated-image-lightbox-content"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <img
              src={generatedImage}
              alt="Full screen AI generated Virtual Try-On result"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratedResultCard;