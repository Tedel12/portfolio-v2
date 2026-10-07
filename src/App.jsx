import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './context/useTheme'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import SkillsSection from './components/SkillsSection'
import ProcessSection from './components/ProcessSection'
import ProjectsSection from './components/ProjectsSection'
import GitHubSection from './components/GitHubSection'
import AboutSection from './components/AboutSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ServiceDetailModal from './components/ServiceDetailModal'
import CvViewerModal from './components/CvViewerModal'
import RosSimulatorModal from './components/RosSimulatorModal'
import TinyMlPlaygroundModal from './components/TinyMlPlaygroundModal'
import TerminalModal from './components/TerminalModal'
import MascotGuide from './components/MascotGuide'

const MainContent = () => {
  const { isDarkMode } = useTheme();
  const [selectedService, setSelectedService] = useState(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isRosOpen, setIsRosOpen] = useState(false);
  const [isTinyMlOpen, setIsTinyMlOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [pitchTrigger, setPitchTrigger] = useState(0);

  const handleContactForService = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartPitch = () => {
    setPitchTrigger(prev => prev + 1);
  };

  return (
    <div className={`w-full max-w-full overflow-x-hidden min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#03110a] text-slate-100" 
        : "bg-[#f8faf9] text-slate-900"
    } selection:bg-emerald-500/30 selection:text-emerald-300`}>
      <Navbar 
        onOpenCv={() => setIsCvOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onStartPitch={handleStartPitch}
      />
      <HeroSection />
      <ServicesSection 
        onSelectService={(s) => setSelectedService(s)}
        onContactClick={handleContactForService}
      />
      <SkillsSection 
        onOpenRos={() => setIsRosOpen(true)}
        onOpenTinyMl={() => setIsTinyMlOpen(true)}
      />
      <ProcessSection 
        onStartProjectClick={() => handleContactForService()}
      />
      <ProjectsSection />
      <GitHubSection />
      <AboutSection onOpenCv={() => setIsCvOpen(true)} />
      <CertificatesSection />
      <ContactSection />
      <Footer />

      {/* Modal for Service Details */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onContactClick={handleContactForService}
      />

      {/* Direct Interactive CV Reader Modal */}
      <CvViewerModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* ROS2 Physical AI 2D Simulation Sandbox */}
      <RosSimulatorModal
        isOpen={isRosOpen}
        onClose={() => setIsRosOpen(false)}
      />

      {/* TinyML Edge Inference Playground */}
      <TinyMlPlaygroundModal
        isOpen={isTinyMlOpen}
        onClose={() => setIsTinyMlOpen(false)}
      />

      {/* Interactive Terminal CLI Modal (Ctrl+K) */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenCv={() => setIsCvOpen(true)}
        onOpenRos={() => setIsRosOpen(true)}
        onOpenTinyMl={() => setIsTinyMlOpen(true)}
        onStartPitch={handleStartPitch}
        onOpenContact={handleContactForService}
      />

      {/* Interactive Mascot Guide (Tour, Female Voice & Spotlight) */}
      <MascotGuide
        onOpenCv={() => setIsCvOpen(true)}
        onOpenContact={handleContactForService}
        onOpenRos={() => setIsRosOpen(true)}
        onOpenTinyMl={() => setIsTinyMlOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        pitchTrigger={pitchTrigger}
      />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
