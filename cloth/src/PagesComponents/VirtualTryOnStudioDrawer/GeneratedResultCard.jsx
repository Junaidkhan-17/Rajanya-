import "./GeneratedResultCard.css";
import {
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const GeneratedResultCard = ({
  generatedImage,
  uploadedImage,
  onTryAgain,
}) => {
  if (!generatedImage) return null;

  const handleDownload = () => {
    const link =
      document.createElement("a");

    link.href = generatedImage;

    link.download =
      "virtual-try-on.png";

    link.click();
  };

  return (
    <div className="generated-result-card">
      <div className="generated-result-header">
        <Sparkles size={22} />

        <h3>Your AI Try-On Result</h3>
      </div>

      <div className="generated-result-images">
        {/* BEFORE */}

        <div className="generated-image-box">
          <span>Uploaded Photo</span>

          <img
            src={URL.createObjectURL(
              uploadedImage
            )}
            alt=""
          />
        </div>

        {/* AFTER */}

        <div className="generated-image-box">
          <span>AI Result</span>

          <img
            src={generatedImage}
            alt=""
          />
        </div>
      </div>

      <div className="generated-result-actions">
        <button
          className="download-result-btn"
          onClick={
            handleDownload
          }
        >
          <Download size={18} />

          Download
        </button>

        <button
          className="try-again-btn"
          onClick={
            onTryAgain
          }
        >
          <RefreshCw size={18} />

          Try Again
        </button>
      </div>
    </div>
  );
};

export default GeneratedResultCard;