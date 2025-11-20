
import React from 'react';
import { 
  Check, Star, Box, Briefcase, GraduationCap, Building2, User,
  Video, FileText, MessageCircle, Smartphone, Infinity, Award, 
  FlaskConical, Download, Target, Landmark, Users, Clock, 
  LayoutDashboard, Settings, TrendingUp, ClipboardCheck, Link, 
  BarChart2, GitBranch, Shield, Server, Wrench, Smile, 
  ShieldCheck, BookOpen, Lock, UserCheck, Database, Zap,
  Layers, Plus, ArrowRight, Rocket, School, DollarSign
} from 'lucide-react';
import { Plan } from '../types';

interface PricingCardProps {
  plan: Plan;
  index: number;
  onContactSales?: () => void;
  onTryFree?: () => void;
}

// Icon configuration type
interface FeatureConfig {
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

const getIcon = (id: string) => {
  if (id.includes('ind')) return User;
  if (id.includes('biz')) return Briefcase;
  if (id.includes('uni')) return GraduationCap;
  if (id.includes('gov')) return Building2;
  return Box;
};

// Helper to determine icon and style based on feature text and plan ID
const getFeatureConfig = (featureText: string, planId: string): FeatureConfig => {
  const text = featureText.toLowerCase();

  // --- UNIVERSITIES TIER SPECIFIC ---
  if (planId.includes('uni')) {
    if (text.includes('unlimited access')) return { icon: BookOpen, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
    if (text.includes('dedicated implementation')) return { icon: Rocket, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('skilltracks')) return { icon: TrendingUp, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
    if (text.includes('campus-wide')) return { icon: School, colorClass: 'text-orange-600', bgClass: 'bg-orange-50' };
    if (text.includes('integration')) return { icon: Link, colorClass: 'text-teal-600', bgClass: 'bg-teal-50' };
    if (text.includes('academic integrity')) return { icon: ShieldCheck, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('student progress')) return { icon: BarChart2, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
    if (text.includes('customer success')) return { icon: Smile, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('faculty training')) return { icon: Users, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
  }

  // --- GOVERNMENT TIER SPECIFIC ---
  if (planId.includes('gov')) {
    if (text.includes('unlimited access')) return { icon: BookOpen, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
    if (text.includes('dedicated implementation')) return { icon: Rocket, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('skilltracks')) return { icon: Award, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
    if (text.includes('compliance')) return { icon: Lock, colorClass: 'text-red-600', bgClass: 'bg-red-50' };
    if (text.includes('bulk licensing')) return { icon: Building2, colorClass: 'text-gray-600', bgClass: 'bg-gray-100' };
    if (text.includes('specialized training')) return { icon: Target, colorClass: 'text-orange-600', bgClass: 'bg-orange-50' };
    if (text.includes('government pricing')) return { icon: DollarSign, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('customer success')) return { icon: Smile, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
    if (text.includes('data privacy')) return { icon: Shield, colorClass: 'text-red-600', bgClass: 'bg-red-50' };
  }

  // --- INDIVIDUAL - Free ---
  if (text.includes('audit courses') || text.includes('bachelor')) {
    return { icon: GraduationCap, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('course materials') || text.includes('videos')) {
    return { icon: Video, colorClass: 'text-red-500', bgClass: 'bg-red-50' };
  }
  if (text.includes('basic learning tools') || text.includes('quizzes')) {
    return { icon: FileText, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  if (text.includes('discussion forums')) {
    return { icon: MessageCircle, colorClass: 'text-orange-500', bgClass: 'bg-orange-50' };
  }
  if (text.includes('mobile app')) {
    return { icon: Smartphone, colorClass: 'text-blue-500', bgClass: 'bg-blue-50' };
  }

  // --- INDIVIDUAL - Plus & Degrees ---
  if (text.includes('unlimited access')) {
    return { icon: Infinity, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('earn certificates')) {
    return { icon: Award, colorClass: 'text-yellow-600', bgClass: 'bg-yellow-50' };
  }
  if (text.includes('hands-on projects')) {
    return { icon: FlaskConical, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  if (text.includes('download courses')) {
    return { icon: Download, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('goal-setting')) {
    return { icon: Target, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
  }
  if (text.includes('university credit')) {
    return { icon: Landmark, colorClass: 'text-blue-700', bgClass: 'bg-blue-50' };
  }
  if (text.includes('academic support')) {
    return { icon: Users, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  if (text.includes('flexible scheduling')) {
    return { icon: Clock, colorClass: 'text-orange-500', bgClass: 'bg-orange-50' };
  }
  if (text.includes('career services') || text.includes('job placement')) {
    return { icon: Briefcase, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
  }

  // --- TEAMS & ENTERPRISE ---
  if (text.includes('team dashboard')) {
    return { icon: LayoutDashboard, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('admin tools')) {
    return { icon: Settings, colorClass: 'text-gray-600', bgClass: 'bg-gray-100' };
  }
  if (text.includes('bulk enrollment')) {
    return { icon: Users, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  if (text.includes('skills assessment')) {
    return { icon: ClipboardCheck, colorClass: 'text-purple-600', bgClass: 'bg-purple-50' };
  }
  if (text.includes('integration') || text.includes('api access')) {
    return { icon: Link, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('dedicated implementation') || text.includes('onboarding')) {
    return { icon: UserCheck, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  if (text.includes('skilltracks')) {
    return { icon: TrendingUp, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
  }
  if (text.includes('advanced analytics')) {
    return { icon: BarChart2, colorClass: 'text-blue-700', bgClass: 'bg-blue-50' };
  }
  if (text.includes('custom learning paths')) {
    return { icon: GitBranch, colorClass: 'text-orange-600', bgClass: 'bg-orange-50' };
  }
  if (text.includes('single sign-on') || text.includes('sso')) {
    return { icon: Shield, colorClass: 'text-red-600', bgClass: 'bg-red-50' };
  }
  if (text.includes('customer success manager')) {
    return { icon: Smile, colorClass: 'text-green-600', bgClass: 'bg-green-50' };
  }
  
  // Section Headers / Misc
  if (text.startsWith('everything in')) {
    return { icon: Layers, colorClass: 'text-gray-500', bgClass: 'bg-gray-100' };
  }

  // Fallback
  return { icon: Check, colorClass: 'text-blue-600', bgClass: 'bg-blue-50' };
};

const PricingCard: React.FC<PricingCardProps> = ({ plan, index, onContactSales, onTryFree }) => {
  const Icon = getIcon(plan.id);
  
  return (
    <div 
      className={`pricing-card group ${plan.isPopular ? 'ring-2 ring-brand-primary/10' : ''}`}
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      {plan.isPopular && (
        <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-widest z-10 shadow-lg shadow-blue-900/20">
          Most Popular
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-6">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm
            ${plan.isPopular ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-50 text-gray-600'}
          `} aria-hidden="true">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="card-title">{plan.title}</h3>
          <div className="min-h-[50px]">
             <p className="card-subtitle">{plan.description}</p>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-8 min-h-[48px] flex flex-col justify-end">
          <div className="flex items-baseline">
            <span className="price-display">{plan.price || 'Custom'}</span>
            {plan.period && <span className="price-period">{plan.period}</span>}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <button
            aria-label={`${plan.ctaText} - ${plan.title} Plan`}
            onClick={() => {
              if (plan.ctaText === 'Contact Sales' && onContactSales) {
                onContactSales();
              } else if ((plan.ctaText === 'Try for Free' || plan.ctaText === 'Get Started') && onTryFree) {
                onTryFree();
              }
            }}
            className={`cta-button ${
                plan.ctaText === 'Contact Sales' 
                    ? 'secondary' 
                    : plan.ctaText === 'Get Started' && !plan.isPopular 
                        ? 'secondary'
                        : 'primary'
            }`}
          >
            {plan.ctaText}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-8"></div>

        {/* Features */}
        <div className="space-y-3 flex-grow">
          {plan.features.map((feature, idx) => {
            const isHeader = feature.toLowerCase().startsWith('everything in');
            const config = getFeatureConfig(feature, plan.id);
            const FeatureIcon = config.icon;

            return (
              <div 
                key={idx} 
                className={`
                  enhanced-feature-item flex items-center
                  ${isHeader ? 'mt-4 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-100' : ''}
                `}
                style={{ animationDelay: `${0.3 + (idx * 0.05)}s` }}
              >
                <div 
                  className={`
                    feature-icon-container flex-shrink-0
                    ${isHeader ? 'bg-transparent !w-auto !h-auto !mr-3' : config.bgClass}
                  `} 
                  aria-hidden="true"
                >
                  <FeatureIcon 
                    size={isHeader ? 18 : 16} 
                    className={config.colorClass} 
                    strokeWidth={isHeader ? 2.5 : 2} 
                  />
                </div>
                <span 
                  className={`
                    text-[15px] leading-relaxed transition-colors duration-200
                    ${isHeader ? 'font-bold text-gray-900' : 'font-medium text-gray-600 group-hover:text-gray-900'}
                  `}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .enhanced-feature-item {
          animation: slideInUp 0.5s ease forwards;
          opacity: 0;
        }
        .enhanced-feature-item:hover .feature-icon-container {
            transform: scale(1.1) rotate(5deg);
        }
        .feature-icon-container {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PricingCard;
