import "./VirtualTryOnStudioDrawer.css";
import SelectedOutfitCard from "./SelectedOutfitCard";
import UploadPhotoCard from "./UploadPhotoCard";
import TryOnInfoCard from "./TryOnInfoCard";
import BestResultCard from "./BestResultCard";
import GenerateTryOnSection from "./GenerateTryOnSection";
import GeneratedResultCard from "./GeneratedResultCard";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VirtualTryOnStudioDrawer = ({ isOpen, onClose, bookingData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const [generatedImage, setGeneratedImage] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const [tokens, setTokens] = useState(bookingData?.tokens || 2);
  const handleGenerateTryOn = async () => {
    if (!uploadedImage) {
      alert("Please upload your photo.");
      return;
    }

    if (tokens <= 0) {
      alert("No Try-On tokens remaining.");
      return;
    }

    setIsGenerating(true);

    try {
      /*
      AI API will come here later.
    */

      setTimeout(() => {
        setGeneratedImage(URL.createObjectURL(uploadedImage));

        setTokens((prev) => prev - 1);

        setIsGenerating(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      setIsGenerating(false);
    }
  };
  const handleTryAgain = () => {
    setGeneratedImage(null);
  };
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  const product = bookingData?.product;

  const productImage = product?.images?.[0];

  const productName =
    bookingData?.productName || product?.name || "Designer Outfit";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="virtual-studio-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={drawerRef}
            className="virtual-studio-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="virtual-studio-wrapper">
              {/* HEADER */}

              <div className="virtual-studio-header">
                <div>
                  <h2>Try It On</h2>

                  <p>See how this outfit looks on you instantly</p>
                </div>

                <div className="virtual-studio-header-right">
                  <div className="virtual-studio-token-pill">
                    ✨ {tokens} Tokens
                  </div>

                  <button
                    className="virtual-studio-close-btn"
                    onClick={onClose}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* STEPPER */}

              <div className="virtual-studio-stepper">
                <div className="virtual-step active">
                  <div className="virtual-step-circle">1</div>

                  <span>Upload Photo</span>
                </div>

                <div className="virtual-step-line"></div>

                <div className="virtual-step">
                  <div className="virtual-step-circle">2</div>

                  <span>Result</span>
                </div>
              </div>
              <div className="virtual-main-content">
                <div className="virtual-left-section">
                  <SelectedOutfitCard product={product} />

                  <UploadPhotoCard
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                  />
                  <GenerateTryOnSection
                    uploadedImage={uploadedImage}
                    tokens={tokens}
                    isGenerating={isGenerating}
                    onGenerate={handleGenerateTryOn}
                  />
                  <GeneratedResultCard
                    generatedImage={generatedImage}
                    uploadedImage={uploadedImage}
                    onTryAgain={handleTryAgain}
                  />
                </div>

                <div className="virtual-right-section">
                  <TryOnInfoCard />
                  <BestResultCard />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualTryOnStudioDrawer;
