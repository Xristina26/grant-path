export interface Organisation {
  name: string;
  type: 'charity' | 'social-enterprise' | 'sme' | 'community-group' | 'other';
  mission: string;
  location: string;
  postcode: string;
  website?: string;
  fundingPurpose: 'capital' | 'revenue' | 'project-specific' | 'mixed';
  focusArea: string;
}

export interface Grant {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  locationFocus?: string;
  category: 'Environment' | 'Community' | 'Arts & Culture' | 'Innovation' | 'Health';
  url: string;
}

export interface ApplicationDraft {
  objectives: string;
  outcomes: string;
  budgetNarrative: string;
}
