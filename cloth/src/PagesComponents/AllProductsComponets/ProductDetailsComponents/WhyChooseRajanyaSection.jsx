import "./WhyChooseRajanyaSection.css";

import {
  BadgeCheck,
  Leaf,
  Sparkles,
  SoapDispenserDroplet,
} from "lucide-react";

import Atropos from "atropos/react";
import "atropos/css";

const WhyChooseRajanyaSection = () => {
  return (
    <section className="why-rajanya-section">
      <div className="container">
        <div className="why-rajanya-grid">
          <Atropos
            highlight={false}
            shadow={false}
            rotateTouch="scroll-y"
          >
            <div className="why-rajanya-card">
              <div data-atropos-offset="5">
                <BadgeCheck size={36} />
              </div>

              <h3 data-atropos-offset="10">
                Premium Quality
              </h3>

              <p data-atropos-offset="15">
                Certified Designer Wear
              </p>
            </div>
          </Atropos>

          <Atropos
            highlight={false}
            shadow={false}
            rotateTouch="scroll-y"
          >
            <div className="why-rajanya-card">
              <div data-atropos-offset="5">
                <Leaf size={36} />
              </div>

              <h3 data-atropos-offset="10">
                Sustainable Fashion
              </h3>

              <p data-atropos-offset="15">
                Rent & Reduce Waste
              </p>
            </div>
          </Atropos>

          <Atropos
            highlight={false}
            shadow={false}
            rotateTouch="scroll-y"
          >
            <div className="why-rajanya-card">
              <div data-atropos-offset="5">
                <SoapDispenserDroplet size={36} />
              </div>

              <h3 data-atropos-offset="10">
                Expert Cleaning
              </h3>

              <p data-atropos-offset="15">
                Sanitized After Each Use
              </p>
            </div>
          </Atropos>

          <Atropos
            highlight={false}
            shadow={false}
            rotateTouch="scroll-y"
          >
            <div className="why-rajanya-card">
              <div data-atropos-offset="5">
                <Sparkles size={36} />
              </div>

              <h3 data-atropos-offset="10">
                Smart AI Try-On
              </h3>

              <p data-atropos-offset="15">
                VISUALIZE YOUR PERFECT LOOK INSTANTLY
              </p>
            </div>
          </Atropos>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRajanyaSection;