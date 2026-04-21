import { GoogleGenAI, Type } from "@google/genai";
import { Organisation, Grant, ApplicationDraft } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function matchGrants(org: Organisation, availableGrants: Grant[]): Promise<Grant[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Match this UK organisation to the most relevant grants from the provided list. 
      Use UK English in justifications. Consider the location, postcode, and funding purpose (Capital vs Revenue).
      
      Organisation Info:
      Name: ${org.name}
      Type: ${org.type}
      Mission: ${org.mission}
      Website: ${org.website || 'N/A'}
      Location: ${org.location} (Postcode: ${org.postcode})
      Primary Funding Need: ${org.fundingPurpose}
      Focus: ${org.focusArea}
      
      Grants:
      ${JSON.stringify(availableGrants)}
      
      Return a list of grant IDs that are relevant, sorted by relevance. Also include a brief justification for each match.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              justification: { type: Type.STRING }
            },
            required: ["id", "justification"]
          }
        }
      }
    });

    const matches = JSON.parse(response.text || "[]");
    return matches.map((m: any) => {
      const grant = availableGrants.find(g => g.id === m.id);
      if (grant) {
        return { ...grant, description: `${m.justification} | ${grant.description}` };
      }
      return null;
    }).filter(Boolean) as Grant[];
  } catch (error) {
    console.warn("Gemini API error, using mock fallback matches:", error);
    // Fallback: return all grants with a generic justification
    return availableGrants.map(g => ({
      ...g,
      description: `[MOCK MATCH] Based on your location in ${org.location} (${org.postcode}), this fund remains a high priority match for your ${org.type} mission, specifically for ${org.fundingPurpose} requirements. | ${g.description}`
    }));
  }
}

export async function draftApplication(org: Organisation, grant: Grant): Promise<ApplicationDraft> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft three key sections of a UK grant application for this organisation and grant. 
      Use UK English (e.g., programme, organisation, centre).
      
      Organisation Profile:
      Mission: ${org.mission}
      Website: ${org.website || 'N/A'}
      Location: ${org.location} (${org.postcode})
      Requirement: ${org.fundingPurpose}
      
      Grant Details:
      Title: ${grant.title}
      Description: ${grant.description}
      Category: ${grant.category}
      
      Sections to draft:
      1. Objectives: What the project aims to achieve (using UK terminology).
      2. Outcomes: The measurable impact of the programme.
      3. Budget Narrative: A brief explanation of how the funds (whether capital or revenue) will be utilised.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objectives: { type: Type.STRING },
            outcomes: { type: Type.STRING },
            budgetNarrative: { type: Type.STRING }
          },
          required: ["objectives", "outcomes", "budgetNarrative"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as ApplicationDraft;
  } catch (error) {
    console.warn("Gemini API error, using mock fallback draft:", error);
    return {
      objectives: `The primary objective for ${org.name} is to expand our existing social impact within ${org.location} by leveraging the ${grant.title}. We aim to reach underserved communities and provide direct support (specifically for ${org.fundingPurpose}) aligned with our mission: "${org.mission}".`,
      outcomes: `1. Increased engagement from local residents in ${org.location}.\n2. Successful delivery of 3 new community programmes.\n3. Measurable improvement in social cohesion as evidenced by post-programme surveys.`,
      budgetNarrative: `The requested funds from ${grant.provider} will be strictly allocated to project delivery costs, including necessary capital investments such as ${org.fundingPurpose === 'capital' ? 'machinery and building works' : 'equipment and materials'}, or revenue costs for specialised staff time required to fulfil our mission effectively.`
    };
  }
}
