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
  const [latestResult, setLatestResult] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [tokens, setTokens] = useState(0);

  const drawerRef = useRef(null);

  /*
  ========================================
  Backend URL
  ========================================
  */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  //const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /*
  ========================================
  Get Product
  ========================================
  */

  const product = bookingData?.product;

  const productImage =
    product?.mainImage ||
    product?.thumbnailImage ||
    product?.galleryImages?.[0] ||
    product?.images?.[0] ||
    "";

  const productName =
    bookingData?.productName || product?.name || "Designer Outfit";

  /*
  ========================================
  Prevent unused variable warning
  ========================================
  */

  void productImage;
  void productName;
  void latestResult;

  /*
  ========================================
  Generate Virtual Try-On
  ========================================
  */

  const handleGenerateTryOn = async () => {
    if (!uploadedImage) {
      alert("Please upload your photo.");
      return;
    }

    if (!product?._id) {
      alert("Product information is missing. Please try again.");

      console.error("Virtual Try-On Error: Product ID is missing.", product);

      return;
    }

    /*
  ========================================
  Get Authentication Token
  ========================================
  */

    const authToken =
      localStorage.getItem("rajanya_token") || localStorage.getItem("token");

    if (!authToken) {
      alert("Please login again before using Virtual Try-On.");
      return;
    }

    /*
  ========================================
  Prevent Multiple Generation Requests
  ========================================
  */

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      /*
    ========================================
    VERIFY TOKEN BALANCE
    ========================================

    Backend / MongoDB is the source of truth.
    ========================================
    */

      const tokenResponse = await fetch(
        `${API_BASE_URL}/virtual-try-on/my-tokens`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const tokenData = await tokenResponse.json();

      console.log("Virtual Try-On Token Verification:", tokenData);

      /*
    ========================================
    NO VTO ACCOUNT
    ========================================
    */

      if (tokenResponse.status === 404) {
        setTokens(0);

        alert("You do not have any Virtual Try-On generations available.");

        return;
      }

      /*
    ========================================
    TOKEN API ERROR
    ========================================
    */

      if (!tokenResponse.ok || !tokenData.success) {
        throw new Error(
          tokenData.message || "Unable to verify Virtual Try-On tokens.",
        );
      }

      /*
    ========================================
    GET AVAILABLE TOKENS
    ========================================
    */

      const availableTokens = tokenData?.tokens?.availableTokens;

      /*
    ========================================
    NO TOKENS
    ========================================
    */

      if (typeof availableTokens !== "number" || availableTokens <= 0) {
        setTokens(0);

        alert("No Try-On generations remaining.");

        return;
      }

      /*
    ========================================
    SYNCHRONIZE TOKEN BALANCE
    ========================================
    */

      setTokens(availableTokens);

      /*
    ========================================
    STEP 1
    Upload Customer Image
    ========================================
    */

      console.log("========================================");
      console.log("VIRTUAL TRY-ON: UPLOADING IMAGE");
      console.log("========================================");

      const formData = new FormData();

      formData.append("image", uploadedImage);

      const uploadResponse = await fetch(
        `${API_BASE_URL}/virtual-try-on/upload`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${authToken}`,
          },

          body: formData,
        },
      );

      const uploadData = await uploadResponse.json();

      console.log("Virtual Try-On Upload Response:", uploadData);

      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(uploadData.message || "Failed to upload your image.");
      }

      /*
    ========================================
    STEP 2
    Create FitRoom Generation Task
    ========================================
    */

      console.log("========================================");
      console.log("VIRTUAL TRY-ON: CREATING FITROOM TASK");
      console.log("========================================");

      console.log("Product ID:", product._id);

      const generateResponse = await fetch(
       `${API_BASE_URL}/virtual-try-on/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${authToken}`,
          },

          body: JSON.stringify({
            productId: product._id,
          }),
        },
      );

      const generateData = await generateResponse.json();

      console.log("FitRoom Generate Response:", generateData);

      if (!generateResponse.ok || !generateData.success) {
        throw new Error(
          generateData.message ||
            "Failed to create FitRoom Virtual Try-On task.",
        );
      }

      /*
    ========================================
    STEP 3
    Get FitRoom Task ID
    ========================================
    */

      const taskId = generateData?.taskId;

      if (!taskId) {
        throw new Error(
          "FitRoom task was created but no task ID was returned.",
        );
      }

      console.log("FitRoom Task ID:", taskId);

      /*
    ========================================
    STEP 4
    Poll FitRoom Task Status
    ========================================
    */

      const maxAttempts = 60;
      const pollInterval = 3000;

      let generatedImageUrl = null;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(
          `Checking FitRoom task status... Attempt ${attempt}/${maxAttempts}`,
        );

        const statusResponse = await fetch(
         `${API_BASE_URL}/virtual-try-on/status/${taskId}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        const statusData = await statusResponse.json();

        console.log("FitRoom Status Response:", statusData);

        if (!statusResponse.ok || !statusData.success) {
          throw new Error(
            statusData.message || "Failed to check FitRoom task status.",
          );
        }

        /*
      ========================================
      Extract FitRoom Data
      ========================================
      */

        const fitRoomData = statusData?.data || {};

        const status = fitRoomData?.status || fitRoomData?.state;

        console.log("FitRoom Task Status:", status);

        /*
      ========================================
      Task Failed
      ========================================
      */

        if (
          status === "FAILED" ||
          status === "ERROR" ||
          status === "CANCELED" ||
          status === "CANCELLED"
        ) {
          throw new Error(
            fitRoomData?.message ||
              fitRoomData?.error ||
              "FitRoom Virtual Try-On generation failed.",
          );
        }

        /*
      ========================================
      Task Completed
      ========================================
      */

        if (status === "COMPLETED" || status === "SUCCESS") {
          console.log("FitRoom generation completed.");

          console.log("Complete FitRoom Result:", fitRoomData);

          /*
        ========================================
        Extract Generated Image
        ========================================
        */

          generatedImageUrl =
            fitRoomData?.download_signed_url ||
            fitRoomData?.downloadSignedUrl ||
            fitRoomData?.result_url ||
            fitRoomData?.resultUrl ||
            fitRoomData?.output_url ||
            fitRoomData?.outputUrl ||
            fitRoomData?.image_url ||
            fitRoomData?.imageUrl ||
            fitRoomData?.generated_image ||
            fitRoomData?.generatedImage;

          /*
        ========================================
        Check Nested Result
        ========================================
        */

          if (!generatedImageUrl) {
            generatedImageUrl =
              fitRoomData?.result?.download_signed_url ||
              fitRoomData?.result?.url ||
              fitRoomData?.result?.image_url ||
              fitRoomData?.result?.imageUrl ||
              fitRoomData?.result?.generatedImage;
          }

          /*
        ========================================
        No Image URL
        ========================================
        */

          if (!generatedImageUrl) {
            console.error(
              "FitRoom completed but no image URL was found.",
              fitRoomData,
            );

            throw new Error(
              "FitRoom completed the generation but no result image URL was returned.",
            );
          }

          /*
        ========================================
        Image URL Found
        ========================================
        */

          console.log("========================================");

          console.log("FITROOM GENERATION COMPLETED");

          console.log("Generated Image URL:", generatedImageUrl);

          console.log("========================================");

          break;
        }

        /*
      ========================================
      Still Processing
      ========================================
      */

        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }
      }

      /*
    ========================================
    Check Final Result
    ========================================
    */

      if (!generatedImageUrl) {
        throw new Error(
          "Virtual Try-On generation timed out. Please try again.",
        );
      }

      /*
    ========================================
    FINALIZE RESULT
    ========================================
    */

      console.log("========================================");

      console.log("VIRTUAL TRY-ON: FINALIZING RESULT");

      console.log("========================================");

      const finalizeResponse = await fetch(
        `${API_BASE_URL}/virtual-try-on/finalize`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${authToken}`,
          },

          body: JSON.stringify({
            productId: product._id,
            generatedImageUrl,
            taskId,
            paymentId: bookingData?.paymentId || null,
          }),
        },
      );

      const finalizeData = await finalizeResponse.json();

      console.log("VTO Finalize Response:", finalizeData);

      if (!finalizeResponse.ok || !finalizeData.success) {
        throw new Error(
          finalizeData.message ||
            "Virtual Try-On was generated but could not be finalized.",
        );
      }

      /*
    ========================================
    Permanent Generated Image
    ========================================
    */

      const permanentGeneratedImage =
        finalizeData?.generatedImage || generatedImageUrl;

      setGeneratedImage(permanentGeneratedImage);

      /*
    ========================================
    Updated Token Balance
    ========================================
    */

      const updatedAvailableTokens = finalizeData?.tokens?.availableTokens;

      if (typeof updatedAvailableTokens === "number") {
        setTokens(updatedAvailableTokens);
      }

      /*
    ========================================
    Move To Result Step
    ========================================
    */

      setCurrentStep(2);

      alert("Virtual Try-On generated successfully!");
    } catch (error) {
      console.error("Virtual Try-On Generation Error:", error);

      alert(
        error.message ||
          "Something went wrong while generating your Virtual Try-On.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /*
  ========================================
  Try Again
  ========================================
  */

  const handleTryAgain = () => {
    if (isGenerating) return;

    setGeneratedImage(null);
    setCurrentStep(1);
  };

  /*
  ========================================
  Body Scroll Lock
  ========================================
  */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
  ========================================
  ESC KEY
  ========================================
  */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isGenerating) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isGenerating, onClose]);

  /*
  ========================================
  Click Outside
  ========================================
  */

  const handleOverlayClick = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      !isGenerating
    ) {
      onClose?.();
    }
  };

  /*
  ========================================
  FETCH LATEST RESULT
  ========================================
  */

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchLatestResult = async () => {
      try {
        const authToken =
          localStorage.getItem("rajanya_token") ||
          localStorage.getItem("token");

        if (!authToken) return;

        const response = await fetch(
          `${API_BASE_URL}/virtual-try-on/latest`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        const data = await response.json();

        if (!isMounted) return;

        console.log("Latest Virtual Try-On Response:", data);

        if (!response.ok || !data.success) {
          setLatestResult(null);
          return;
        }

        const result = data?.data;

        setLatestResult(result);

        /*
        ========================================
        Restore Result Only For Current Product
        ========================================
        */

        if (
          product?._id &&
          result?.productId &&
          String(result.productId) === String(product._id) &&
          result?.generatedImage
        ) {
          setGeneratedImage(result.generatedImage);
          setCurrentStep(2);
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("Latest Virtual Try-On Error:", error);

        setLatestResult(null);
      }
    };

    fetchLatestResult();

    return () => {
      isMounted = false;
    };
  }, [isOpen, product?._id, API_BASE_URL]);

  /*
  ========================================
  FETCH TOKEN BALANCE
  ========================================
  */

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchTokenBalance = async () => {
      try {
        const authToken =
          localStorage.getItem("rajanya_token") ||
          localStorage.getItem("token");

        if (!authToken) {
          console.warn("No authentication token found.");
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/virtual-try-on/my-tokens`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        const data = await response.json();

        if (!isMounted) return;

        console.log("Virtual Try-On Token Response:", data);

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch Try-On tokens.");
        }

        const availableTokens = data?.tokens?.availableTokens;

        if (typeof availableTokens === "number") {
          setTokens(availableTokens);
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("Token Balance Error:", error);
      }
    };

    fetchTokenBalance();

    return () => {
      isMounted = false;
    };
  }, [isOpen, API_BASE_URL]);

  /*
  ========================================
  CLOSED STATE
  ========================================
  */

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="virtual-studio-overlay"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={handleOverlayClick}
          role="presentation"
        >
          <motion.div
            ref={drawerRef}
            className="virtual-studio-drawer"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="virtual-studio-title"
          >
            <div className="virtual-studio-wrapper">
              {/* =========================
                  HEADER
              ========================== */}

              <header className="virtual-studio-header">
                <div className="virtual-studio-header-content">
                  <span className="virtual-studio-eyebrow">
                    RAJANYA VIRTUAL STUDIO
                  </span>

                  <h2 id="virtual-studio-title">Try It On</h2>

                  <p>See how this outfit looks on you instantly.</p>
                </div>

                <div className="virtual-studio-header-right">
                  <div
                    className="virtual-studio-token-pill"
                    aria-label={`${tokens} try-on tokens remaining`}
                  >
                    <span className="virtual-token-icon">✦</span>

                    <span>{tokens}</span>

                    <span className="virtual-token-label">Tokens</span>
                  </div>

                  <button
                    type="button"
                    className="virtual-studio-close-btn"
                    onClick={onClose}
                    disabled={isGenerating}
                    aria-label="Close Virtual Try-On Studio"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </header>

              {/* =========================
                  STEPPER
              ========================== */}

              <div className="virtual-studio-stepper">
                <div
                  className={`virtual-step ${
                    currentStep === 1 ? "active" : "completed"
                  }`}
                >
                  <div className="virtual-step-circle">
                    {currentStep === 2 ? "✓" : "1"}
                  </div>

                  <span>Upload Photo</span>
                </div>

                <div
                  className={`virtual-step-line ${
                    currentStep === 2 ? "completed" : ""
                  }`}
                  aria-hidden="true"
                />

                <div
                  className={`virtual-step ${
                    currentStep === 2 ? "active" : ""
                  }`}
                >
                  <div className="virtual-step-circle">2</div>

                  <span>Result</span>
                </div>
              </div>

              {/* =========================
                  STEP 1
              ========================== */}

              {currentStep === 1 && (
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
                  </div>

                  <aside className="virtual-right-section">
                    <TryOnInfoCard />

                    <BestResultCard />
                  </aside>
                </div>
              )}

              {/* =========================
                  STEP 2
              ========================== */}

              {currentStep === 2 && (
                <div className="virtual-result-step">
                  <div className="virtual-result-main">
                    <SelectedOutfitCard product={product} />

                    <GeneratedResultCard
                      generatedImage={generatedImage}
                      uploadedImage={uploadedImage}
                      onTryAgain={handleTryAgain}
                    />
                  </div>

                  <aside className="virtual-right-section">
                    <TryOnInfoCard />

                    <BestResultCard />
                  </aside>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualTryOnStudioDrawer;
