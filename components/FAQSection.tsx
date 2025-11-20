
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What's the difference between the Team and Enterprise plans?",
    answer: "Coursera for Teams is for groups of 5 to 125 people and offers our full catalog of courses, customization tools like learning paths, translations and an interactive AI guide for learners, and tracking features. Designed for organizations with over 125 users, our Enterprise plan offers even more. It includes AI-assisted custom course building, dedicated customer success managers (with a minimum annual contract), and enterprise-level integrations for an extra fee."
  },
  {
    question: "What's the difference between Coursera for Teams and Coursera Plus?",
    answer: "Coursera Plus is a subscription for individuals seeking flexible learning. Coursera for Teams helps businesses train their employees with features like skill tracking and proficiency testing, as well as access to a library of almost 200,000 short videos and labs."
  },
  {
    question: "Can my employees learn in languages other than English?",
    answer: "Yes, Coursera provides content in 54 languages, with over 4,000 courses available in 20 languages."
  },
  {
    question: "What is the pricing structure for these plans?",
    answer: "Coursera's Team plan for 5 to 125 users is priced at $259 per user annually. Pricing for Enterprise plans for 125+ users requires consultation with one of our advisors. Many customers consider the Enterprise plan as it features personalized support from our solution consulting team and a dedicated customer success manager (annual contract value threshold must be met). Coursera can also help with integrations and configurations—such as SSO and LMS—for customers who work with other vendors."
  },
  {
    question: "Does Coursera partner with other LMS/LXP providers?",
    answer: "Yes, we integrate with over 30 popular LMS and LXP systems. Our Enterprise Solutions team can assist with any custom integrations."
  },
  {
    question: "What courses and content does Coursera for Business provide?",
    answer: "With Coursera for Business, your organization will gain access to thousands of courses on topics such as data science, business, technology, and generative AI from experts like Microsoft, Google, and AWS. Our Enterprise plan also includes advanced tools like the AI-assisted Course Builder for creating custom learning experiences tailored to your team's specific needs."
  },
  {
    question: "Can I customize Coursera to fit my company's needs?",
    answer: "Yes, you can create custom courses and add content from Coursera partners. You can assign specific content to employees and track their skill development."
  },
  {
    question: "What are my payment options for Coursera for Teams? Can I pay by invoice?",
    answer: "We accept payment via credit card and PayPal. If you purchase more than 25 licenses, you can also pay by invoice."
  },
  {
    question: "Does Coursera offer free or discounted licenses for nonprofits?",
    answer: "Coursera is committed to supporting non-profit organizations working to make a positive impact on the world and their communities. We provide a 25% discount to registered nonprofit organizations purchasing 5-100 licenses. This discount is available to certified non-profit organizations or international charity equivalents that purchase Coursera for Teams licenses via our website. Coursera reserves the right to change any terms at any time without prior notice. Such terms shall be effective immediately upon posting on the website."
  },
  {
    question: "I'm an employee. How can I request my employer to provide me access to Coursera?",
    answer: "Explain how Coursera's courses can help you develop your skills and contribute to your role. Suggest that your employer try the 14-day money-back guarantee to evaluate the benefits. For more details, they can learn about Coursera for Teams."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <h2 
        id="faq-title" 
        className="faq-title"
      >
        Frequently Asked Questions
      </h2>

      <div className="faq-container">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`faq-item ${isOpen ? 'active' : ''} ${index === 0 ? 'featured' : ''}`}
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="faq-question-container"
                role="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFAQ(index);
                    }
                }}
              >
                <h3 className="faq-question">
                  {item.question}
                </h3>
                <span className="faq-toggle-icon" aria-hidden="true">+</span>
              </div>

              <div 
                id={`faq-answer-${index}`}
                className={`faq-answer ${isOpen ? 'active' : ''}`}
                role="region"
              >
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
