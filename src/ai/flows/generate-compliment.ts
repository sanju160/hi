// use server'
'use server';

/**
 * @fileOverview Generates compliments about Niharika based on an uploaded image.
 *
 * - generateCompliment - A function that handles the compliment generation process.
 * - GenerateComplimentInput - The input type for the generateCompliment function.
 * - GenerateComplimentOutput - The return type for the generateCompliment function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateComplimentInputSchema = z.object({
  imageUrl: z.string().describe('The URL of the image of Niharika.'),
});
export type GenerateComplimentInput = z.infer<typeof GenerateComplimentInputSchema>;

const GenerateComplimentOutputSchema = z.object({
  compliment: z.string().describe('A compliment about Niharika based on the image.'),
});
export type GenerateComplimentOutput = z.infer<typeof GenerateComplimentOutputSchema>;

export async function generateCompliment(input: GenerateComplimentInput): Promise<GenerateComplimentOutput> {
  return generateComplimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComplimentPrompt',
  input: {
    schema: z.object({
      imageUrl: z.string().describe('The URL of the image of Niharika.'),
    }),
  },
  output: {
    schema: z.object({
      compliment: z.string().describe('A compliment about Niharika based on the image.'),
    }),
  },
  prompt: `You are a professional compliment generator. Generate a single, thoughtful and genuine compliment about Niharika based on the provided image. Be specific and focus on details visible in the image.

Image: {{media url=imageUrl}}

Compliment: `,
});

const generateComplimentFlow = ai.defineFlow<
  typeof GenerateComplimentInputSchema,
  typeof GenerateComplimentOutputSchema
>({
  name: 'generateComplimentFlow',
  inputSchema: GenerateComplimentInputSchema,
  outputSchema: GenerateComplimentOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
