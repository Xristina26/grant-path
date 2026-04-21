import { Grant } from './types';

export const SAMPLE_GRANTS: Grant[] = [
  {
    id: '2',
    title: 'National Lottery Awards for All',
    provider: 'The National Lottery Community Fund',
    amount: '£300 – £20,000',
    deadline: 'Open',
    description: 'Support for projects that bring people together and build strong relationships in across communities. This is primarily revenue funding for activities and community-led events.',
    eligibility: ['Not-for-profit organisations', 'Community-led projects', 'Local impact'],
    locationFocus: 'UK Wide',
    category: 'Community',
    url: 'https://www.tnlcommunityfund.org.uk/funding/programmes/national-lottery-awards-for-all-england'
  },
  {
    id: '3',
    title: 'Arts Council National Lottery Project Grants',
    provider: 'Arts Council England',
    amount: '£1,000 – £100,000',
    deadline: 'Always Open',
    description: 'Funding for arts, museums and libraries projects that benefit people in England and help achieve the "Lets Create" strategy.',
    eligibility: ['Individual artists', 'Community organisations', 'Cultural venues'],
    locationFocus: 'England',
    category: 'Arts & Culture',
    url: 'https://www.artscouncil.org.uk/ProjectGrants'
  },
  {
    id: '4',
    title: 'Esmee Fairbairn Foundation',
    provider: 'Esmee Fairbairn Foundation',
    amount: 'Over £50,000',
    deadline: 'Rolling',
    description: 'Support for organisations working to change the UK food system for the better, focusing on health, sustainability and equity.',
    eligibility: ['Registered Charities', 'Social Enterprises'],
    locationFocus: 'UK Wide',
    category: 'Environment',
    url: 'https://esmeefairbairn.org.uk/'
  },
  {
    id: '5',
    title: 'London Plus Funding Opportunities',
    provider: 'London Plus',
    amount: 'Multiple Tiers',
    deadline: 'March 2025',
    description: 'A curated list of funding opportunities specifically for charities and community groups operating within Greater London.',
    eligibility: ['London-based organisations', 'Third sector', 'Community impact'],
    locationFocus: 'London',
    category: 'Health',
    url: 'https://londonplus.org/funding-for-charities-and-community-groups-march-2025/'
  },
  {
    id: '6',
    title: 'Government Grant Service',
    provider: 'UK Government',
    amount: 'Varies by Grant',
    deadline: 'Multiple Deadlines',
    description: 'Search the official government portal for all active grants available to individuals, small businesses, and charities across the UK.',
    eligibility: ['UK Residents', 'SMEs', 'Charities'],
    locationFocus: 'UK Wide',
    category: 'Innovation',
    url: 'https://www.find-government-grants.service.gov.uk/grants'
  },
  {
    id: '7',
    title: 'Kings Trust Business Funding',
    provider: 'The Kings Trust',
    amount: 'Startup Loans & Grants',
    deadline: 'Rolling',
    description: 'Support for young entrepreneurs and small businesses to get off the ground with financial aid and mentorship.',
    eligibility: ['Young entrepreneurs', 'Startups', 'UK based'],
    locationFocus: 'UK Wide',
    category: 'Innovation',
    url: 'https://www.kingstrust.org.uk/how-we-can-help/support-starting-business/funding-your-business'
  },
  {
    id: '8',
    title: 'Grow London Local',
    provider: 'Grow London Local',
    amount: 'Varies',
    deadline: 'Ongoing',
    description: 'Access to financial support and resources specifically tailored for small businesses in London.',
    eligibility: ['London SMEs', 'Micro-businesses'],
    locationFocus: 'London',
    category: 'Innovation',
    url: 'https://www.growlondonlocal.london/money/'
  }
];
