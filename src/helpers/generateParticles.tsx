export function generateParticles() {
  const particlesNumber = 10;
  let particles = [];

  for (let i = 0; i < particlesNumber; i++) {
    particles.push(<div key={i}></div>);
  }

  return particles;
}
