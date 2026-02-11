import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';
import homeVideo from '../assets/Home.mp4';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div className="hero-badge" variants={textVariants}>
              <Sparkles size={16} />
              <span>Premium POP Installation Services</span>
            </motion.div>
            
            <motion.h1 className="hero-title" variants={textVariants}>
              Transform Your Space With
              <span className="highlight"> Elegant POP Designs</span>
            </motion.h1>
            
            <motion.p className="hero-description" variants={textVariants}>
              Professional installation of modern POP ceilings, TV units, and lighting solutions 
              that blend aesthetics with functionality for your dream space.
            </motion.p>
            
            <motion.div className="hero-buttons" variants={textVariants}>
              <Link to="/book" className="btn btn-primary">
                Get Free Quote
                <ArrowRight size={20} />
              </Link>
              <Link to="/gallery" className="btn btn-secondary">
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <video
            className="hero-video"
            src={homeVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;