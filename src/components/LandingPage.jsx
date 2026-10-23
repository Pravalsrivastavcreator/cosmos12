import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeScene from './ThreeScene';
import { NexusParticles } from './ThreeModels';
import nexusLogo from '../assets/nexus-logo.svg';

const LandingPage = ({ onNavigate }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { threshold: [0.1, 0.3] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const navItems = [['events', 'Events'], ['hackathons', 'Hackathons'], ['puzzles', 'Puzzles'], ['bugarena', 'Bug Arena'], ['learning', 'Learning']];

  return <>
    <ThreeScene />
    <nav className="navbar">
      <a href="#home" className="nav-logo" onClick={(event) => { event.preventDefault(); scrollToSection('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <img src={nexusLogo} alt="Nexus Logo" style={{ width: '28px', height: '28px' }} /><span>NEXUS</span>
      </a>
      <ul className="nav-links">
        <li><a href="#home" className="active" onClick={(event) => { event.preventDefault(); scrollToSection('home'); }}>Home</a></li>
        {navItems.map(([target, label]) => <li key={target}><a href={`#${target}`} onClick={(event) => { event.preventDefault(); onNavigate(target); }}>{label}</a></li>)}
      </ul>
      <button className="nav-family-btn" onClick={() => onNavigate('family')}><img src={nexusLogo} alt="Nexus Logo" /><span>Meet the Nexus Family</span></button>
    </nav>
    <div className="scroll-container" ref={scrollContainerRef}>
      <section id="home" className="fade-section visible" style={{ height: '100vh', width: '100vw', maxWidth: '100vw', padding: 0, margin: 0, position: 'relative', display: 'block', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent', width: '100%', height: '100%' }}>
          <ambientLight intensity={0.4} /><pointLight position={[10, 10, 10]} intensity={2.5} color="#00ffff" /><pointLight position={[-10, -10, -10]} intensity={2} color="#9d4edd" /><pointLight position={[0, 0, 10]} intensity={1.5} color="#2196f3" /><directionalLight position={[0, 5, 5]} intensity={1} /><NexusParticles />
        </Canvas>
      </section>
    </div>
  </>;
};

export default LandingPage;
