
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, CheckCircle, Minus, Plus, Lock, CreditCard } from 'lucide-react';

interface TeamsSignupProps {
  onBack: () => void;
}

const TeamsSignup: React.FC<TeamsSignupProps> = ({ onBack }) => {
  // Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    orgName: '',
    orgType: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    zip: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Billing State
  const [billingCycle, setBillingCycle] = useState<'annual' | 'quarterly'>('annual');
  const [licenses, setLicenses] = useState<number>(5);
  const [showSuccess, setShowSuccess] = useState(false);

  // Constants
  const MIN_LICENSES = 5;
  const MAX_LICENSES = 125;
  const BASE_PRICE = 259; // Per license per year

  // Calculations
  const pricePerLicense = billingCycle === 'annual' ? BASE_PRICE : BASE_PRICE / 4;
  const subtotal = licenses * pricePerLicense;
  const total = subtotal; // Tax included logic

  // Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLicenseChange = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num)) {
      if (num > MAX_LICENSES) setLicenses(MAX_LICENSES);
      else if (num < MIN_LICENSES) setLicenses(MIN_LICENSES);
      else setLicenses(num);
    }
  };

  const adjustLicenses = (delta: number) => {
    const newValue = licenses + delta;
    if (newValue >= MIN_LICENSES && newValue <= MAX_LICENSES) {
      setLicenses(newValue);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim()) newErrors.workEmail = 'Work email is required';
    else if (!emailRegex.test(formData.workEmail)) newErrors.workEmail = 'Invalid email format';
    
    if (!formData.orgName.trim()) newErrors.orgName = 'Organization name is required';
    if (!formData.orgType) newErrors.orgType = 'Please select an organization type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvc.trim()) newErrors.cvc = 'CVC is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Teams Signup Data:', {
        account: formData,
        billing: {
          cycle: billingCycle,
          licenses,
          total
        }
      });
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 lg:px-8 sticky top-0 z-20">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-brand-primary text-2xl font-bold tracking-tighter" role="heading" aria-level={1}>coursera</div>
            <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block" aria-hidden="true"></div>
            <span className="text-sm font-semibold text-gray-600 hidden sm:block">For Teams</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
            aria-label="Back to Pricing"
          >
            <ArrowLeft size={16} />
            Back to Pricing
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT COLUMN: FORM */}
          <div className="w-full lg:w-7/12 order-2 lg:order-1">
            {/* Steps Indicator */}
            <div className="mb-8 flex items-center gap-4 text-sm font-medium" aria-label="Progress">
              <div className={`flex items-center gap-2 ${step === 1 ? 'text-brand-primary' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'border-brand-primary bg-blue-50' : 'border-green-600 bg-green-50'}`}>
                  {step === 1 ? '1' : <CheckCircle size={16} />}
                </div>
                Account Details
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${step === 2 ? 'text-brand-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'border-brand-primary bg-blue-50' : 'border-gray-300'}`}>
                  2
                </div>
                Payment
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              {step === 1 ? (
                /* STEP 1: ACCOUNT DETAILS */
                <form onSubmit={handleContinue} noValidate>
                  <h2 className="text-2xl font-bold mb-6">Create your account</h2>
                  
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="fullName"
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && <p id="fullName-error" className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5" htmlFor="workEmail">
                        Work Email <span className="text-red-500">*</span>
                        <div className="group relative">
                          <Info size={14} className="text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs p-2 rounded shadow-lg z-10">
                            We'll use this to verify your organization.
                          </div>
                        </div>
                      </label>
                      <input 
                        id="workEmail"
                        type="email" 
                        name="workEmail" 
                        value={formData.workEmail} 
                        onChange={handleChange}
                        placeholder="john.doe@organization.com"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.workEmail ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                        aria-invalid={!!errors.workEmail}
                        aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                      />
                      {errors.workEmail && <p id="workEmail-error" className="text-red-500 text-xs mt-1">{errors.workEmail}</p>}
                    </div>

                    {/* Org Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="orgName">
                        Organization Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="orgName"
                        type="text" 
                        name="orgName" 
                        value={formData.orgName} 
                        onChange={handleChange}
                        placeholder="Organization.pvt.ltd"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.orgName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                        aria-invalid={!!errors.orgName}
                        aria-describedby={errors.orgName ? "orgName-error" : undefined}
                      />
                      {errors.orgName && <p id="orgName-error" className="text-red-500 text-xs mt-1">{errors.orgName}</p>}
                    </div>

                    {/* Org Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="orgType">
                        Organization Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          id="orgType"
                          name="orgType" 
                          value={formData.orgType} 
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.orgType ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none bg-white`}
                          aria-invalid={!!errors.orgType}
                          aria-describedby={errors.orgType ? "orgType-error" : undefined}
                        >
                          <option value="">Select type</option>
                          <option value="Corporation">Corporation</option>
                          <option value="Small Business">Small Business</option>
                          <option value="Startup">Startup</option>
                          <option value="Non-profit">Non-profit</option>
                          <option value="Educational Institution">Educational Institution</option>
                          <option value="Government">Government</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                      {errors.orgType && <p id="orgType-error" className="text-red-500 text-xs mt-1">{errors.orgType}</p>}
                    </div>

                    {/* Button */}
                    <button 
                      type="submit"
                      className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md mt-4 flex items-center justify-center gap-2"
                    >
                      Continue to pay
                    </button>

                    {/* Legal */}
                    <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                      By submitting your information in the form above, you agree to our <a href="#" className="text-brand-primary hover:underline">Terms of Use</a> and <a href="#" className="text-brand-primary hover:underline">Privacy Notice</a>. We may use this information to contact you and/or use data from third parties to personalize your experience.
                    </p>
                  </div>
                </form>
              ) : (
                /* STEP 2: PAYMENT (MOCK) */
                <form onSubmit={handleSubmit} noValidate>
                   <button 
                     type="button" 
                     onClick={() => setStep(1)}
                     className="text-sm text-gray-500 hover:text-brand-primary mb-4 flex items-center gap-1"
                   >
                     <ArrowLeft size={14} /> Edit Account Details
                   </button>
                   <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                   
                   <div className="space-y-6">
                     {/* Mock Card Input */}
                     <div className="p-4 border border-brand-primary/20 bg-blue-50/50 rounded-lg mb-6">
                        <div className="flex items-center gap-3 mb-4">
                           <Lock size={16} className="text-brand-primary" />
                           <span className="text-sm font-medium text-gray-700">Secure SSL Encryption</span>
                           <div className="ml-auto flex gap-1">
                              {/* Mock Card Icons */}
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs font-bold uppercase text-gray-500 mb-1" htmlFor="cardName">Name on Card</label>
                              <input 
                                id="cardName" name="cardName" type="text" 
                                value={formData.cardName} onChange={handleChange}
                                placeholder="JOHN DOE"
                                className={`w-full px-3 py-2 bg-white rounded border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary outline-none`}
                              />
                              {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                           </div>
                           
                           <div>
                              <label className="block text-xs font-bold uppercase text-gray-500 mb-1" htmlFor="cardNumber">Card Number</label>
                              <div className="relative">
                                <input 
                                    id="cardNumber" name="cardNumber" type="text" 
                                    value={formData.cardNumber} onChange={handleChange}
                                    placeholder="0000 0000 0000 0000"
                                    className={`w-full pl-10 px-3 py-2 bg-white rounded border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary outline-none`}
                                />
                                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              </div>
                              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1" htmlFor="expiry">Expiry Date</label>
                                  <input 
                                    id="expiry" name="expiry" type="text" 
                                    value={formData.expiry} onChange={handleChange}
                                    placeholder="MM/YY"
                                    className={`w-full px-3 py-2 bg-white rounded border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary outline-none`}
                                  />
                                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                               </div>
                               <div>
                                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1" htmlFor="cvc">CVC</label>
                                  <input 
                                    id="cvc" name="cvc" type="text" 
                                    value={formData.cvc} onChange={handleChange}
                                    placeholder="123"
                                    className={`w-full px-3 py-2 bg-white rounded border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary outline-none`}
                                  />
                                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                               </div>
                           </div>

                           <div>
                              <label className="block text-xs font-bold uppercase text-gray-500 mb-1" htmlFor="zip">Billing ZIP / Postal Code</label>
                              <input 
                                id="zip" name="zip" type="text" 
                                value={formData.zip} onChange={handleChange}
                                placeholder="10001"
                                className={`w-full px-3 py-2 bg-white rounded border ${errors.zip ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary outline-none`}
                              />
                              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                           </div>
                        </div>
                     </div>

                     <button 
                      type="submit"
                      className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Pay ${total.toLocaleString()}
                    </button>
                    <p className="text-center text-xs text-gray-500 flex justify-center items-center gap-1">
                        <Lock size={12} /> Payments are secure and encrypted.
                    </p>
                   </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: BILLING SUMMARY */}
          <div className="w-full lg:w-5/12 order-1 lg:order-2">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        Join 4500+ teams learning on Coursera!
                    </h3>
                </div>

                <div className="p-6">
                    {/* Billing Cycle */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Select Billing Cycle</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setBillingCycle('annual')}
                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${billingCycle === 'annual' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Annual
                            </button>
                            <button
                                type="button"
                                onClick={() => setBillingCycle('quarterly')}
                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${billingCycle === 'quarterly' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Quarterly
                            </button>
                        </div>
                    </div>

                    {/* License Selector */}
                    <div className="mb-8">
                        <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                            <span className="flex items-center gap-1">
                                Number of licenses 
                                <Info size={14} className="text-gray-400" />
                            </span>
                            <span className="text-xs font-normal text-gray-500">(between 5-125)</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <button 
                                type="button"
                                onClick={() => adjustLicenses(-1)}
                                disabled={licenses <= MIN_LICENSES}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                                aria-label="Decrease licenses"
                            >
                                <Minus size={18} />
                            </button>
                            <div className="flex-1 relative">
                                <input 
                                    type="number"
                                    min={MIN_LICENSES}
                                    max={MAX_LICENSES}
                                    value={licenses}
                                    onChange={(e) => handleLicenseChange(e.target.value)}
                                    className="w-full h-10 text-center border border-gray-300 rounded-lg font-bold text-gray-900 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none appearance-none"
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={() => adjustLicenses(1)}
                                disabled={licenses >= MAX_LICENSES}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                                aria-label="Increase licenses"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Purchase Summary Box */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Purchase Summary</h4>
                        
                        <div className="space-y-3 text-sm mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Billing Cycle</span>
                                <span className="font-medium text-gray-900 capitalize">{billingCycle}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price per license</span>
                                <span className="font-medium text-gray-900">
                                    ${pricePerLicense.toFixed(2)} <span className="text-xs text-gray-500">{billingCycle === 'annual' ? '/ year' : '/ quarter'}</span>
                                </span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-600">Number of licenses</span>
                                <span className="font-medium text-gray-900">{licenses}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3 mb-2">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-600 font-medium">Subtotal</span>
                                <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total Payment</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-brand-primary">${total.toLocaleString()}</span>
                                    {billingCycle === 'quarterly' && <div className="text-[10px] text-gray-500 font-medium">(per quarter)</div>}
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-[10px] text-gray-500 text-center mt-4">
                            All taxes included. <a href="#" className="text-brand-primary hover:underline">14-day refund policy</a> on your purchase.
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-500 animate-in fade-in" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative text-center transform transition-all scale-100 animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-blue-50/50">
                <CheckCircle size={40} strokeWidth={2.5} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Coursera for Teams!</h2>
             <p className="text-gray-600 mb-8 leading-relaxed">
                Thanks for choosing Coursera. Our implementation team will send you an email in the next 30 minutes to help with the next steps.
             </p>
             <button 
                onClick={onBack}
                className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-brand-primary/20"
             >
                Got it
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsSignup;
