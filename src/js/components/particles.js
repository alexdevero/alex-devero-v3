// Particles component

const particles = () => {
  console.log('Particles initiated');

  // Docs:https://github.com/marcbruederlin/particles.js

  Particles.init({
    color: '#212121',
    connectParticles: true,
    maxParticles: 72,
    minDistance: 120,
    opacity: .5,
    responsive: [
      {
        breakpoint: 992,
        options: {
          maxParticles: 72,
          minDistance: 100
        }
      },
      {
        breakpoint: 768,
        options: {
          maxParticles: 52,
          minDistance: 90
        }
      },
      {
        breakpoint: 480,
        options: {
          maxParticles: 32,
          minDistance: 80
        }
      }
    ],
    selector: '.js-particles',
    sizeVariations: 4,
    speed: 0.85
  });
},

export { particles };