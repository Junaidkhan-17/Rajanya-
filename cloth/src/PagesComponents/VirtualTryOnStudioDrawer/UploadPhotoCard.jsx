import "./UploadPhotoCard.css";

import {
  Upload,
  X,
} from "lucide-react";
import { Camera, CameraFill } from 'react-bootstrap-icons';
const UploadPhotoCard = ({
  uploadedImage,
  setUploadedImage,
}) => {
  /* ======================
      FILE UPLOAD
  ====================== */

  const handleFileUpload = (
    e,
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        "Image must be under 10MB."
      );
      return;
    }

    setUploadedImage(file);
  };

  /* ======================
      DRAG DROP
  ====================== */

  const handleDrop = (e) => {
    e.preventDefault();

    const file =
      e.dataTransfer.files?.[0];

    if (!file) return;

    setUploadedImage(file);
  };

  const handleDragOver = (
    e,
  ) => {
    e.preventDefault();
  };

  /* ======================
      REMOVE IMAGE
  ====================== */

  const removeImage = () => {
    setUploadedImage(null);
  };

  /* ======================
      PREVIEW URL
  ====================== */

  const preview =
    uploadedImage
      ? URL.createObjectURL(
          uploadedImage
        )
      : null;

  return (
    <div
      className="upload-photo-card"
      onDrop={handleDrop}
      onDragOver={
        handleDragOver
      }
    >
      {!uploadedImage ? (
        <>
          <div className="upload-icon-box">
            <Upload size={26} />
          </div>

          <h3>
            Choose Your Photo
          </h3>

          <p>
            Drag & drop your photo
            here or click to browse
          </p>

          <small>
            JPG, PNG supported •
            Max size 10MB
          </small>

          <label className="upload-btn">
            <Upload size={18} />

            Upload Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                handleFileUpload
              }
            />
          </label>

          <div className="upload-divider">
            <span>OR</span>
          </div>

          <button className="selfie-btn">
            <CameraFill size={24} />

            Take a Selfie
          </button>

          <small>
            Use your camera to take
            a photo
          </small>
        </>
      ) : (
        <div className="uploaded-preview">
          <img
            src={preview}
            alt="Preview"
          />

          <button
            className="remove-preview-btn"
            onClick={
              removeImage
            }
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadPhotoCard;