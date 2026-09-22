import "./TryOnInfoCard.css";

const TryOnInfoCard = () => {
  return (
    <section className="try-on-info-card">
      <div className="try-on-info-header">
        <div className="try-on-info-icon" aria-hidden="true">
          <span>✦</span>
        </div>

        <div className="try-on-info-title-wrap">
          <span className="try-on-info-eyebrow">
            AI VIRTUAL TRY-ON
          </span>

          <h3>Ready To See Yourself In This Look?</h3>
        </div>
      </div>

      <p>
        Upload a clear front-facing photo and our AI will create
        a realistic virtual try-on in seconds.
      </p>
    </section>
  );
};

export default TryOnInfoCard;