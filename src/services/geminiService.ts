import { Organisation, Grant, ApplicationDraft } from "../types";

// PROTOTYPE MODE: This service uses local logic to simulate AI capabilities for demonstration purposes.
// No API keys are required for this prototype to function.

export async function matchGrants(org: Organisation, availableGrants: Grant[]): Promise<Grant[]> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Prototype logic: Filter grants that somewhat match the organisation focus or type
  // In a real app, this would be a semantic LLM call.
  return availableGrants.map(g => {
    const isHighMatch = 
      g.category.toLowerCase().includes(org.type.toLowerCase()) || 
      org.mission.toLowerCase().includes(g.category.toLowerCase()) ||
      g.locationFocus.toLowerCase() === 'uk wide';

    return {
      ...g,
      description: isHighMatch 
        ? `[AI MATCH] Based on your ${org.type} focus in ${org.location}, this fund remains a high priority match. | ${g.description}`
        : `[RELEVANT] While not a direct match for ${org.type}, the scope of this fund covers your project needs. | ${g.description}`
    };
  });
}

export async function draftApplication(org: Organisation, grant: Grant): Promise<ApplicationDraft> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    objectives: `The primary objective for ${org.name} is to expand our existing social impact within ${org.location} by leveraging the ${grant.title}. We aim to reach underserved communities and provide direct support (specifically for ${org.fundingPurpose}) aligned with our mission: "${org.mission}".`,
    outcomes: `1. Increased engagement from local residents in ${org.location}.\n2. Successful delivery of 3 new community programmes.\n3. Measurable improvement in social cohesion as evidenced by post-programme surveys.`,
    budgetNarrative: `The requested funds from ${grant.provider} will be strictly allocated to project delivery costs, including necessary capital investments such as ${org.fundingPurpose === 'capital' ? 'machinery and building works' : 'equipment and materials'}, or revenue costs for specialised staff time required to fulfil our mission effectively.`
  };
}
