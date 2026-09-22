import "./UploadPhotoCard.css";

import { useEffect, useRef, useState } from "react";

import { Upload, X, Camera, RotateCcw, Check } from "lucide-react";

import { CameraFill } from "react-bootstrap-icons";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const UploadPhotoCard = ({ uploadedImage, setUploadedImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [capturedPreview, setCapturedPreview] = useState("");

  /*
  ========================================
  STOP CAMERA
  ========================================
  */

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraLoading(false);
  };

  /*
  ========================================
  START CAMERA
  ========================================
  */

  const startCamera = async () => {
    setCameraError("");
    setIsCameraLoading(true);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser or device.",
        );
      }

      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "user",
          },
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 1280,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      setIsCameraOpen(true);

      /*
      The video element is rendered after
      setIsCameraOpen(true), so we wait for
      the next render before assigning the stream.
      */

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current
            .play()
            .catch((error) => {
              console.error("Camera playback error:", error);
            });
        }
      });
    } catch (error) {
      console.error("Camera Access Error:", error);

      let message =
        "Unable to access your camera. Please check your browser permissions.";

      if (error?.name === "NotAllowedError") {
        message =
          "Camera permission was denied. Please allow camera access in your browser settings and try again.";
      }

      if (error?.name === "NotFoundError") {
        message = "No camera was found on this device.";
      }

      if (error?.name === "NotReadableError") {
        message =
          "Your camera is currently being used by another application.";
      }

      if (error?.name === "SecurityError") {
        message =
          "Camera access is blocked by your browser's security settings.";
      }

      setCameraError(message);

      stopCamera();
      setIsCameraOpen(false);
    } finally {
      setIsCameraLoading(false);
    }
  };

  /*
  ========================================
  OPEN CAMERA
  ========================================
  */

  const handleOpenCamera = () => {
    setCapturedPreview("");
    setCameraError("");
    startCamera();
  };

  /*
  ========================================
  CLOSE CAMERA
  ========================================
  */

  const handleCloseCamera = () => {
    stopCamera();

    setIsCameraOpen(false);
    setCapturedPreview("");
    setCameraError("");
  };

  /*
  ========================================
  CAPTURE SELFIE
  ========================================
  */

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setCameraError("Camera is not ready yet. Please try again.");
      return;
    }

    if (
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setCameraError("Camera is still loading. Please wait a moment.");
      return;
    }

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Unable to capture the photo. Please try again.");
      return;
    }

    /*
    Mirror the captured selfie so it feels
    natural to the user.
    */

    context.save();

    context.translate(videoWidth, 0);
    context.scale(-1, 1);

    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    context.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError("Unable to create the selfie image.");
          return;
        }

        const fileName = `rajanya-selfie-${Date.now()}.jpg`;

        const selfieFile = new File([blob], fileName, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        if (selfieFile.size > MAX_FILE_SIZE) {
          setCameraError("Captured image is too large. Please try again.");
          return;
        }

        const previewUrl = URL.createObjectURL(selfieFile);

        setCapturedPreview(previewUrl);

        setUploadedImage(selfieFile);

        stopCamera();

        setIsCameraOpen(false);
        setCameraError("");
      },
      "image/jpeg",
      0.92,
    );
  };

  /*
  ========================================
  RETAKE PHOTO
  ========================================
  */

  const handleRetakePhoto = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }

    setCapturedPreview("");
    setUploadedImage(null);
    setCameraError("");

    startCamera();
  };

  /*
  ========================================
  FILE UPLOAD
  ========================================
  */

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image must be under 10MB.");
      return;
    }

    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }

    setCapturedPreview("");
    setUploadedImage(file);
    setCameraError("");

    /*
    Allows the same file to be selected again
    after removing/replacing it.
    */

    event.target.value = "";
  };

  /*
  ========================================
  DRAG & DROP
  ========================================
  */

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please drop a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image must be under 10MB.");
      return;
    }

    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }

    setCapturedPreview("");
    setUploadedImage(file);
    setCameraError("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /*
  ========================================
  REMOVE IMAGE
  ========================================
  */

  const removeImage = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }

    setCapturedPreview("");
    setUploadedImage(null);
    setCameraError("");
  };

  /*
  ========================================
  PREVIEW URL
  ========================================
  */

  const uploadedPreview = uploadedImage
    ? URL.createObjectURL(uploadedImage)
    : null;

  /*
  ========================================
  CLEANUP OBJECT URL
  ========================================
  */

  useEffect(() => {
    return () => {
      stopCamera();

      if (capturedPreview) {
        URL.revokeObjectURL(capturedPreview);
      }
    };
  }, []);

  /*
  ========================================
  CLEANUP CAPTURED PREVIEW
  ========================================
  */

  useEffect(() => {
    return () => {
      if (capturedPreview) {
        URL.revokeObjectURL(capturedPreview);
      }
    };
  }, [capturedPreview]);

  /*
  ========================================
  CAMERA UI
  ========================================
  */

  if (isCameraOpen) {
    return (
      <div className="upload-photo-card camera-mode">
        <div className="camera-header">
          <div className="camera-header-content">
            <span className="camera-eyebrow">RAJANYA CAMERA</span>

            <h3>Take Your Selfie</h3>

            <p>
              Position your face and upper body inside the frame for the best
              virtual try-on result.
            </p>
          </div>

          <button
            type="button"
            className="camera-close-btn"
            onClick={handleCloseCamera}
            aria-label="Close camera"
          >
            <X size={20} />
          </button>
        </div>

        <div className="camera-preview-wrapper">
          <video
            ref={videoRef}
            className="camera-video"
            autoPlay
            playsInline
            muted
            aria-label="Camera preview"
          />

          <div className="camera-guide-overlay">
            <div className="camera-guide-frame"></div>

            <span className="camera-guide-text">
              Position yourself inside the frame
            </span>
          </div>

          {isCameraLoading && (
            <div className="camera-loading-overlay">
              <div className="camera-loading-spinner"></div>

              <span>Starting camera...</span>
            </div>
          )}
        </div>

        {cameraError && (
          <div className="camera-error-message" role="alert">
            <span>{cameraError}</span>

            <button
              type="button"
              onClick={startCamera}
              className="camera-retry-btn"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="camera-controls">
          <button
            type="button"
            className="camera-cancel-btn"
            onClick={handleCloseCamera}
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="button"
            className="camera-capture-btn"
            onClick={handleCapturePhoto}
            disabled={isCameraLoading || Boolean(cameraError)}
            aria-label="Capture selfie"
          >
            <span className="camera-capture-icon">
              <Camera size={24} />
            </span>

            <span>Capture</span>
          </button>
        </div>

        <canvas ref={canvasRef} className="camera-hidden-canvas" />
      </div>
    );
  }

  /*
  ========================================
  CAPTURED / UPLOADED PREVIEW
  ========================================
  */

  if (uploadedImage) {
    const previewSource = capturedPreview || uploadedPreview;

    return (
      <div className="upload-photo-card uploaded-mode">
        <div className="uploaded-preview-header">
          <div>
            <span className="uploaded-eyebrow">PHOTO READY</span>

            <h3>Your Photo</h3>
          </div>

          <div className="uploaded-success-icon">
            <Check size={18} />
          </div>
        </div>

        <div className="uploaded-preview">
          <img src={previewSource} alt="Uploaded preview" />

          <div className="uploaded-preview-overlay">
            <span>
              {capturedPreview ? "Selfie captured" : "Photo uploaded"}
            </span>
          </div>

          <button
            type="button"
            className="remove-preview-btn"
            onClick={removeImage}
            aria-label="Remove uploaded photo"
          >
            <X size={18} />
          </button>
        </div>

        <div className="uploaded-actions">
          <button
            type="button"
            className="retake-photo-btn"
            onClick={handleOpenCamera}
          >
            <Camera size={17} />
            Retake Selfie
          </button>

          <button
            type="button"
            className="replace-photo-btn"
            onClick={removeImage}
          >
            <RotateCcw size={17} />
            Choose Another
          </button>
        </div>
      </div>
    );
  }

  /*
  ========================================
  DEFAULT UPLOAD UI
  ========================================
  */

  return (
    <div
      className="upload-photo-card"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="upload-icon-box">
        <Upload size={26} />
      </div>

      <h3>Choose Your Photo</h3>

      <p>Drag & drop your photo here or click to browse</p>

      <small>JPG, PNG supported • Max size 10MB</small>

      <label className="upload-btn">
        <Upload size={18} />

        <span>Upload Photo</span>

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />
      </label>

      <div className="upload-divider">
        <span>OR</span>
      </div>

      <button
        type="button"
        className="selfie-btn"
        onClick={handleOpenCamera}
      >
        <CameraFill size={24} />

        <span>Take a Selfie</span>
      </button>

      <small>Use your camera to take a photo</small>

      {cameraError && (
        <div className="camera-inline-error" role="alert">
          {cameraError}
        </div>
      )}
    </div>
  );
};

export default UploadPhotoCard;