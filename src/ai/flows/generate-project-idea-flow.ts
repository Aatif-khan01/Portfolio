'use server';
/**
 * @fileOverview A Genkit flow for generating innovative AI/ML project ideas.
 *
 * - generateProjectIdea - A function that generates a project idea based on current ML trends.
 * - GenerateProjectIdeaInput - The input type for the generateProjectIdea function.
 * - GenerateProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProjectIdeaInputSchema = z
  .object({
    keywords: z
      .array(z.string())
      .optional()
      .describe(
        'Optional keywords or themes to guide the project idea generation.'
      ),
  })
  .describe('Input for generating an AI/ML project idea.');
export type GenerateProjectIdeaInput = z.infer<
  typeof GenerateProjectIdeaInputSchema
>;

const GenerateProjectIdeaOutputSchema = z
  .object({
    title: z
      .string()
      .describe('A concise and engaging title for the project idea.'),
    description: z
      .string()
      .describe(
        'A detailed description of the project, including its purpose, problem it solves, and how it leverages AI/ML.'
      ),
    technologies: z
      .array(z.string())
      .describe(
        'A list of key technologies and frameworks that would be used in this project (e.g., TensorFlow, PyTorch, Hugging Face, Next.js, Firebase).'
      ),
    mlTrends: z
      .array(z.string())
      .describe(
        'A list of current machine learning trends that the project incorporates (e.g., Generative AI, Explainable AI, Reinforcement Learning, Federated Learning, MLOps, LLMs).'
      ),
    potentialImpact: z
      .string()
      .describe(
        'The potential impact or benefit of this project, highlighting its innovation and relevance.'
      ),
  })
  .describe('Output schema for a generated AI/ML project idea.');
export type GenerateProjectIdeaOutput = z.infer<
  typeof GenerateProjectIdeaOutputSchema
>;

export async function generateProjectIdea(
  input: GenerateProjectIdeaInput
): Promise<GenerateProjectIdeaOutput> {
  return generateProjectIdeaFlow(input);
}

const generateProjectIdeaPrompt = ai.definePrompt({
  name: 'generateProjectIdeaPrompt',
  input: { schema: GenerateProjectIdeaInputSchema },
  output: { schema: GenerateProjectIdeaOutputSchema },
  prompt: `You are an expert AI/ML project idea generator. Your goal is to create innovative, high-impact project ideas for an AI/ML engineer, focusing on current machine learning trends and technologies.

Generate a project idea based on the following considerations:
{{#if keywords}}
Keywords to incorporate: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

Ensure the project idea is professional, cinematic, research-focused, and reflects an elite-level AI engineer identity.

Output the idea in a structured JSON format with the following fields:
- title: A concise and engaging title for the project idea.
- description: A detailed description of the project, including its purpose, problem it solves, and how it leverages AI/ML.
- technologies: A list of key technologies and frameworks that would be used in this project (e.g., TensorFlow, PyTorch, Hugging Face, Next.js, Firebase).
- mlTrends: A list of current machine learning trends that the project incorporates (e.g., Generative AI, Explainable AI, Reinforcement Learning, Federated Learning, MLOps, LLMs).
- potentialImpact: The potential impact or benefit of this project, highlighting its innovation and relevance.`,
});

const generateProjectIdeaFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeaFlow',
    inputSchema: GenerateProjectIdeaInputSchema,
    outputSchema: GenerateProjectIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await generateProjectIdeaPrompt(input);
    return output!;
  }
);
