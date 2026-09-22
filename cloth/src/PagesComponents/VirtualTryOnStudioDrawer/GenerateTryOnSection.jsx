import "./GenerateTryOnSection.css";
import { Sparkles, Loader2 } from "lucide-react";

const GenerateTryOnSection = ({
  uploadedImage,
  tokens,
  isGenerating,
  onGenerate,
}) => {
  return (
    <div className="generate-try-on-card">
      <div className="generate-try-on-header">
        <h3>Generate Your Virtual Try-On</h3>

        <span className="generate-token-pill">
          ✨ {tokens} Token
          {tokens !== 1 ? "s" : ""}
        </span>
      </div>

      <p>
        Upload your photo and let our AI create a realistic virtual try-on
        experience.
      </p>

      <button
        className="generate-try-on-btn"
        disabled={!uploadedImage || tokens <= 0 || isGenerating}
        onClick={onGenerate}
      >
        {isGenerating ? (
          <>
            <Loader2 size={20} className="generate-spinner" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate AI Try-On
          </>
        )}
      </button>

      {!uploadedImage && (
        <small className="generate-helper-text">
          Upload a photo to continue.
        </small>
      )}

      {tokens <= 0 && (
        <small className="generate-error-text">
          No Try-On tokens remaining.
        </small>
      )}
    </div>
  );
};

export default GenerateTryOnSection;
