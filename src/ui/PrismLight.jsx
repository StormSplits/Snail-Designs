import { memo } from 'react';

/**
 * A lightweight CSS-based prism effect that mimics the WebGL version
 * but with significantly better performance (no GPU-heavy shaders)
 */
const PrismLight = ({ className = '' }) => {
    return (
        <div className={`prism-light-container ${className}`}>
            <style>{`
        .prism-light-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .prism-light {
          position: relative;
          width: 300px;
          height: 300px;
          animation: prism-float 6s ease-in-out infinite;
        }
        
        @media (min-width: 768px) {
          .prism-light {
            width: 400px;
            height: 400px;
          }
        }
        
        @media (min-width: 1280px) {
          .prism-light {
            width: 500px;
            height: 500px;
          }
        }
        
        .prism-shape {
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          background: linear-gradient(
            180deg,
            rgba(255, 200, 150, 0.9) 0%,
            rgba(255, 150, 100, 0.8) 20%,
            rgba(200, 100, 150, 0.7) 40%,
            rgba(100, 80, 200, 0.6) 60%,
            rgba(50, 100, 255, 0.5) 80%,
            rgba(100, 200, 255, 0.4) 100%
          );
          animation: prism-shimmer 4s ease-in-out infinite alternate;
        }
        
        .prism-glow-outer {
          position: absolute;
          inset: -60px;
          background: radial-gradient(
            ellipse at 50% 60%,
            rgba(100, 150, 255, 0.4) 0%,
            rgba(80, 100, 200, 0.2) 30%,
            rgba(50, 50, 150, 0.1) 50%,
            transparent 70%
          );
          filter: blur(40px);
          animation: prism-glow-pulse 5s ease-in-out infinite;
        }
        
        .prism-glow-top {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 200, 150, 0.5) 30%,
            transparent 70%
          );
          filter: blur(20px);
          animation: prism-top-glow 3s ease-in-out infinite;
        }
        
        .prism-dispersion-left {
          position: absolute;
          bottom: 0;
          left: -80px;
          width: 200px;
          height: 150px;
          background: linear-gradient(
            135deg,
            rgba(255, 100, 100, 0.6) 0%,
            rgba(255, 150, 100, 0.4) 30%,
            rgba(255, 200, 100, 0.2) 60%,
            transparent 100%
          );
          filter: blur(30px);
          transform: rotate(-15deg);
          animation: prism-dispersion 4s ease-in-out infinite;
        }
        
        .prism-dispersion-right {
          position: absolute;
          bottom: 0;
          right: -80px;
          width: 200px;
          height: 150px;
          background: linear-gradient(
            -135deg,
            rgba(100, 100, 255, 0.6) 0%,
            rgba(100, 150, 255, 0.4) 30%,
            rgba(150, 200, 255, 0.2) 60%,
            transparent 100%
          );
          filter: blur(30px);
          transform: rotate(15deg);
          animation: prism-dispersion 4s ease-in-out infinite reverse;
        }
        
        .prism-inner-shine {
          position: absolute;
          inset: 20%;
          clip-path: polygon(50% 10%, 15% 90%, 85% 90%);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 220, 180, 0.2) 50%,
            transparent 100%
          );
          animation: prism-inner-pulse 3s ease-in-out infinite;
        }
        
        @keyframes prism-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
        
        @keyframes prism-shimmer {
          0% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes prism-glow-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes prism-top-glow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes prism-dispersion {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
        
        @keyframes prism-inner-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

            <div className="prism-light">
                {/* Outer glow */}
                <div className="prism-glow-outer" />

                {/* Color dispersion effects */}
                <div className="prism-dispersion-left" />
                <div className="prism-dispersion-right" />

                {/* Main prism shape */}
                <div className="prism-shape" />

                {/* Top bright point */}
                <div className="prism-glow-top" />

                {/* Inner shine */}
                <div className="prism-inner-shine" />
            </div>
        </div>
    );
};

export default memo(PrismLight);
