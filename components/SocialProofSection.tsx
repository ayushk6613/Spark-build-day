
import React from 'react';
import { TierCategory } from '../types';

interface SocialProofSectionProps {
  activeCategory: TierCategory;
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ activeCategory }) => {
  const getActiveSection = () => {
    switch (activeCategory) {
      case TierCategory.UNIVERSITY:
        return 'universities';
      case TierCategory.GOVERNMENT:
        return 'government';
      case TierCategory.INDIVIDUAL:
      case TierCategory.BUSINESS:
      default:
        return 'enterprise';
    }
  };

  const activeSection = getActiveSection();

  return (
    <section className="social-proof-wrapper">
      <div className="social-proof-container">
        {/* Teams & Enterprise Social Proof (shown for Individual too) */}
        <div className={`social-proof-section ${activeSection === 'enterprise' ? 'active' : ''}`} id="enterprise-social-proof">
          <h2 className="social-proof-title">Trusted by teams at</h2>
          <div className="customers-grid">
            <div className="customer-box">Walmart</div>
            <div className="customer-box">BNP Paribas</div>
            <div className="customer-box">Capgemini</div>
            <div className="customer-box">Tata Communications</div>
            <div className="customer-box">Amazon</div>
            <div className="customer-box">Google</div>
          </div>
        </div>

        {/* Universities Social Proof */}
        <div className={`social-proof-section ${activeSection === 'universities' ? 'active' : ''}`} id="universities-social-proof">
          <h2 className="social-proof-title">Trusted by teams at</h2>
          <div className="customers-grid">
            <div className="customer-box">Imperial College London</div>
            <div className="customer-box">University of Michigan</div>
            <div className="customer-box">University of Melbourne</div>
            <div className="customer-box">Virginia State University</div>
            <div className="customer-box">FPT University</div>
          </div>
        </div>

        {/* Government Social Proof */}
        <div className={`social-proof-section ${activeSection === 'government' ? 'active' : ''}`} id="government-social-proof">
          <h2 className="social-proof-title">Trusted by teams at</h2>
          <div className="customers-grid">
            <div className="customer-box">Dubai Police</div>
            <div className="customer-box">National Bank of Greece</div>
            <div className="customer-box">Arab Monetary Fund</div>
            <div className="customer-box">European Bank for Development</div>
            <div className="customer-box">FIFA</div>
          </div>
        </div>
      </div>

      <style>{`
        /* Social Proof Wrapper */
        .social-proof-wrapper {
          background: #ffffff;
          padding: 80px 0 100px 0;
          margin: 0;
        }

        .social-proof-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          text-align: center;
        }

        /* Individual social proof sections */
        .social-proof-section {
          display: none;
          animation: fadeIn 0.5s ease;
        }

        .social-proof-section.active {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Title styling - match Coursera */
        .social-proof-title {
          font-size: 48px;
          font-weight: 400;
          color: #2D3748;
          margin-bottom: 60px;
          text-align: center;
          line-height: 1.2;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Customer grid - responsive layout */
        .customers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px 24px;
          max-width: 1000px;
          margin: 0 auto;
          justify-items: center;
        }

        /* Customer boxes - exact Coursera style */
        .customer-box {
          background: rgba(0, 86, 211, 0.08);
          border: 1px solid rgba(0, 86, 211, 0.15);
          border-radius: 16px;
          padding: 20px 32px;
          font-size: 18px;
          font-weight: 600;
          color: #0056D3;
          text-align: center;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: default;
          width: 100%;
          max-width: 320px;
          box-sizing: border-box;
        }

        .customer-box:hover {
          background: rgba(0, 86, 211, 0.12);
          border-color: rgba(0, 86, 211, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 86, 211, 0.15);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .social-proof-container {
            padding: 0 30px;
          }
          
          .social-proof-title {
            font-size: 42px;
            margin-bottom: 50px;
          }
          
          .customers-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px 20px;
          }
          
          .customer-box {
            padding: 18px 28px;
            font-size: 17px;
            max-width: 280px;
          }
        }

        @media (max-width: 768px) {
          .social-proof-wrapper {
            padding: 60px 0 80px 0;
          }
          
          .social-proof-container {
            padding: 0 20px;
          }
          
          .social-proof-title {
            font-size: 36px;
            margin-bottom: 40px;
          }
          
          .customers-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            max-width: 400px;
          }
          
          .customer-box {
            padding: 16px 24px;
            font-size: 16px;
            max-width: 100%;
            min-height: 56px;
          }
        }

        @media (max-width: 480px) {
          .social-proof-title {
            font-size: 32px;
            margin-bottom: 32px;
          }
          
          .customer-box {
            padding: 14px 20px;
            font-size: 15px;
            min-height: 52px;
          }
        }

        /* Alternative 3-column layout for wider screens */
        @media (min-width: 1200px) {
          .customers-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px 32px;
          }
          
          .customer-box {
            max-width: none;
          }

          /* Layout adjustments for specific item counts on large screens */
          .customers-grid:has(.customer-box:nth-child(5):last-child) {
            grid-template-columns: repeat(3, 1fr);
          }

          /* Center alignment logic for 5 items (3 top, 2 bottom centered visually by placement) */
          /* Note: CSS Grid column placement for centering the last row of 2 items in a 3-col grid
             is tricky without wrapper elements, these rules help align them specifically */
          .customers-grid:has(.customer-box:nth-child(5):last-child) .customer-box:nth-child(4) {
            grid-column: 1; 
            margin-left: auto; /* Push to right of cell if possible */
          }

          .customers-grid:has(.customer-box:nth-child(5):last-child) .customer-box:nth-child(5) {
            grid-column: 2;
            margin-right: auto; /* Push to left of cell */
          }
          
          /* Actually, to center 2 items in row 2 of a 3-col grid, 
             a better hack if we strictly stick to grid cells is:
             Item 4 spans from col line 1.5 to 2.5? No.
             Let's stick to the simple placement which creates a balanced look:
             Item 4 in Col 1, Item 5 in Col 2 looks left heavy. 
             Item 4 in Col 1 (justify-self-end), Item 5 in Col 3 (justify-self-start)? No gap is too big.
             
             For simplicity and robustness, we will let auto-flow handle it, 
             but the requested CSS specifically asked for column manipulation.
             I'll use a slightly modified version of the requested CSS that attempts to center them better 
             using a 6-column underlying grid for 5 items, or just use flexbox for the container which is safer.
             
             However, adhering to "Exact Coursera Format" request usually implies the grid structure.
             I will use the standard 3-column grid as requested.
          */
           
           .customers-grid:has(.customer-box:nth-child(6):last-child) {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default SocialProofSection;
