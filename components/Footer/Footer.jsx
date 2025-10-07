import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube,
  ArrowRight,
  Heart
} from 'lucide-react';
import './Footer.css';
import { assets } from '../../src/assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '#app' },
    { name: 'Jobs', path: '#job' },
    { name: 'Profile', path: '/profile' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help Center', path: '/help' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'FAQ', path: '/faq' }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#' },
    { icon: Twitter, name: 'Twitter', url: '#' },
    { icon: Linkedin, name: 'LinkedIn', url: '#' },
    { icon: Instagram, name: 'Instagram', url: '#' },
    { icon: Youtube, name: 'YouTube', url: '#' }
  ];

  return (
    <footer className="footer-container">
      {/* Main Footer Content */}
      <div className="footer-content">
        
        {/* Left Section - Logo & Slogan */}
        <div className="footer-section footer-left">
          <div className="footer-logo">
            <div className="logo-icon">
            <img src={assets.logoimage}   alt="universit-logo" />
            </div>
            {/* <div className="logo-text">
              <h3 className="logo-title">KSU Job Board</h3>
              <p className="logo-tagline">Your Career, Our Priority</p>
            </div> */}
          </div>
          <p className="footer-description">
            Connecting talented students with premier employers. 
            Building careers, creating opportunities, and shaping futures together.
          </p>
          
          {/* Social Media Links */}
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="social-link"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section footer-middle">
          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <ArrowRight size={16} className="link-arrow" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <ArrowRight size={16} className="link-arrow" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section - Login/Register & Contact */}
        <div className="footer-section footer-right">
          <h4 className="footer-heading">Get Started</h4>
          
          <div className="auth-buttons">
            <a href="/login" className="auth-button login-button">
              Login
            </a>
            <a href="/register" className="auth-button register-button">
              Register
            </a>
          </div>

          <div className="contact-info">
            <h4 className="footer-heading contact-heading">Contact Us</h4>
            
            <a href="mailto:careers@ksu.ac.kr" className="contact-item">
              <Mail size={18} className="contact-icon" />
              <span>careers@ksu.ac.kr</span>
            </a>
            
            <a href="tel:+82512345678" className="contact-item">
              <Phone size={18} className="contact-icon" />
              <span>+82 51-234-5678</span>
            </a>
            
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>Busan, South Korea</span>
            </div>
          </div>

        
        </div>

      </div>

      {/* Decorative Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(43, 108, 176, 0.1)" />
        </svg>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} KSU Job Board. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> for Students
          </p>
          <p className="university-link">
            <a href="https://www.ksu.ac.kr" target="_blank" rel="noopener noreferrer">
              Kyungsung University
            </a>
          </p>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="floating-circle circle-1"></div>
      <div className="floating-circle circle-2"></div>
      <div className="floating-circle circle-3"></div>
    </footer>
  );
};

export default Footer;