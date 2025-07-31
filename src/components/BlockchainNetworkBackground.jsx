import React, { memo } from "react";


const waveAnimation = `
@keyframes waveMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`;

const BlockchainNetworkBackground = () => {
  return (
    <>
      <style>{waveAnimation}</style>
      <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', height: '40vh', zIndex: -1, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 320" width="100vw" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#30d3a2" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
            <linearGradient id="subwave-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#30d3a2" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Onda principal */}
          <path fill="url(#wave-gradient)" fillOpacity="1">
            <animate 
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,264L60,242.7C120,221,240,179,360,173.3C480,168,600,200,720,226.7C840,253,960,275,1080,258.7C1200,243,1320,189,1380,162.7L1440,136L1440,320L0,320Z;
                M0,232L60,226.7C120,221,240,211,360,216C480,221,600,243,720,248C840,253,960,243,1080,226.7C1200,211,1320,189,1380,178.7L1440,168L1440,320L0,320Z;
                M0,200L60,194.7C120,189,240,179,360,189.3C480,200,600,232,720,242.7C840,253,960,243,1080,216C1200,189,1320,147,1380,125.3L1440,104L1440,320L0,320Z;
                M0,264L60,242.7C120,221,240,179,360,173.3C480,168,600,200,720,226.7C840,253,960,275,1080,258.7C1200,243,1320,189,1380,162.7L1440,136L1440,320L0,320Z
              "
            />
          </path>
          {/* Sub-onda 1 */}
          <path fill="url(#subwave-gradient)" fillOpacity="0.7">
            <animate 
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,260L80,240C160,220,320,180,480,200C640,220,800,300,960,280C1120,260,1280,180,1360,140L1440,100L1440,320L0,320Z;
                M0,240L80,220C160,200,320,160,480,180C640,200,800,280,960,260C1120,240,1280,160,1360,120L1440,80L1440,320L0,320Z;
                M0,220L80,200C160,180,320,140,480,160C640,180,800,260,960,240C1120,220,1280,140,1360,100L1440,60L1440,320L0,320Z;
                M0,260L80,240C160,220,320,180,480,200C640,220,800,300,960,280C1120,260,1280,180,1360,140L1440,100L1440,320L0,320Z
              "
            />
          </path>
          {/* Sub-onda 2 */}
          <path fill="url(#subwave-gradient)" fillOpacity="0.4">
            <animate 
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,300L100,290C200,280,400,260,600,270C800,280,1000,310,1200,300C1300,295,1400,280,1440,270L1440,320L0,320Z;
                M0,290L100,280C200,270,400,250,600,260C800,270,1000,300,1200,290C1300,285,1400,270,1440,260L1440,320L0,320Z;
                M0,280L100,270C200,260,400,240,600,250C800,260,1000,290,1200,280C1300,275,1400,260,1440,250L1440,320L0,320Z;
                M0,300L100,290C200,280,400,260,600,270C800,280,1000,310,1200,300C1300,295,1400,280,1440,270L1440,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>
    </>
  );
};

export default memo(BlockchainNetworkBackground);