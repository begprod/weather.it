export function generateParticles(): Array<JSX.Element> {
  const particlesNumber: number = 10;
  let particles: Array<JSX.Element> = [];

  for (let i = 0; i < particlesNumber; i++) {
    particles.push(<div key={i}></div>);
  }

  return particles;
}
