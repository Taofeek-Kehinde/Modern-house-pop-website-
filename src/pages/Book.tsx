import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
//   AlertCircle,
  Loader2,
  ChevronRight,
  Home,
  Tv,
  Lightbulb,
  Grid3x3
} from 'lucide-react';
import './Book.css';

const Book = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Service Selection
    serviceType: searchParams.get('service') || '',
    serviceCategory: searchParams.get('category') || '',
    
    // Step 2: Personal Details
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    
    // Step 3: Appointment Details
    preferredDate: '',
    preferredTime: '',
    urgency: 'normal',
    
    // Step 4: Project Details
    projectType: 'residential',
    area: '',
    budget: '',
    additionalNotes: '',
    
    // Step 5: Communication Preferences
    contactMethod: ['phone'],
    newsletter: true,
    termsAccepted: false
  });

  const serviceTypes = [
    { id: 'pop', name: 'POP Ceiling Installation', icon: <Home size={20} /> },
    { id: 'tv', name: 'TV Unit Design', icon: <Tv size={20} /> },
    { id: 'lighting', name: 'Lighting Installation', icon: <Lightbulb size={20} /> },
    { id: 'wall', name: 'Wall Panels', icon: <Grid3x3 size={20} /> },
    { id: 'decoration', name: 'Interior Decoration', icon: <Home size={20} /> },
    { id: 'maintenance', name: 'Repair & Maintenance', icon: <Home size={20} /> },
    { id: 'consultation', name: 'Design Consultation', icon: <Home size={20} /> },
    { id: 'other', name: 'Other Service', icon: <Home size={20} /> }
  ];

  const projectTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Store' },
    { value: 'hospitality', label: 'Hotel/Restaurant' }
  ];

  const urgencyLevels = [
    { value: 'urgent', label: 'Urgent (Within 1 week)', color: 'var(--error-color)' },
    { value: 'normal', label: 'Normal (2-4 weeks)', color: 'var(--gold)' },
    { value: 'flexible', label: 'Flexible (1-2 months)', color: 'var(--success-color)' }
  ];

  const contactMethods = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' }
  ];

  const steps = [
    { number: 1, title: 'Service Selection ', icon: <Home size={18} /> },
    { number: 2, title: 'Personal Details', icon: <User size={18} /> },
    { number: 3, title: 'Appointment', icon: <Calendar size={18} /> },
    { number: 4, title: 'Project Details', icon: <MapPin size={18} /> },
    { number: 5, title: 'Confirmation', icon: <CheckCircle size={18} /> }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactMethodToggle = (method: string) => {
    setFormData(prev => {
      const methods = [...prev.contactMethod];
      if (methods.includes(method)) {
        return { ...prev, contactMethod: methods.filter(m => m !== method) };
      } else {
        return { ...prev, contactMethod: [...methods, method] };
      }
    });
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSuccess(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      setFormData({
        serviceType: '',
        serviceCategory: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        preferredDate: '',
        preferredTime: '',
        urgency: 'normal',
        projectType: 'residential',
        area: '',
        budget: '',
        additionalNotes: '',
        contactMethod: ['phone'],
        newsletter: true,
        termsAccepted: false
      });
    }, 5000);
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Skip Sundays
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates.slice(0, 5);
  };

  const availableDates = getNextAvailableDates();
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="book-appointment">
      {/* Hero Section */}
      <section className="book-hero">
        <div className="container">
          <motion.div
            className="book-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="book-title">Book an Appointment</h1>
            <p className="book-subtitle">
              Schedule a free consultation with our design experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="progress-section">
        <div className="container">
          <div className="progress-steps">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="step-item">
                <div className={`step-circle ${step >= stepItem.number ? 'active' : ''}`}>
                  {step > stepItem.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    <>
                      {stepItem.icon}
                      <span className="step-number">{stepItem.number}</span>
                    </>
                  )}
                </div>
                <span className="step-title">{stepItem.title}</span>
                {index < steps.length - 1 && (
                  <div className={`step-line ${step > stepItem.number ? 'active' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form-section">
        <div className="container">
          <motion.div
            className="booking-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="success-icon">
                    <CheckCircle size={48} />
                  </div>
                  <h2>Appointment Booked Successfully!</h2>
                  <p>
                    Thank you for booking with POP House Installations. 
                    Our team will contact you within 24 hours to confirm your appointment.
                  </p>
                  <div className="appointment-details">
                    <div className="detail-item">
                      <Calendar size={18} />
                      <span>Date: {formData.preferredDate}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={18} />
                      <span>Time: {formData.preferredTime}</span>
                    </div>
                    <div className="detail-item">
                      <User size={18} />
                      <span>Service: {formData.serviceType}</span>
                    </div>
                  </div>
                  <p className="confirmation-note">
                    A confirmation email has been sent to {formData.email}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="booking-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Step 1: Service Selection */}
                  {step === 1 && (
                    <motion.div
                      className="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="step-title">Select Service</h2>
                      <p className="step-description">
                        Choose the service you're interested in
                      </p>
                      
                      <div className="service-selection">
                        {serviceTypes.map((service) => (
                          <div
                            key={service.id}
                            className={`service-option ${formData.serviceType === service.name ? 'selected' : ''}`}
                            onClick={() => handleInputChange('serviceType', service.name)}
                          >
                            <div className="service-icon">{service.icon}</div>
                            <div className="service-name">{service.name}</div>
                            <div className="service-check">
                              <CheckCircle size={20} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {formData.serviceType && (
                        <motion.div
                          className="selected-service-preview"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <div className="preview-content">
                            <h3>Selected Service</h3>
                            <p>{formData.serviceType}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Personal Details */}
                  {step === 2 && (
                    <motion.div
                      className="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="step-title">Personal Details</h2>
                      <p className="step-description">
                        Please provide your contact information
                      </p>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label>
                            <User size={18} />
                            <span>Full Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>
                            <Phone size={18} />
                            <span>Phone Number *</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>
                            <Mail size={18} />
                            <span>Email Address *</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>
                            <MapPin size={18} />
                            <span>Address *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Enter your address"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>City *</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Enter your city"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Pincode *</label>
                          <input
                            type="text"
                            required
                            value={formData.pincode}
                            onChange={(e) => handleInputChange('pincode', e.target.value)}
                            placeholder="Enter pincode"
                            maxLength={6}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Appointment Details */}
                  {step === 3 && (
                    <motion.div
                      className="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="step-title">Schedule Appointment</h2>
                      <p className="step-description">
                        Choose your preferred date and time
                      </p>
                      
                      <div className="appointment-selection">
                        {/* Date Selection */}
                        <div className="date-selection">
                          <h3>Select Date</h3>
                          <div className="date-options">
                            {availableDates.map((date) => (
                              <button
                                key={date}
                                type="button"
                                className={`date-option ${formData.preferredDate === date ? 'selected' : ''}`}
                                onClick={() => handleInputChange('preferredDate', date)}
                              >
                                <div className="date-day">
                                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div className="date-number">
                                  {new Date(date).getDate()}
                                </div>
                                <div className="date-month">
                                  {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Time Selection */}
                        <div className="time-selection">
                          <h3>Select Time</h3>
                          <div className="time-options">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                className={`time-option ${formData.preferredTime === time ? 'selected' : ''}`}
                                onClick={() => handleInputChange('preferredTime', time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Urgency Selection */}
                        <div className="urgency-selection">
                          <h3>Project Urgency</h3>
                          <div className="urgency-options">
                            {urgencyLevels.map((level) => (
                              <label
                                key={level.value}
                                className={`urgency-option ${formData.urgency === level.value ? 'selected' : ''}`}
                                style={{ borderColor: level.color }}
                              >
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={level.value}
                                  checked={formData.urgency === level.value}
                                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                                />
                                <span>{level.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Project Details */}
                  {step === 4 && (
                    <motion.div
                      className="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="step-title">Project Details</h2>
                      <p className="step-description">
                        Tell us more about your project
                      </p>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Project Type</label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => handleInputChange('projectType', e.target.value)}
                          >
                            {projectTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label>Area (sq.ft)</label>
                          <input
                            type="number"
                            value={formData.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            placeholder="Enter area in square feet"
                            min="50"
                            max="10000"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Estimated Budget (₹)</label>
                          <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            placeholder="Enter your budget"
                            min="5000"
                            step="1000"
                          />
                        </div>
                        
                        <div className="form-group full-width">
                          <label>Additional Notes</label>
                          <textarea
                            value={formData.additionalNotes}
                            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                            placeholder="Any specific requirements or preferences..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Confirmation */}
                  {step === 5 && (
                    <motion.div
                      className="form-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="step-title">Confirmation</h2>
                      <p className="step-description">
                        Review your appointment details
                      </p>
                      
                      <div className="confirmation-summary">
                        <div className="summary-section">
                          <h3>Service Details</h3>
                          <div className="summary-item">
                            <span className="label">Service Type:</span>
                            <span className="value">{formData.serviceType}</span>
                          </div>
                        </div>
                        
                        <div className="summary-section">
                          <h3>Personal Information</h3>
                          <div className="summary-item">
                            <span className="label">Name:</span>
                            <span className="value">{formData.fullName}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Phone:</span>
                            <span className="value">{formData.phone}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Email:</span>
                            <span className="value">{formData.email}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Address:</span>
                            <span className="value">{formData.address}, {formData.city} - {formData.pincode}</span>
                          </div>
                        </div>
                        
                        <div className="summary-section">
                          <h3>Appointment Details</h3>
                          <div className="summary-item">
                            <span className="label">Date:</span>
                            <span className="value">{formData.preferredDate}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Time:</span>
                            <span className="value">{formData.preferredTime}</span>
                          </div>
                          <div className="summary-item">
                            <span className="label">Urgency:</span>
                            <span className="value">
                              {urgencyLevels.find(l => l.value === formData.urgency)?.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="summary-section">
                          <h3>Project Details</h3>
                          <div className="summary-item">
                            <span className="label">Project Type:</span>
                            <span className="value">
                              {projectTypes.find(t => t.value === formData.projectType)?.label}
                            </span>
                          </div>
                          {formData.area && (
                            <div className="summary-item">
                              <span className="label">Area:</span>
                              <span className="value">{formData.area} sq.ft</span>
                            </div>
                          )}
                          {formData.budget && (
                            <div className="summary-item">
                              <span className="label">Budget:</span>
                              <span className="value">₹{formData.budget}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Terms & Conditions */}
                        <div className="terms-section">
                          <label className="terms-checkbox">
                            <input
                              type="checkbox"
                              checked={formData.termsAccepted}
                              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                              required
                            />
                            <span>
                              I agree to the Terms of Service and Privacy Policy. I understand that 
                              this appointment is subject to confirmation by POP House Installations.
                            </span>
                          </label>
                          
                          <label className="newsletter-checkbox">
                            <input
                              type="checkbox"
                              checked={formData.newsletter}
                              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                            />
                            <span>Subscribe to our newsletter for updates and offers</span>
                          </label>
                        </div>
                        
                        {/* Contact Preferences */}
                        <div className="contact-preferences">
                          <h3>Contact Preferences</h3>
                          <div className="preference-options">
                            {contactMethods.map((method) => (
                              <label
                                key={method.value}
                                className="preference-option"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.contactMethod.includes(method.value)}
                                  onChange={() => handleContactMethodToggle(method.value)}
                                />
                                <span>{method.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="form-navigation">
                    {step > 1 && (
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handlePrev}
                        disabled={loading}
                      >
                        Back
                      </button>
                    )}
                    
                    {step < 5 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={
                          (step === 1 && !formData.serviceType) ||
                          (step === 2 && (!formData.fullName || !formData.email || !formData.phone)) ||
                          (step === 3 && (!formData.preferredDate || !formData.preferredTime)) ||
                          loading
                        }
                      >
                        Continue
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!formData.termsAccepted || loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="spinner" />
                            Booking...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Need Help?</h3>
            <p>Our team is here to assist you</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={20} />
                <div>
                  <span className="label">Call Us</span>
                  <a href="tel:+2348119825334">+2348119825334</a>
                </div>
              </div>
              
              <div className="contact-item">
                <Mail size={20} />
                <div>
                  <span className="label">Email Us</span>
                  <a href="mailto:Ktaofeek015@gmail.com">Ktaofeek015@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-item">
                <Clock size={20} />
                <div>
                  <span className="label">Business Hours</span>
                  <span>Mon-Sat: 9AM-7PM</span>
                </div>
              </div>
            </div>
            
            <div className="booking-benefits">
              <h4>Why Book With Us?</h4>
              <ul>
                <li>
                  <CheckCircle size={16} />
                  <span>Free Consultation</span>
                </li>
                <li>
                  <CheckCircle size={16} />
                  <span>No Hidden Charges</span>
                </li>
                <li>
                  <CheckCircle size={16} />
                  <span>Flexible Scheduling</span>
                </li>
                <li>
                  <CheckCircle size={16} />
                  <span>24/7 Support</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Book;