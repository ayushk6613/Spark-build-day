
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import TabSelector from './components/TabSelector';
import PricingCard from './components/PricingCard';
import ContactSales from './components/ContactSales';
import TryFreeSignup from './components/TryFreeSignup';
import TeamsSignup from './components/TeamsSignup';
import IndividualPayment from './components/IndividualPayment';
import FAQSection from './components/FAQSection';
import SocialProofSection from './components/SocialProofSection';
import AuthModals, { AuthModalType } from './components/AuthModals';
import { TierCategory } from './types';
import { PRICING_DATA, FOOTER_LINKS, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TierCategory>(TierCategory.INDIVIDUAL);
  const [view, setView] = useState<'pricing' | 'contact' | 'signup' | 'teams' | 'individual_payment'>('pricing');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [activeAuthModal, setActiveAuthModal] = useState<AuthModalType>(null);
  
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const activeData = PRICING_DATA.find(d => d.id === activeCategory) || PRICING_DATA[0];

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down more than 300px
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Check if banner was previously closed
    const closed = localStorage.getItem('coursera_promo_closed');
    if (!closed) {
      setIsBannerVisible(true);
    }
    setBannerLoaded(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToPricing = () => {
    console.log('Back to pricing clicked');
    setView('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setView('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBannerVisible(false);
    localStorage.setItem('coursera_promo_closed', 'true');
  };

  const handleBannerClick = () => {
    console.log('Promo banner clicked');
    window.open('https://www.coursera.org/enterprise/resources/ebook/forrester-wave-report', '_blank', 'noopener,noreferrer');
  };

  if (view === 'contact') {
    return <ContactSales onBack={() => setView('pricing')} />;
  }

  if (view === 'signup') {
    return <TryFreeSignup onBack={() => setView('pricing')} />;
  }

  if (view === 'teams') {
    return <TeamsSignup onBack={() => setView('pricing')} />;
  }

  if (view === 'individual_payment') {
    return <IndividualPayment onBack={() => setView('pricing')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col relative">
      <AuthModals 
        activeModal={activeAuthModal} 
        onClose={() => setActiveAuthModal(null)} 
        onSwitch={setActiveAuthModal} 
      />
      <style>{`
        /* Navigation Styling */
        .main-navigation {
          display: flex;
          align-items: center;
        }

        .nav-container {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 500;
          color: #212529;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #0056D3;
          text-decoration: none;
        }

        /* Toggle Bar Styling */
        .pricing-toggle-container {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6px;
          border-radius: 16px;
          display: inline-flex;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
          margin: 20px auto 40px;
          position: relative;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .pricing-toggle {
          position: relative;
          padding: 12px 24px;
          border-radius: 12px;
          background: transparent;
          border: none;
          font-weight: 600;
          font-size: 15px;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          white-space: nowrap;
        }

        .pricing-toggle.active {
          color: #0056D3;
          text-shadow: 0 0 1px rgba(0, 86, 211, 0.1);
        }

        .pricing-toggle:hover:not(.active) {
          color: #495057;
        }

        .toggle-slider {
          position: absolute;
          top: 6px;
          left: 0;
          height: calc(100% - 12px);
          background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 86, 211, 0.15), 0 2px 6px rgba(0, 86, 211, 0.05);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .pricing-toggle-container {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }
          .toggle-slider {
            width: calc(100% - 12px) !important;
            left: 6px !important;
            top: 0;
          }
          .pricing-toggle-container {
              flex-wrap: wrap;
              justify-content: center;
          }
        }

        /* Header Styling */
        .pricing-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #212529 0%, #495057 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .pricing-subtitle {
          font-size: 1.15rem;
          color: #6c757d;
          font-weight: 400;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* Card Animations & Styling */
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pricing-card {
          animation: cardEntrance 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 24px;
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          opacity: 0; 
        }

        .pricing-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #0056D3, #1F8FDB, #00C851);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 32px 64px rgba(0, 86, 211, 0.12), 0 16px 32px rgba(0, 86, 211, 0.08);
          border-color: rgba(0, 86, 211, 0.2);
        }

        .pricing-card:hover::before {
          opacity: 1;
        }

        /* Card Typography */
        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .card-subtitle {
          font-size: 1rem;
          color: #6c757d;
          line-height: 1.5;
        }

        .price-display {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0056D3;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .price-period {
          font-size: 1rem;
          font-weight: 500;
          color: #868e96;
          margin-left: 8px;
        }

        /* Enhanced Buttons */
        .cta-button {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          border: none;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #0056D3 0%, #1F8FDB 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(0, 86, 211, 0.25);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 86, 211, 0.35);
          background: linear-gradient(135deg, #004ebd 0%, #197bc0 100%);
        }

        .cta-button.secondary {
          background: #fff;
          color: #0056D3;
          border: 2px solid #e9ecef;
        }

        .cta-button.secondary:hover {
          border-color: #0056D3;
          background: #f8f9ff;
          color: #004ebd;
          transform: translateY(-2px);
        }

        /* Footer Styling */
        .footer-container {
          background-color: #f8f9fa;
          border-top: 1px solid #e9ecef;
          margin-top: 0px; /* Reduced from 80px as FAQ is above */
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px 40px;
        }

        .footer-columns {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-column-header {
          font-size: 18px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .footer-link {
          display: block;
          font-size: 16px;
          font-weight: 400;
          color: #212529;
          text-decoration: none;
          margin-bottom: 16px;
          line-height: 1.5;
          transition: color 0.2s ease;
          cursor: pointer;
          position: relative;
          width: fit-content;
        }

        .footer-link:hover {
          color: #0056D3;
          text-decoration: none;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #0056D3;
          transition: width 0.2s ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-link:focus {
          outline: 2px solid #0056D3;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .social-media-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid #e9ecef;
          margin-top: 40px;
        }
        
        .footer-bottom-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 40px;
            border-top: 1px solid #e9ecef;
            margin-top: 40px;
            flex-wrap: wrap;
            gap: 24px;
        }
        
        .footer-right-group {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 20px;
        }
        
        .footer-badges-row {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
        }

        .social-icons-container {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background-color: #212529;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: #0056D3;
          transform: translateY(-2px);
        }
        
        /* Text Only Footer Badges */
        .footer-badges {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin: 20px 0;
          padding: 20px;
        }

        .text-badge {
          padding: 8px 16px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 14px;
          color: #212529;
          font-weight: 600;
        }

        .app-links-text {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .text-link {
          color: #0056D3;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .text-link:hover {
          background: #f0f7ff;
          text-decoration: underline;
          color: #004bb8;
        }

        .text-link:visited {
          color: #0056D3;
        }

        @media (max-width: 768px) {
          .footer-columns {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-bottom-section {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
          }
          
          .footer-right-group {
            align-items: center;
          }
          
          .footer-badges-row {
            justify-content: center;
          }
          
          /* Text Badges Responsive */
          .footer-badges {
            padding: 15px;
          }
          
          .app-links-text {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          
          .text-link {
            text-align: center;
            min-width: 180px;
          }
        }

        /* Enhanced FAQ Section Styling */
        .faq-section {
          max-width: 900px;
          margin: 80px auto;
          padding: 0 20px;
        }

        .faq-title {
          font-size: 48px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 60px;
          color: #212529;
          letter-spacing: -0.02em;
        }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
          background: transparent;
          transition: all 0.2s ease;
        }

        .faq-item:first-child {
          border-top: 1px solid #e5e7eb;
        }

        .faq-item:hover {
          background-color: rgba(249, 250, 251, 0.5);
        }

        .faq-question-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-question {
          font-size: 18px;
          font-weight: 500;
          color: #212529;
          margin: 0;
          flex: 1;
          text-align: left;
          line-height: 1.4;
        }

        .faq-toggle-icon {
          font-size: 24px;
          font-weight: 300;
          color: #6b7280;
          margin-left: 16px;
          transition: all 0.3s ease;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-item.active .faq-toggle-icon {
          transform: rotate(45deg);
          color: #212529;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          background: transparent;
          opacity: 0;
        }

        .faq-answer.active {
          max-height: 500px;
          padding: 0 20px 24px 20px;
          opacity: 1;
        }

        .faq-answer-content {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
          padding-top: 8px;
        }

        .faq-item.featured {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 8px;
          background: rgba(249, 250, 251, 0.3);
        }

        .faq-item.featured:hover {
          border-color: #d1d5db;
          background: rgba(249, 250, 251, 0.6);
        }

        @media (max-width: 768px) {
          .faq-title {
            font-size: 36px;
            margin-bottom: 40px;
          }
          
          .faq-question-container {
            padding: 20px 16px;
          }
          
          .faq-question {
            font-size: 16px;
            padding-right: 12px;
          }
          
          .faq-answer.active {
            padding: 0 16px 20px 16px;
          }
          
          .faq-toggle-icon {
            font-size: 20px;
            min-width: 20px;
            height: 20px;
          }
        }

        /* AUTH MODALS STYLING */
        .auth-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
          /* Enhanced centering */
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal.active {
          display: flex;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
        }

        .modal-container {
          position: relative;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          margin: 0 auto;
          animation: slideUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 32px 0 32px;
          border-bottom: 1px solid #f0f0f0;
          margin-bottom: 32px;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #212529;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: #6c757d;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: #f8f9fa;
          color: #212529;
        }

        .modal-body {
          padding: 0 32px 32px 32px;
          width: 100%;
          box-sizing: border-box;
        }

        .modal-description {
          color: #6c757d;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        /* Form Styles */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          align-items: start;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .form-group.half {
          width: 100%;
          min-width: 0;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s ease;
          background: white;
        }

        .form-group input:focus {
          outline: none;
          border-color: #0056D3;
          box-shadow: 0 0 0 3px rgba(0, 86, 211, 0.1);
        }

        .form-group input.error {
          border-color: #dc3545;
        }

        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 6px;
          display: none;
        }

        .error-message.active {
          display: block;
        }

        .password-requirements {
          margin-top: 6px;
        }

        .password-requirements small {
          color: #6c757d;
          font-size: 13px;
        }

        /* Checkbox Styles */
        .checkbox-container {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          font-size: 14px;
          line-height: 1.5;
          position: relative;
          padding-left: 28px;
          width: 100%;
          text-align: left;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 2px;
          left: 0;
          height: 18px;
          width: 18px;
          background-color: white;
          border: 2px solid #e9ecef;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .checkbox-container:hover input ~ .checkmark {
          border-color: #0056D3;
        }

        .checkbox-container input:checked ~ .checkmark {
          background-color: #0056D3;
          border-color: #0056D3;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 5px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-group {
          margin: 16px 0;
          width: 100%;
        }
        
        /* Links styling */
        .terms-link {
          color: #0056D3;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .terms-link:hover {
          color: #004bb8;
          text-decoration: underline;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 16px 0;
        }

        .forgot-password-link {
          color: #0056D3;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .forgot-password-link:hover {
          text-decoration: underline;
        }

        /* Button Styles */
        .auth-button {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .auth-button.primary {
          background: #0056D3;
          color: white;
        }

        .auth-button.primary:hover {
          background: #004bb8;
          transform: translateY(-1px);
        }

        .auth-button.google-btn {
          background: white;
          color: #212529;
          border: 2px solid #e9ecef;
        }

        .auth-button.google-btn:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .auth-divider {
          text-align: center;
          position: relative;
          margin: 24px 0;
          color: #6c757d;
          font-size: 14px;
          width: 100%;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e9ecef;
        }

        .auth-divider span {
          background: white;
          padding: 0 16px;
          position: relative;
        }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          color: #6c757d;
          font-size: 14px;
          width: 100%;
        }

        .auth-footer button {
          color: #0056D3;
          text-decoration: none;
          font-weight: 500;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 14px;
        }

        .auth-footer button:hover {
          text-decoration: underline;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .modal-container {
            margin: 10px;
            width: calc(100% - 20px);
            max-width: none;
          }
          
          .modal-header,
          .modal-body {
            padding-left: 20px;
            padding-right: 20px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .form-group.half {
            width: 100%;
          }
          
          .checkbox-container {
            font-size: 13px;
            line-height: 1.4;
          }
        }
        
        @media (max-width: 480px) {
           .modal-container {
             margin: 5px;
             width: calc(100% - 10px);
           }
           
           .modal-header {
             padding: 20px 16px 0 16px;
           }
           
           .modal-body {
             padding: 0 16px 20px 16px;
           }
        }
      `}</style>
      
      {/* Back to Pricing Floating Button */}
      <button
        onClick={handleBackToPricing}
        className={`
          fixed top-5 right-5 z-[1000] bg-brand-primary text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center gap-2
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
        aria-label="Back to Pricing"
      >
        <span>←</span> Back to Pricing
      </button>

      {/* Sticky Wrapper for Banner and Header */}
      <div className="sticky top-0 z-[500] w-full flex flex-col shadow-sm">
        {/* Promotional Banner */}
        {bannerLoaded && isBannerVisible && (
          <div 
            className="bg-[#0056D3] text-white px-4 py-3 flex items-center justify-center relative cursor-pointer transition-colors duration-300 hover:bg-[#004BB8] text-sm"
            onClick={handleBannerClick}
            role="banner"
            aria-label="Promotional Banner: Forrester Wave Report"
          >
            <div className="container mx-auto max-w-7xl flex items-center justify-center pr-8 relative">
               <div className="flex items-center flex-wrap justify-center gap-2 md:gap-3 text-center md:text-left">
                 <span className="bg-[#00C851] text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wide shrink-0 shadow-sm">
                   News
                 </span>
                 <span className="font-medium leading-tight">
                   Learn why Coursera was named a leader in the 2025 Forrester Wave™ for Corporate Learning Solutions <span className="underline decoration-white/30 hover:decoration-white underline-offset-2 ml-1">Read the report &gt;</span>
                 </span>
               </div>
               
               <button 
                 onClick={handleCloseBanner}
                 className="absolute right-[-8px] md:right-0 p-1.5 hover:bg-white/10 rounded-full transition-colors"
                 aria-label="Close banner"
               >
                 <X size={16} strokeWidth={2.5} />
               </button>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <header className="border-b border-gray-200 py-3 px-4 lg:px-8 flex items-center justify-between bg-white gap-4 relative">
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <div 
              className="text-brand-primary text-2xl font-bold tracking-tighter cursor-pointer shrink-0" 
              role="heading" 
              aria-level={1}
              onClick={handleLogoClick}
            >
              coursera
            </div>
            
            {/* Search Bar - Desktop/Tablet */}
            <div className="hidden md:block relative w-full max-w-xs lg:max-w-md">
               <input 
                  type="text" 
                  placeholder="What do you want to learn?" 
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 text-sm shadow-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  aria-label="Search courses"
               />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
               <button 
                 className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-primary p-1.5 rounded-full text-white hover:bg-blue-700 transition-colors"
                 aria-label="Search"
               >
                 <Search size={14} />
               </button>
            </div>

            {/* Updated Main Navigation - Removed Explore */}
            <nav className="hidden xl:block main-navigation" aria-label="Main Navigation">
              <div className="nav-container">
                <div className="nav-item">
                  <a href="https://www.coursera.org/degrees" className="nav-link" target="_blank" rel="noopener noreferrer">
                    Degrees
                  </a>
                </div>
                
                <div className="nav-item">
                  <a href="https://www.coursera.org/career-academy" className="nav-link" target="_blank" rel="noopener noreferrer">
                    Career Academy
                  </a>
                </div>
                
                <div className="nav-item">
                  <a href="https://www.coursera.org/business/skill-tracks" className="nav-link" target="_blank" rel="noopener noreferrer">
                    SkillTracks
                  </a>
                </div>
                
                <div className="nav-item">
                  <a href="https://www.coursera.org/business" className="nav-link" target="_blank" rel="noopener noreferrer">
                    Enterprise
                  </a>
                </div>
              </div>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3 md:gap-4 items-center shrink-0">
             <button className="md:hidden text-gray-600 p-1" aria-label="Search">
               <Search size={20} />
             </button>
             <button 
               className="text-brand-primary text-sm font-semibold hover:underline hidden sm:block" 
               aria-label="Log in to your account"
               onClick={() => setActiveAuthModal('login')}
             >
               Log In
             </button>
             <button 
               onClick={() => setActiveAuthModal('signup')}
               className="bg-brand-primary text-white text-sm font-semibold px-5 py-2 rounded hover:bg-blue-800 transition-colors whitespace-nowrap" 
               aria-label="Join Coursera for free"
             >
               Join for Free
             </button>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          
          {/* Hero Section */}
          <div className="text-center mb-8 scroll-mt-36" ref={pricingSectionRef}>
            <h1 className="pricing-title">
              Plans that grow with you
            </h1>
            <p className="pricing-subtitle">
              Choose the perfect plan for your learning goals. From individual skills to enterprise-scale transformation.
            </p>
            
            {/* Toggle Navigation */}
            <TabSelector 
              categories={PRICING_DATA}
              activeCategory={activeCategory} 
              onChange={setActiveCategory} 
            />
          </div>

          {/* Dynamic Cards Grid */}
          <div 
            className={`
              grid gap-8 justify-center items-stretch
              ${activeData.plans.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : ''}
              ${activeData.plans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' : ''}
              ${activeData.plans.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
            `}
          >
            {activeData.plans.map((plan, index) => (
              <PricingCard 
                key={plan.id} 
                index={index}
                plan={plan} 
                onContactSales={() => setView('contact')}
                onTryFree={() => {
                  if (plan.id === 'biz-teams') {
                    setView('teams');
                  } else if (plan.id === 'ind-plus') {
                    setView('individual_payment');
                  } else {
                    setView('signup');
                  }
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Social Proof Section */}
        <SocialProofSection activeCategory={activeCategory} />
        
        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Enhanced Footer */}
      <footer className="footer-container" role="contentinfo">
        <div className="footer-content">
          <div className="footer-columns">
            {/* Coursera Column */}
            <div className="footer-column">
              <h3 className="footer-column-header">Coursera</h3>
              {FOOTER_LINKS.coursera.map(link => (
                <a 
                  key={link.text} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  {link.text}
                </a>
              ))}
            </div>
            
            {/* Community Column */}
            <div className="footer-column">
              <h3 className="footer-column-header">Community</h3>
              {FOOTER_LINKS.community.map(link => (
                <a 
                  key={link.text} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  {link.text}
                </a>
              ))}
            </div>
            
            {/* More Column */}
            <div className="footer-column">
              <h3 className="footer-column-header">More</h3>
              {FOOTER_LINKS.more.map(link => (
                <a 
                  key={link.text} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-bottom-section">
             <div className="text-gray-500 text-sm">
              © 2024 Coursera Inc. All rights reserved.
            </div>
            
            <div className="footer-right-group">
                 <div className="social-icons-container">
                  {SOCIAL_LINKS.map(social => (
                    <a 
                      key={social.label} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-icon" 
                      aria-label={social.label}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
                
                <div className="footer-badges">
                  <div className="text-badge">
                    <strong>B Corp Certified</strong>
                  </div>
                  
                  <div className="app-links-text">
                    <a href="https://play.google.com/store/apps/details?id=org.coursera.android" 
                       target="_blank" rel="noopener noreferrer" className="text-link">
                      📱 Download on Google Play
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-link">
                      📱 Download on App Store
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;