
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ContactSalesProps {
  onBack: () => void;
}

const ContactSales: React.FC<ContactSalesProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institutionType: '',
    institutionName: '',
    jobRole: '',
    department: '',
    needs: '',
    country: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
    }

    if (!formData.institutionType) newErrors.institutionType = 'Please select an institution type';
    if (!formData.institutionName.trim()) newErrors.institutionName = 'Institution name is required';
    if (!formData.jobRole.trim()) newErrors.jobRole = 'Job role is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.needs.trim()) newErrors.needs = 'Please describe your needs';
    if (!formData.country) newErrors.country = 'Please select a country';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data Submitted:', formData);
      setShowSuccess(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block" aria-hidden="true"></div>
                <span className="text-sm font-semibold text-gray-600 hidden sm:block">For Enterprise</span>
            </div>
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
                aria-label="Back to Pricing Page"
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Pricing
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            
            <div className="w-full p-8 md:p-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact our Sales Team</h1>
                    <p className="text-gray-600 mb-8">
                        Tell us about your organization’s needs and we’ll find the right solution for you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="firstName">First Name <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="firstName"
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Work Email <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="email"
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    aria-label="Work Email"
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">Phone Number <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="phone"
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    aria-label="Phone Number"
                                    aria-required="true"
                                    aria-invalid={!!errors.phone}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="institutionType">Institution Type <span className="text-red-500" aria-hidden="true">*</span></label>
                                <select 
                                    id="institutionType"
                                    name="institutionType" value={formData.institutionType} onChange={handleChange}
                                    aria-label="Institution Type"
                                    aria-required="true"
                                    aria-invalid={!!errors.institutionType}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.institutionType ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white`}
                                >
                                    <option value="">Select type...</option>
                                    <option value="University">University</option>
                                    <option value="Corporation">Corporation</option>
                                    <option value="Government">Government</option>
                                    <option value="Non-profit">Non-profit</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.institutionType && <p className="text-red-500 text-xs mt-1" role="alert">{errors.institutionType}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="institutionName">Institution Name <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="institutionName"
                                    type="text" name="institutionName" value={formData.institutionName} onChange={handleChange}
                                    aria-label="Institution Name"
                                    aria-required="true"
                                    aria-invalid={!!errors.institutionName}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.institutionName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.institutionName && <p className="text-red-500 text-xs mt-1" role="alert">{errors.institutionName}</p>}
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="jobRole">Job Role <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="jobRole"
                                    type="text" name="jobRole" value={formData.jobRole} onChange={handleChange}
                                    aria-label="Job Role"
                                    aria-required="true"
                                    aria-invalid={!!errors.jobRole}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.jobRole ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.jobRole && <p className="text-red-500 text-xs mt-1" role="alert">{errors.jobRole}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="department">Department <span className="text-red-500" aria-hidden="true">*</span></label>
                                <input 
                                    id="department"
                                    type="text" name="department" value={formData.department} onChange={handleChange}
                                    aria-label="Department"
                                    aria-required="true"
                                    aria-invalid={!!errors.department}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.department ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all`}
                                />
                                {errors.department && <p className="text-red-500 text-xs mt-1" role="alert">{errors.department}</p>}
                            </div>
                        </div>

                        {/* Row 5 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="needs">Which best describes your needs? <span className="text-red-500" aria-hidden="true">*</span></label>
                            <textarea 
                                id="needs"
                                name="needs" value={formData.needs} onChange={handleChange} rows={4}
                                aria-label="Describe your needs"
                                aria-required="true"
                                aria-invalid={!!errors.needs}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.needs ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none`}
                            ></textarea>
                            {errors.needs && <p className="text-red-500 text-xs mt-1" role="alert">{errors.needs}</p>}
                        </div>

                        {/* Row 6 */}
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

                        {/* Legal Text */}
                        <p className="text-xs text-gray-500 mt-4">
                            By submitting your info in the form above, you agree to our <a href="#" className="text-brand-primary hover:underline">Terms of Use</a> and <a href="#" className="text-brand-primary hover:underline">Privacy Notice</a>. We may use this info to contact you and/or use data from third parties to personalize your experience.
                        </p>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            aria-label="Submit Contact Form"
                            className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform active:scale-[0.99] mt-6"
                        >
                            Submit
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
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <CheckCircle size={32} strokeWidth={3} />
             </div>
             <h2 id="success-title" className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
             <p className="text-gray-600 mb-8">
                Thanks for contacting Coursera. Our sales team will reach out to you in the next 6 hours.
             </p>
             <button 
                onClick={onBack}
                aria-label="Close success message and return to pricing"
                className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
             >
                Close
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSales;
