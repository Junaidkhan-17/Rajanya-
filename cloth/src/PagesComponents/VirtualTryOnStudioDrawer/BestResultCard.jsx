import "./BestResultCard.css";
import {
  Camera,
  Sun,
  User,
  Image,
  Users,
} from "lucide-react";

const BestResultCard = () => {
  const tips = [
    {
      id: 1,
      icon: <Camera size={20} />,
      text: "Front-facing photo",
    },
    {
      id: 2,
      icon: <Sun size={20} />,
      text: "Good lighting",
    },
    {
      id: 3,
      icon: <User size={20} />,
      text: "Full body visible",
    },
    {
      id: 4,
      icon: <Image size={20} />,
      text: "Plain background preferred",
    },
    {
      id: 5,
      icon: <Users size={20} />,
      text: "No group photos",
    },
  ];

  return (
    <div className="best-result-card">
      <h3>For Best Results</h3>

      <div className="best-result-list">
        {tips.map((tip) => (
          <div
            className="best-result-item"
            key={tip.id}
          >
            <div className="best-result-icon">
              {tip.icon}
            </div>

            <span>{tip.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestResultCard;