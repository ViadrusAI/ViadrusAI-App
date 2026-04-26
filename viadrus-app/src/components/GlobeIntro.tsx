import React, { useEffect, useState } from 'react';
import './GlobeIntro.scss';

interface GlobeIntroProps {
  onComplete: () => void;
}

const GlobeIntro: React.FC<GlobeIntroProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 1600);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`globe-intro ${isDone ? 'globe-intro--done' : ''}`}>
      <div className="globe-intro__vignette" />
      
      {/* Background Waves */}
      <div className="globe-intro__waves">
        <svg className="globe-intro__wave-svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="globe-intro__wave-parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(0, 210, 255, 0.05)" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(0, 210, 255, 0.1)" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(0, 210, 255, 0.15)" />
            <use href="#gentle-wave" x="48" y="7" fill="rgba(0, 210, 255, 0.2)" />
          </g>
        </svg>
      </div>

      <div className="globe-intro__content">
        <h1 className="globe-intro__logo-text">VIADRUS AI</h1>
        <div className="globe-intro__tagline">DIGITAL GUARDIAN OF THE ODER RIVER</div>

        <div className="globe-intro__status">
          <div className="globe-intro__status-item">
            <span className="globe-intro__status-label">ENGINE</span>
            <span className="globe-intro__status-val">READY</span>
          </div>
          <div className="globe-intro__status-sep" />
          <div className="globe-intro__status-item">
            <span className="globe-intro__status-label">DATA</span>
            <span className="globe-intro__status-val">SENTINEL-1/2</span>
          </div>
        </div>

        <div className="globe-intro__loader">
          <div className="globe-intro__loader-bar" />
        </div>
      </div>
    </div>
  );
};

export default GlobeIntro;
