
export enum TierCategory {
  INDIVIDUAL = 'Individual',
  BUSINESS = 'Teams & Enterprise',
  UNIVERSITY = 'Universities',
  GOVERNMENT = 'Government',
}

export interface Plan {
  id: string;
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  highlightColor?: string;
}

export interface CategoryData {
  id: TierCategory;
  title: string;
  summaryPrice: string;
  summaryCta: string;
  plans: Plan[];
}
