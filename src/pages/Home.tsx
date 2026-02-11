import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Clock, Award } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 100, delay: number = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, start deleting after delay
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, start typing again
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, text, speed, delay]);

  return displayText;
};

const AnimatedStatItem = ({ target, suffix, label, icon, isInView }: { target: number; suffix: string; label: string; icon: React.ReactNode; isInView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-number">{displayValue}{suffix}</h3>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
};

const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  
  const typedText = useTypingEffect("Ready to Transform Your Space?", 150, 2000);

  const services = [
    {
      id: 1,
      title: 'POP Ceiling Installation',
      description: 'Professional installation of Plaster of Paris ceilings with modern designs',
      image: './src/assets/one.jpg',
      features: ['Custom Designs', 'Moisture Resistant', 'LED Integration'],
      link: '/services/pop'
    },
    {
      id: 2,
      title: 'Wall TV Console Design',
      description: 'Custom TV wall units with ambient lighting and storage',
      image: './src/assets/two.png',
      features: ['Built-in Lighting', 'Storage Solutions', 'Wire Management'],
      link: '/services/tv-console'
    },
    {
      id: 3,
      title: ' 3D Lighting Installation',
      description: 'Ambient and accent lighting solutions for your space',
      image: './src/assets/three.jpg',
      features: ['LED Strips', 'Smart Lighting', 'Mood Lighting'],
      link: '/services/lighting'
    },
    {
      id: 4,
      title: 'Wall Panels',
      description: '3D wall panels and decorative wall treatments',
      image: './src/assets/four.webp',
      features: ['3D Effects', 'Sound Absorption', 'Easy Maintenance'],
      link: '/services/wall-panels'
    },
    {
      id: 5,
      title: '2D Design Consultation',
      description: 'Expert consultation for complete interior design solutions',
      image: './src/assets/five.webp',
      features: ['Space Planning', 'Color Schemes', 'Material Selection'],
      link: '/services/consultation'
    },
    {
      id: 6,
      title: 'Custom Furniture',
      description: 'Bespoke furniture design and manufacturing services',
      image: './src/assets/six.jpg',
      features: ['Custom Design', 'Premium Materials', 'Artisan Craftsmanship'],
      link: '/services/furniture'
    },
  ];

  const stats = [
    { target: 500, suffix: '+', label: 'Projects Completed', icon: <Check /> },
    { target: 10, suffix: '+', label: 'Years Experience', icon: <Clock /> },
    { target: 98, suffix: '%', label: 'Client Satisfaction', icon: <Star /> },
    { target: 50, suffix: '+', label: 'Awards Won', icon: <Award /> },
  ];

  return (
    <div className="home">
      <Hero />
      
      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Premium Services
          </motion.h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <AnimatedStatItem
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                isInView={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{typedText}<span className="cursor">|</span></h2>
            <p>Book a free consultation with our experts today</p>
            <div className="cta-buttons">
              <Link to="/book" className="btn">Book Appointment</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;