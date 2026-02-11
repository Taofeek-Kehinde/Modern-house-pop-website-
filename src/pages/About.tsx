import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Users, Target, Eye,  Clock, Shield } from 'lucide-react';
import './About.css';

interface AnimatedStatItemProps {
  target: number;
  suffix: string;
  label: string;
  isInView: boolean;
}

const AnimatedStatItem: React.FC<AnimatedStatItemProps> = ({ target, suffix, label, isInView }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 6000 });

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
    <div className="stat-item">
      <div className="stat-number">{displayValue}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  const teamMembers = [
    {
      id: 1,
      name: 'Hammed Olalekan',
      role: 'Manager Director',
      experience: '15+ years',
      image: '👨‍🎨',
      bio: 'Specialized in modern POP ceiling designs'
    },
    {
      id: 2,
      name: 'Taofeek Kehinde',
      role: 'Software Engineer',
      experience: '5+ years',
      image: '👩‍💼',
      bio: 'Ensures seamless project execution'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Lighting Expert',
      experience: '10+ years',
      image: '👨‍🔧',
      bio: 'Ambient lighting specialist'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Client Relations',
      experience: '8+ years',
      image: '👩‍💼',
      bio: 'Your dedicated point of contact'
    },
  ];

  const milestones = [
    { year: '2012', event: 'Company Founded', description: 'Started as a small POP installation service' },
    { year: '2015', event: 'First Major Project', description: 'Completed 100+ residential projects' },
    { year: '2018', event: 'Expansion', description: 'Added TV units and lighting divisions' },
    { year: '2020', event: 'Award Winning', description: 'Received Best Interior Design Award' },
    { year: '2023', event: '500+ Projects', description: 'Successfully completed 500+ projects' },
  ];

  const values = [
    {
      icon: <Target />,
      title: 'Excellence',
      description: 'Commitment to superior quality in every project'
    },
    {
      icon: <Shield />,
      title: 'Integrity',
      description: 'Honest and transparent business practices'
    },
    {
      icon: <Users />,
      title: 'Collaboration',
      description: 'Working closely with clients to realize visions'
    },
    {
      icon: <Clock />,
      title: 'Timeliness',
      description: 'Respecting deadlines and commitments'
    },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <video
          className="about-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="../src/assets/about.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="about-hero-overlay"></div>
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-title"> POP Home And Office Installation</h1>
            <p className="about-subtitle">
              Transforming spaces with innovative designs and exceptional craftsmanship since 2012.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="story-grid">
            <motion.div
              className="story-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                Founded in 2012, POP House Installations began with a simple vision: to bring 
                elegance and sophistication to interior spaces through expertly crafted POP designs.
              </p>
              <p className="story-text">
                What started as a small team of passionate designers has grown into a trusted 
                name in interior solutions, serving hundreds of satisfied clients across the region.
              </p>
              <p className="story-text">
                Today, we combine traditional craftsmanship with modern technology to deliver 
                stunning results that exceed expectations.
              </p>
            </motion.div>
            <motion.div
              className="story-stats"
              ref={statsRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AnimatedStatItem target={500} suffix="+" label="Projects Completed" isInView={statsInView} />
              <AnimatedStatItem target={98} suffix="%" label="Client Satisfaction" isInView={statsInView} />
              <AnimatedStatItem target={50} suffix="+" label="Awards Won" isInView={statsInView} />
              <AnimatedStatItem target={10} suffix="+" label="Years Experience" isInView={statsInView} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <motion.div
              className="mission-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mission-icon">
                <Target size={32} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional interior solutions that transform spaces and enrich lives 
                through innovative design, quality craftsmanship, and unparalleled customer service.
              </p>
            </motion.div>
            
            <motion.div
              className="mission-card vision"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mission-icon">
                <Eye size={32} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading choice for premium interior installations, setting industry 
                standards for design excellence and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-event">{milestone.event}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="team-avatar">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-experience">Experience: {member.experience}</p>
                <p className="team-bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;