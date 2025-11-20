
import React, { useState } from 'react';
import { X } from 'lucide-react';

export type AuthModalType = 'login' | 'signup' | 'forgot' | null;

interface AuthModalsProps {
  activeModal: AuthModalType;
  onClose: () => void;
  onSwitch: (modal: AuthModalType) => void;
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LoginModal = ({ onClose, onSwitch }: { onClose: () => void; onSwitch: (m: AuthModalType) => void }) => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Login successful! (Demo)');
      onClose();
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2 className="modal-title">Welcome back</h2>
        <button className="modal-close" onClick={onClose} aria-label="Close modal"><X size={24} /></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email" id="loginEmail"
              value={formData.email}
              onChange={e => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''}); }}
              placeholder="Enter your email address"
              className={errors.email ? 'error' : ''}
            />
            <span className={`error-message ${errors.email ? 'active' : ''}`}>{errors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password" id="loginPassword"
              value={formData.password}
              onChange={e => { setFormData({...formData, password: e.target.value}); if(errors.password) setErrors({...errors, password: ''}); }}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            <span className={`error-message ${errors.password ? 'active' : ''}`}>{errors.password}</span>
          </div>
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox" id="rememberMe"
                checked={formData.rememberMe}
                onChange={e => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <button type="button" className="forgot-password-link" onClick={() => onSwitch('forgot')}>
              Forgot password?
            </button>
          </div>
          <button type="submit" className="auth-button primary">Log In</button>
          <div className="auth-divider"><span>or</span></div>
          <button type="button" className="auth-button google-btn">
            <i className="fab fa-google" style={{ color: '#DB4437' }}></i> Continue with Google
          </button>
          <div className="auth-footer">
            Don't have an account? <button type="button" onClick={() => onSwitch('signup')}>Join for free</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignupModal = ({ onClose, onSwitch }: { onClose: () => void; onSwitch: (m: AuthModalType) => void }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', agreeTerms: false, emailUpdates: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      if(!formData.firstName) newErrors.firstName = 'First name is required';
      if(!formData.lastName) newErrors.lastName = 'Last name is required';
      if(!formData.email) newErrors.email = 'Email is required';
      else if(!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
      if(!formData.password) newErrors.password = 'Password is required';
      else if(formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if(!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms of Use';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
          alert('Account created successfully! (Demo)');
          onClose();
      }
  };

  return (
      <div className="modal-container">
          <div className="modal-header">
              <h2 className="modal-title">Join Coursera for free</h2>
              <button className="modal-close" onClick={onClose} aria-label="Close modal"><X size={24} /></button>
          </div>
          <div className="modal-body">
              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                  <div className="form-row">
                      <div className="form-group half">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" id="firstName" placeholder="First name"
                              value={formData.firstName}
                              onChange={e => { setFormData({...formData, firstName: e.target.value}); if(errors.firstName) setErrors({...errors, firstName: ''}); }}
                              className={errors.firstName ? 'error' : ''}
                          />
                          <span className={`error-message ${errors.firstName ? 'active' : ''}`}>{errors.firstName}</span>
                      </div>
                      <div className="form-group half">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" id="lastName" placeholder="Last name"
                              value={formData.lastName}
                              onChange={e => { setFormData({...formData, lastName: e.target.value}); if(errors.lastName) setErrors({...errors, lastName: ''}); }}
                              className={errors.lastName ? 'error' : ''}
                          />
                          <span className={`error-message ${errors.lastName ? 'active' : ''}`}>{errors.lastName}</span>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="signupEmail">Email</label>
                      <input type="email" id="signupEmail" placeholder="Enter your email address"
                          value={formData.email}
                          onChange={e => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''}); }}
                          className={errors.email ? 'error' : ''}
                      />
                      <span className={`error-message ${errors.email ? 'active' : ''}`}>{errors.email}</span>
                  </div>
                  <div className="form-group">
                      <label htmlFor="signupPassword">Password</label>
                      <input type="password" id="signupPassword" placeholder="Create a password"
                          value={formData.password}
                          onChange={e => { setFormData({...formData, password: e.target.value}); if(errors.password) setErrors({...errors, password: ''}); }}
                          className={errors.password ? 'error' : ''}
                      />
                      <span className={`error-message ${errors.password ? 'active' : ''}`}>{errors.password}</span>
                      <div className="password-requirements"><small>Password must be at least 8 characters long</small></div>
                  </div>
                  <div className="form-group checkbox-group">
                      <label className="checkbox-container">
                          <input type="checkbox" id="agreeTerms" checked={formData.agreeTerms} onChange={e => setFormData({...formData, agreeTerms: e.target.checked})} />
                          <span className="checkmark"></span>
                          I agree to Coursera's <a href="https://www.coursera.org/about/terms" target="_blank" rel="noopener noreferrer" className="terms-link">Terms of Use</a> and <a href="https://www.coursera.org/about/privacy" target="_blank" rel="noopener noreferrer" className="terms-link">Privacy Notice</a>
                      </label>
                      <span className={`error-message ${errors.agreeTerms ? 'active' : ''}`}>{errors.agreeTerms}</span>
                  </div>
                  <div className="form-group checkbox-group">
                      <label className="checkbox-container">
                          <input type="checkbox" id="emailUpdates" checked={formData.emailUpdates} onChange={e => setFormData({...formData, emailUpdates: e.target.checked})} />
                          <span className="checkmark"></span>
                          I would like to receive updates about courses and learning opportunities
                      </label>
                  </div>
                  <button type="submit" className="auth-button primary">Join for Free</button>
                  <div className="auth-divider"><span>or</span></div>
                  <button type="button" className="auth-button google-btn">
                      <i className="fab fa-google" style={{ color: '#DB4437' }}></i> Continue with Google
                  </button>
                  <div className="auth-footer">
                      Already have an account? <button type="button" onClick={() => onSwitch('login')}>Log in</button>
                  </div>
              </form>
          </div>
      </div>
  );
};

const ForgotPasswordModal = ({ onClose, onSwitch }: { onClose: () => void; onSwitch: (m: AuthModalType) => void }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!email) setError('Email is required');
        else if(!validateEmail(email)) setError('Please enter a valid email address');
        else {
            alert('Password reset link sent! (Demo)');
            onClose();
        }
    };

    return (
        <div className="modal-container">
             <div className="modal-header">
                <h2 className="modal-title">Reset your password</h2>
                <button className="modal-close" onClick={onClose} aria-label="Close modal"><X size={24} /></button>
            </div>
            <div className="modal-body">
                <p className="modal-description">Enter your email address and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="resetEmail">Email</label>
                        <input type="email" id="resetEmail" placeholder="Enter your email address"
                             value={email} onChange={e => { setEmail(e.target.value); if(error) setError(''); }}
                             className={error ? 'error' : ''}
                        />
                        <span className={`error-message ${error ? 'active' : ''}`}>{error}</span>
                    </div>
                    <button type="submit" className="auth-button primary">Send Reset Link</button>
                    <div className="auth-footer">
                         Remember your password? <button type="button" onClick={() => onSwitch('login')}>Back to login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AuthModals: React.FC<AuthModalsProps> = ({ activeModal, onClose, onSwitch }) => {
  if (!activeModal) return null;
  return (
    <div className={`auth-modal active`}>
      <div className="modal-overlay" onClick={onClose}></div>
      {activeModal === 'login' && <LoginModal onClose={onClose} onSwitch={onSwitch} />}
      {activeModal === 'signup' && <SignupModal onClose={onClose} onSwitch={onSwitch} />}
      {activeModal === 'forgot' && <ForgotPasswordModal onClose={onClose} onSwitch={onSwitch} />}
    </div>
  );
};

export default AuthModals;
