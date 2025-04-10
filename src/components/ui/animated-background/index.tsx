import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";

import { loadSlim } from "@tsparticles/slim";

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={{
          style: {
            width: "100%",
            height: "100%",
            position: "absolute"
          },
          background: {
            color: {
              value: "transparent"
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push"
              },
              onHover: {
                enable: false,
                mode: "repulse"
              }
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 100,
                duration: 1
              }
            }
          },
          particles: {
            color: {
              value: "#ffffff"
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce"
              },
              random: false,
              speed: 2,
              straight: false
            },
            number: {
              density: {
                enable: true
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 3, max: 3 }
            }
          },
          detectRetina: true
        }}
      />
    );
  }

  return <></>;
};

export default AnimatedBackground;
