
import React, { useState } from 'react';
import { Check, Lock, CreditCard } from 'lucide-react';

interface IndividualPaymentProps {
  onBack: () => void;
}

const IndividualPayment: React.FC<IndividualPaymentProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'quarterly'>('annual');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    profession: '',
    goals: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    billingZip: ''
  });

  const price = billingCycle === 'annual' ? 150.00 : 37.50;
  const priceDisplay = billingCycle === 'annual' ? '$150.00' : '$37.50';
  const periodDisplay = billingCycle === 'annual' ? '/ year' : '/ quarter';
  const billingPeriodText = billingCycle === 'annual' ? '(Annual)' : '(per Quarter)';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cardName && formData.cardNumber && formData.expiryDate && formData.cvc && formData.billingZip) {
      alert('Payment successful! Welcome to Coursera Plus!');
      onBack();
    }
  };

  return (
    <div className="individual-payment-page">
      <style>{`
        .individual-payment-page {
          min-height: 100vh;
          background: #fafbfc;
          font-family: 'Inter', sans-serif;
        }

        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: white;
          border-bottom: 1px solid #e9ecef;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .coursera-logo {
          font-size: 24px;
          font-weight: 700;
          color: #0056D3;
          letter-spacing: -0.05em;
        }

        .page-label {
          font-size: 14px;
          color: #6c757d;
          font-weight: 600;
          background: #f8f9fa;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .back-link {
          color: #6c757d;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .back-link:hover {
            color: #0056D3;
        }

        .payment-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .step-indicators {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          gap: 40px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #6c757d;
          font-weight: 500;
        }

        .step.active {
          color: #0056D3;
          font-weight: 600;
        }

        .step.completed {
          color: #28a745;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #0056D3;
          color: white;
          box-shadow: 0 0 0 4px rgba(0, 86, 211, 0.1);
        }

        .step.completed .step-number {
          background: #28a745;
          color: white;
        }

        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
          align-items: start;
        }

        .form-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid #e9ecef;
        }

        .billing-section {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid #e9ecef;
          position: sticky;
          top: 100px;
        }

        .promo-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0f7ff;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          color: #0056D3;
          font-weight: 500;
          border: 1px solid rgba(0, 86, 211, 0.1);
        }
        
        .checkmark-icon {
            width: 18px;
            height: 18px;
            background: #0056D3;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }

        .billing-controls h3, .license-info h4, .purchase-summary h4 {
            font-size: 14px;
            font-weight: 700;
            color: #212529;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .billing-toggle {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .billing-radio {
            display: none;
        }

        .billing-option {
          flex: 1;
          padding: 12px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s ease;
          color: #495057;
          font-size: 14px;
        }
        
        .billing-option:hover {
            border-color: #dee2e6;
            background: #f8f9fa;
        }

        .billing-radio:checked + .billing-option {
          border-color: #0056D3;
          background: #f0f7ff;
          color: #0056D3;
        }

        .license-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid #e9ecef;
        }

        .license-count {
          font-size: 20px;
          font-weight: 700;
          color: #212529;
          background: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid #dee2e6;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .license-label {
            font-size: 14px;
            font-weight: 500;
            color: #495057;
        }

        .purchase-summary {
          border-top: 1px solid #e9ecef;
          padding-top: 24px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          color: #495057;
        }
        
        .summary-row span:last-child {
            font-weight: 600;
            color: #212529;
        }

        .summary-row.subtotal {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px dashed #e9ecef;
        }

        .summary-row.total {
          border-top: 2px solid #e9ecef;
          margin-top: 16px;
          padding-top: 16px;
          font-size: 16px;
        }
        
        .summary-row.total span {
            font-weight: 800;
            color: #0056D3;
        }
        
        .billing-period {
            text-align: right;
            font-size: 12px;
            color: #6c757d;
            margin-top: 4px;
            font-weight: 500;
        }

        .refund-policy {
          font-size: 12px;
          color: #6c757d;
          text-align: center;
          margin-top: 24px;
          line-height: 1.5;
        }
        
        .refund-link {
            color: #0056D3;
            text-decoration: none;
        }
        
        .refund-link:hover {
            text-decoration: underline;
        }
        
        /* Form Styles */
        h2 {
            font-size: 24px;
            font-weight: 700;
            color: #212529;
            margin-bottom: 32px;
            letter-spacing: -0.02em;
        }

        .form-group {
            margin-bottom: 24px;
        }
        
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 700;
            color: #495057;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .required {
            color: #dc3545;
            margin-left: 4px;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #ced4da;
            border-radius: 8px;
            font-size: 16px;
            color: #212529;
            transition: all 0.2s;
            background: #fff;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #0056D3;
            box-shadow: 0 0 0 3px rgba(0, 86, 211, 0.15);
        }
        
        .form-group input::placeholder {
            color: #adb5bd;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .continue-btn, .pay-btn {
          width: 100%;
          background: #0056D3;
          color: white;
          padding: 16px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 24px;
          transition: background 0.2s;
          box-shadow: 0 4px 6px rgba(0, 86, 211, 0.2);
        }

        .continue-btn:hover, .pay-btn:hover {
          background: #004bb8;
          transform: translateY(-1px);
        }
        
        .terms-text {
            font-size: 12px;
            color: #6c757d;
            line-height: 1.6;
            text-align: center;
        }
        
        .terms-text a {
            color: #0056D3;
            text-decoration: none;
        }
        
        .terms-text a:hover {
            text-decoration: underline;
        }
        
        .edit-link {
            margin-bottom: 24px;
        }
        
        .edit-link button {
            background: none;
            border: none;
            color: #6c757d;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .edit-link button:hover {
            color: #0056D3;
        }
        
        .security-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #e8f5e9;
            color: #2e7d32;
            padding: 6px 12px;
            border-radius: 100px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 32px;
        }
        
        .security-note {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 12px;
            color: #6c757d;
        }

        @media (max-width: 968px) {
          .payment-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .billing-section {
            position: static;
            order: -1;
          }
          
          .payment-header {
              padding: 16px 20px;
          }
          
          .step-indicators {
              gap: 20px;
          }
          
          .step-label {
              display: none;
          }
        }
      `}</style>

      <header className="payment-header">
        <div className="flex items-center gap-4">
            <div className="coursera-logo">coursera</div>
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <div className="page-label hidden sm:block">For Individuals</div>
        </div>
        <button onClick={onBack} className="back-link">
            <span>←</span> Back to Pricing
        </button>
      </header>
      
      <div className="payment-container">
        {/* Step Indicators */}
        <div className="step-indicators">
          <div className={`step ${step === 1 ? 'active' : 'completed'}`}>
            <div className="step-number">
                {step === 1 ? '1' : <Check size={16} strokeWidth={3} />}
            </div>
            <span className="step-label">Account Details</span>
          </div>
          <div className="w-12 h-px bg-gray-200 self-center"></div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Payment</span>
          </div>
        </div>
        
        {/* Main Content Layout */}
        <div className="payment-layout">
          {/* Left Side - Form */}
          <div className="form-section">
            {step === 1 ? (
                <>
                    <h2>Create your account</h2>
                    <form onSubmit={handleAccountSubmit} className="account-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                        <input 
                            type="text" id="fullName" name="fullName" required 
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input 
                            type="email" id="email" name="email" required 
                            placeholder="john.doe@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="profession">Profession</label>
                        <select id="profession" name="profession" value={formData.profession} onChange={handleInputChange}>
                        <option value="">Select profession (optional)</option>
                        <option value="student">Student</option>
                        <option value="professional">Working Professional</option>
                        <option value="career-changer">Career Changer</option>
                        <option value="educator">Educator</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="goals">Learning Goals</label>
                        <select id="goals" name="goals" value={formData.goals} onChange={handleInputChange}>
                        <option value="">What do you want to achieve? (optional)</option>
                        <option value="skill-development">Develop new skills</option>
                        <option value="career-advancement">Advance my career</option>
                        <option value="career-change">Change careers</option>
                        <option value="personal-interest">Personal interest</option>
                        <option value="certification">Get certified</option>
                        <option value="degree">Earn a degree</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="continue-btn">Continue to pay</button>
                    
                    <div className="terms-text">
                        By submitting your information in the form above, you agree to our <a href="https://www.coursera.org/about/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a> and <a href="https://www.coursera.org/about/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a>. We may use this information to contact you and/or use data from third parties to personalize your experience.
                    </div>
                    </form>
                </>
            ) : (
                <>
                    <div className="edit-link">
                        <button type="button" onClick={() => setStep(1)}>
                            <span>←</span> Edit Account Details
                        </button>
                    </div>
                    
                    <h2>Payment Method</h2>
                    
                    <div className="security-badge">
                        <Lock size={14} />
                        <span>Secure SSL Encryption</span>
                    </div>
                    
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                    <div className="form-group">
                        <label htmlFor="cardName">NAME ON CARD</label>
                        <input 
                            type="text" id="cardName" name="cardName" required 
                            placeholder="JOHN DOE"
                            value={formData.cardName}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="cardNumber">CARD NUMBER</label>
                        <div className="relative">
                            <input 
                                type="text" id="cardNumber" name="cardNumber" required 
                                placeholder="0000 0000 0000 0000" maxLength={19}
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <CreditCard size={20} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                        <label htmlFor="expiryDate">EXPIRY DATE</label>
                        <input 
                            type="text" id="expiryDate" name="expiryDate" required 
                            placeholder="MM/YY" maxLength={5}
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="cvc">CVC</label>
                        <input 
                            type="text" id="cvc" name="cvc" required 
                            placeholder="123" maxLength={4}
                            value={formData.cvc}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="billingZip">BILLING ZIP / POSTAL CODE</label>
                        <input 
                            type="text" id="billingZip" name="billingZip" required 
                            placeholder="10001"
                            value={formData.billingZip}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <button type="submit" className="pay-btn">Pay {priceDisplay}</button>
                    
                    <div className="security-note">
                        <Lock size={12} />
                        <span>Payments are secure and encrypted.</span>
                    </div>
                    </form>
                </>
            )}
          </div>
          
          {/* Right Side - Billing Summary */}
          <div className="billing-section">
            <div className="promo-message">
              <div className="checkmark-icon">✓</div>
              <span>Join millions learning on Coursera!</span>
            </div>
            
            <div className="billing-controls">
              <h3>Select Billing Cycle</h3>
              <div className="billing-toggle">
                <input 
                    type="radio" id="annual" name="billingCycle" 
                    value="annual" 
                    className="billing-radio"
                    checked={billingCycle === 'annual'}
                    onChange={() => setBillingCycle('annual')}
                />
                <label htmlFor="annual" className="billing-option">Annual</label>
                
                <input 
                    type="radio" id="quarterly" name="billingCycle" 
                    value="quarterly" 
                    className="billing-radio"
                    checked={billingCycle === 'quarterly'}
                    onChange={() => setBillingCycle('quarterly')}
                />
                <label htmlFor="quarterly" className="billing-option">Quarterly</label>
              </div>
            </div>
            
            <div className="license-info">
              <h4>Number of licenses</h4>
              <div className="license-display">
                <span className="license-count">1</span>
                <span className="license-label">(Individual Plan)</span>
              </div>
            </div>
            
            <div className="purchase-summary">
              <h4>Purchase Summary</h4>
              
              <div className="summary-row">
                <span>Billing Cycle</span>
                <span className="capitalize">{billingCycle}</span>
              </div>
              
              <div className="summary-row">
                <span>Price per license</span>
                <span>{priceDisplay} {periodDisplay}</span>
              </div>
              
              <div className="summary-row">
                <span>Number of licenses</span>
                <span>1</span>
              </div>
              
              <div className="summary-row subtotal">
                <span>Subtotal</span>
                <span>{priceDisplay}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total Payment</span>
                <span>{priceDisplay}</span>
              </div>
              
              <div className="billing-period">{billingPeriodText}</div>
              
              <div className="refund-policy">
                All taxes included. <a href="#" className="refund-link">14-day refund policy</a> on your purchase.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPayment;
