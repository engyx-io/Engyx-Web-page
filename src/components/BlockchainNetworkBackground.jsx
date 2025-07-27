import React, { useCallback, memo } from "react";
    import { Particles } from "@tsparticles/react";
    import { loadSlim } from "tsparticles-slim";

    const particlesOptions = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 1,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#32d3a2",
        },
        links: {
          color: "#32d3a2",
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 80,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    };

    const BlockchainNetworkBackground = () => {
      const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
      }, []);

      return (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
      );
    };

    export default memo(BlockchainNetworkBackground);