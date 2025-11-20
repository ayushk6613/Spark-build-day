
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface TryFreeSignupProps {
  onBack: () => void;
}

const TryFreeSignup: React.FC<TryFreeSignupProps> = ({ onBack }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    interest: '',
    goals: '',
    country: '',
    newsletter: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
    }

    if (!formData.country) newErrors.country = 'Please select a country';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signup Form Data Submitted:', formData);
      setShowSuccess(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 lg:px-8 sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="text-brand-primary text-2xl font-bold tracking-tighter" role="heading" aria-level={1}>coursera</div>
            </div>
            <button 
                onClick={onBack}
                aria-label="Back to Pricing Page"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Pricing
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            
            <div className="w-full p-8 md:p-12">
                <div className="mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Start your free trial</h1>
                    <p className="text-gray-600 mb-8">
                        Join millions of learners on Coursera. Create your account to get started.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="firstName">First Name <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="firstName"
                                    ref={firstNameRef}
                                    type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                                    aria-label="First Name"
                                    aria-required="true"
                                    aria-invalid={!!errors.firstName}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1" role="alert">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="lastName">Last Name <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="lastName"
                                    type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                                    aria-label="Last Name"
                                    aria-required="true"
                                    aria-invalid={!!errors.lastName}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1" role="alert">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="email"
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    aria-label="Email Address"
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input 
                                    id="phone"
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    aria-label="Phone Number (Optional)"
                                    aria-invalid={!!errors.phone}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="role">Current Role</label>
                                <select 
                                    id="role"
                                    name="role" value={formData.role} onChange={handleChange}
                                    aria-label="Current Role"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white"
                                >
                                    <option value="">Select role...</option>
                                    <option value="Student">Student</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Career Changer">Career Changer</option>
                                    <option value="Educator">Educator</option>
                                    <option value="Retired">Retired</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="interest">Field of Interest</label>
                                <select 
                                    id="interest"
                                    name="interest" value={formData.interest} onChange={handleChange}
                                    aria-label="Field of Interest"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white"
                                >
                                    <option value="">Select interest...</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Arts & Humanities">Arts & Humanities</option>
                                    <option value="Health">Health</option>
                                    <option value="Language Learning">Language Learning</option>
                                    <option value="Personal Development">Personal Development</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="goals">What are your learning goals? <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <textarea 
                                id="goals"
                                name="goals" value={formData.goals} onChange={handleChange} rows={3}
                                aria-label="Learning Goals (Optional)"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Row 5 */}
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="country">Country <span className="text-red-500" aria-hidden="true">*</span></label>
                                <select 
                                    id="country"
                                    name="country" value={formData.country} onChange={handleChange}
                                    aria-label="Country"
                                    aria-required="true"
                                    aria-invalid={!!errors.country}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white`}
                                >
                                    <option value="">Select country...</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Canada">Canada</option>
                                    <option value="India">India</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.country && <p className="text-red-500 text-xs mt-1" role="alert">{errors.country}</p>}
                        </div>
                        
                        {/* Checkbox */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="newsletter"
                                    name="newsletter"
                                    type="checkbox"
                                    checked={formData.newsletter}
                                    onChange={handleChange}
                                    aria-label="Receive updates about new courses"
                                    className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary focus:ring-2"
                                />
                            </div>
                            <label htmlFor="newsletter" className="text-sm text-gray-600">
                                I would like to receive updates about new courses and learning opportunities
                            </label>
                        </div>

                        {/* Legal Text */}
                        <p className="text-xs text-gray-500 mt-4">
                            By creating an account, you agree to our <a href="#" className="text-brand-primary hover:underline">Terms of Use</a> and <a href="#" className="text-brand-primary hover:underline">Privacy Notice</a>. Start your learning journey today with free access to thousands of courses.
                        </p>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            aria-label="Create Free Account"
                            className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform active:scale-[0.99]"
                        >
                            Start Learning for Free
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </main>
        
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 animate-in fade-in" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative text-center transform transition-all scale-100">
             <div className="w-16 h-16 bg-blue-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <CheckCircle size={32} strokeWidth={3} />
             </div>
             <h2 id="success-title" className="text-2xl font-bold text-gray-900 mb-2">Welcome to Coursera!</h2>
             <p className="text-gray-600 mb-8">
                Your free account has been created successfully. You can now access to +16,000 courses and start learning immediately. Check your email for getting started tips.
             </p>
             <button 
                onClick={onBack}
                aria-label="Close success message and start learning"
                className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
             >
                Start Learning
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryFreeSignup;
