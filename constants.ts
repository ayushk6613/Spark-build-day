
import { TierCategory, CategoryData } from './types';

export const PRICING_DATA: CategoryData[] = [
  {
    id: TierCategory.INDIVIDUAL,
    title: 'Individual',
    summaryPrice: '',
    summaryCta: '',
    plans: [
      {
        id: 'ind-free',
        title: 'Free',
        price: '$0',
        period: '',
        description: 'Start learning for free',
        features: [
          'Audit courses from top universities',
          'Access to course materials and videos',
          'Basic learning tools and quizzes',
          'Community discussion forums',
          'Mobile app access'
        ],
        ctaText: 'Try for Free',
        isPopular: false
      },
      {
        id: 'ind-plus',
        title: 'Coursera Plus',
        price: '$150',
        period: '/ month',
        description: 'Unlimited learning experience',
        features: [
          'Everything in Free, plus:',
          'Unlimited access to 16,000+ courses',
          'Earn certificates and specializations',
          'Hands-on projects and labs',
          'Download courses for offline learning',
          'Goal-setting and progress tracking'
        ],
        ctaText: 'Get Started',
        isPopular: true
      },
      {
        id: 'ind-degree',
        title: 'Coursera Degrees',
        price: '$10,000',
        period: '',
        description: 'Earn a university degree',
        features: [
          'Full bachelor’s and master’s degree programs',
          'Unlimited access to 16,000+ courses',
          'University credit and accreditation',
          'Academic support and advising',
          'Flexible scheduling for working professionals',
          'Career services and job placement support'
        ],
        ctaText: 'Try for Free',
        isPopular: false
      }
    ]
  },
  {
    id: TierCategory.BUSINESS,
    title: 'Team & Enterprise',
    summaryPrice: '',
    summaryCta: '',
    plans: [
      {
        id: 'biz-teams',
        title: 'Teams',
        price: '$259',
        period: '/ month',
        description: 'Perfect for growing teams',
        features: [
          'Unlimited access to 16,000+ courses for learners',
          'Dedicated onboarding support',
          'SkillTracks and Professional Certificates',
          'Team dashboard and progress tracking',
          'Admin tools for user management',
          'Bulk enrollment and reporting',
          'Skills assessment and gap analysis',
          'Integration with HR systems'
        ],
        ctaText: 'Get Started',
        isPopular: false
      },
      {
        id: 'biz-enterprise',
        title: 'Enterprise',
        price: '',
        period: '',
        description: 'Advanced solutions for large organizations',
        features: [
          'Everything in Teams, plus:',
          'Dedicated implementation support',
          'SkillTracks and Professional Certificates',
          'Advanced analytics and insights',
          'Custom learning paths and content',
          'Single sign-on (SSO) integration',
          'Dedicated customer success manager',
          'API access for enterprise systems'
        ],
        ctaText: 'Contact Sales',
        isPopular: true
      }
    ]
  },
  {
    id: TierCategory.UNIVERSITY,
    title: 'Universities',
    summaryPrice: '',
    summaryCta: '',
    plans: [
      {
        id: 'uni-standard',
        title: 'Universities',
        price: '',
        period: '',
        description: 'Comprehensive academic solutions',
        features: [
          'Unlimited access to 16,000+ courses for learners',
          'Dedicated implementation support',
          'SkillTracks and Professional Certificates',
          'Campus-wide access for all students',
          'Integration with learning management systems',
          'Academic integrity tools',
          'Student progress analytics',
          'Dedicated customer success manager',
          'Faculty training and support'
        ],
        ctaText: 'Contact Sales',
        isPopular: false
      }
    ]
  },
  {
    id: TierCategory.GOVERNMENT,
    title: 'Government',
    summaryPrice: '',
    summaryCta: '',
    plans: [
      {
        id: 'gov-standard',
        title: 'Government',
        price: '',
        period: '',
        description: 'Secure solutions for public sector',
        features: [
          'Unlimited access to 16,000+ courses for learners',
          'Dedicated implementation support',
          'SkillTracks and Professional Certificates',
          'Compliance with security standards',
          'Bulk licensing for large organizations',
          'Specialized training programs',
          'Government pricing and procurement',
          'Dedicated customer success manager',
          'Data privacy and security controls'
        ],
        ctaText: 'Contact Sales',
        isPopular: false
      }
    ]
  }
];

export const FOOTER_LINKS = {
  coursera: [
    { text: 'About', url: 'https://about.coursera.org' },
    { text: 'What we offer', url: 'https://about.coursera.org/how-coursera-works/' },
    { text: 'Leadership', url: 'https://about.coursera.org/leadership' },
    { text: 'Careers', url: 'https://careers.coursera.com' },
    { text: 'Catalog', url: 'https://www.coursera.org/browse' },
    { text: 'Coursera Plus', url: 'https://www.coursera.org/courseraplus' },
    { text: 'Professional Certificates', url: 'https://www.coursera.org/professional-certificates' },
    { text: 'MasterTrack® Certificates', url: 'https://www.coursera.org/mastertrack' },
    { text: 'Degrees', url: 'https://www.coursera.org/degrees' },
    { text: 'For Enterprise', url: 'https://www.coursera.org/business' },
    { text: 'For Government', url: 'https://www.coursera.org/government' },
    { text: 'For Campus', url: 'https://www.coursera.org/campus' },
    { text: 'Become a Partner', url: 'https://www.coursera.org/partnerships' },
    { text: 'Social Impact', url: 'https://www.coursera.org/social-impact' },
    { text: 'Free Courses', url: 'https://www.coursera.org/courses?query=free' },
    { text: 'Share your Coursera learning story', url: 'https://airtable.com/appxSsG2Dz9CjSpF8/pagCDDP2Uinw59CNP/form' }
  ],
  community: [
    { text: 'Learners', url: 'https://www.coursera.support/s/community' },
    { text: 'Partners', url: 'https://www.coursera.org/partners' },
    { text: 'Beta Testers', url: 'https://www.coursera.org/beta-testers' },
    { text: 'Blog', url: 'https://blog.coursera.org' },
    { text: 'The Coursera Podcast', url: 'https://open.spotify.com/show/58M36bneU7REOofdPZxe6A' },
    { text: 'Tech Blog', url: 'https://medium.com/coursera-engineering' }
  ],
  more: [
    { text: 'Press', url: 'https://about.coursera.org/press' },
    { text: 'Investors', url: 'https://investor.coursera.com/overview/default.aspx' },
    { text: 'Terms', url: 'https://www.coursera.org/about/terms' },
    { text: 'Privacy', url: 'https://www.coursera.org/about/privacy' },
    { text: 'Help', url: 'https://www.coursera.support/s/learner-help-center' },
    { text: 'Accessibility', url: 'https://www.coursera.support/s/article/learner-000001052' },
    { text: 'Contact', url: 'https://about.coursera.org/contact/' },
    { text: 'Articles', url: 'https://www.coursera.org/articles' },
    { text: 'Directory', url: 'https://www.coursera.org/directory' },
    { text: 'Affiliates', url: 'https://about.coursera.org/affiliates' },
    { text: 'Modern Slavery Statement', url: 'https://coursera_assets.s3.amazonaws.com/footer/Modern+Slavery+Statement+(approved+March+26%2C+2025).pdf' },
    { text: 'Manage Cookie Preferences', url: '#' }
  ]
};

export const SOCIAL_LINKS = [
  { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/Coursera', label: 'Facebook' },
  { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/coursera', label: 'LinkedIn' },
  { icon: 'fab fa-x-twitter', url: 'https://x.com/coursera', label: 'X (Twitter)' },
  { icon: 'fab fa-youtube', url: 'https://www.youtube.com/user/coursera', label: 'YouTube' },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/coursera/', label: 'Instagram' },
  { icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@coursera', label: 'TikTok' }
];
