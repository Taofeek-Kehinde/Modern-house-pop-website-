import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    subscribe: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: ['Mokola Street, Ibadan', 'Oyo State ', 'Nigeria'],
      color: '#4CAF50'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: ['+2348119825334', '+2348119825334'],
      color: '#2196F3'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: ['Ktaofeek015@gmail.com', 'Ktaofeek015@gmail.com'],
      color: '#FF9800'
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9AM - 7PM', 'Sat: 10AM - 5PM', 'Sun: Closed'],
      color: '#9C27B0'
    }
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: <Facebook size={20} />, color: '#1877F2', url: '#' },
    { platform: 'Instagram', icon: <Instagram size={20} />, color: '#E4405F', url: '#' },
    { platform: 'Twitter', icon: <Twitter size={20} />, color: '#1DA1F2', url: '#' },
    { platform: 'LinkedIn', icon: <Linkedin size={20} />, color: '#0A66C2', url: '#' },
    { platform: 'YouTube', icon: <Youtube size={20} />, color: '#FF0000', url: '#' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        subscribe: true
      });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column - Contact Info */}
            <motion.div
              className="contact-info-section"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Contact Information</h2>
              <p className="contact-description">
                Reach out to us through any of these channels. We're here to help!
              </p>
              
              <div className="contact-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="contact-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="contact-icon-wrapper"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.icon}
                    </div>
                    <h3>{info.title}</h3>
                    <div className="contact-details">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      className="social-link"
                      style={{ backgroundColor: social.color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.platform}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="map-placeholder">
                <div className="map-overlay">
                  <h3>Find Us on Google Maps</h3>
                  <p>Click to open in Google Maps</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="contact-form-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <MessageSquare size={32} />
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you shortly</p>
              </div>
              
              <AnimatePresence>
                {isSuccess ? (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="success-icon">
                      <CheckCircle size={48} />
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>
                      Thank you for contacting us. We have received your message 
                      and will respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.submit && (
                      <motion.div
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle size={18} />
                        <span>{errors.submit}</span>
                      </motion.div>
                    )}
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && (
                          <motion.span 
                            className="field-error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.name}
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                          <motion.span 
                            className="field-error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.email}
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={errors.subject ? 'error' : ''}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="quote">Request a Quote</option>
                          <option value="service">Service Information</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="career">Career Opportunity</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && (
                          <motion.span 
                            className="field-error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.subject}
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="form-group full-width">
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your inquiry in detail..."
                          rows={6}
                          className={errors.message ? 'error' : ''}
                        />
                        {errors.message && (
                          <motion.span 
                            className="field-error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.message}
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="form-group full-width">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="subscribe"
                            checked={formData.subscribe}
                            onChange={handleChange}
                          />
                          <span>Subscribe to our newsletter for updates and offers</span>
                        </label>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                    
                    <p className="form-note">
                      * Required fields. We respect your privacy and will never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="faq-grid">
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3>How quickly do you respond to inquiries?</h3>
              <p>
                We typically respond within 1-2 business hours during working days. 
                For urgent matters, you can call us directly.
              </p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3>Do you offer free consultations?</h3>
              <p>
                Yes! We offer free consultations for all new projects. 
                Contact us to schedule a meeting at your convenience.
              </p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3>What areas do you serve?</h3>
              <p>
                We serve the entire metropolitan area and surrounding regions. 
                Contact us to check if we service your specific location.
              </p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3>Can I visit your office?</h3>
              <p>
                Absolutely! We welcome visitors by appointment. 
                Please contact us to schedule your visit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Still Have Questions?</h2>
            <p>We're here to help you with all your POP installation needs</p>
            <div className="cta-buttons">
              <a href="tel:+1234567890" className="btn btn-primary">
                <Phone size={18} />
                <span>Call Now</span>
              </a>
              <a href="mailto:info@pophouse.com" className="btn btn-outline">
                <Mail size={18} />
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;