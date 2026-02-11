import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {  Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setShowPopup(true);
      setEmail('');
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-logo">POP House Installations</h3>
            <p className="footer-description">
              Transforming spaces with premium POP ceiling designs, TV units, and lighting solutions 
              since 2012. Your trusted partner in interior excellence.
            </p>
            {/* <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+234 81198-25334</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>Ktaofeek015@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Mokola Adamasingba Ibadan.</span>
              </div>
            </div> */}
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/pop">POP Ceilings</Link></li>
              <li><Link to="/services/tv-console">TV Units</Link></li>
              <li><Link to="/services/lighting">Lighting</Link></li>
              <li><Link to="/services/wall-panels">Wall Panels</Link></li>
              <li><Link to="/services/decoration">Interior Decor</Link></li>
              <li><Link to="/services/maintenance">Maintenance</Link></li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/2348119825334" className="social-link whatsapp" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
            <div className="newsletter">
              <h5>Subscribe to Newsletter</h5>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} POP House Installations. All rights reserved.</p>
          <div className="footer-policies">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Newsletter Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="newsletter-popup"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            Subscribed Successfully
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/2348119825334"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} />
      </motion.a>
    </footer>
  );
};

export default Footer;