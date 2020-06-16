import React from "react"
import Particles from "react-particles-js"

const Wallpaper = () => {
  return (
    <Particles
      style={{
        position: "absolute",
        color: "blue",
        left: 0,
        width: "100%",
        height: "100%"
      }}
      params={{
        particles: {
          shape: { type: ["circle", "square", "edge", "polygon"] },
          links: {
            distance: 100,
            color: { value: ["#ff9c6e", "#ff4d4f"] },
            enable: true,
            width: 1
          },
          move: { speed: 0.4 },
          color: { value: ["#ff9c6e", "#ff4d4f"] },
          number: {
            value: 20,
            density: { enable: true, value_area: 200 }
          },
          size: {
            value: 8,
            random: true,
            anim: { speed: 1 }
          }
        },

        interactivity: {
          modes: { repulse: { speed: 0.4 } },
          events: {
            onhover: {
              enable: true,
              mode: "push"
            },
            resize: true
          }
        },
        retina_detect: true
      }}
    />
  )
}

export default Wallpaper
