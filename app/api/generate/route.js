import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { HfInference } from '@huggingface/inference';

export const runtime = 'edge';

const Hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = Hf.textGenerationStream({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: `<|system|>\nYou are a helpful assistant designed to output well-formed JSON.</s>\n<|user|>\n${prompt}</s>\n<|assistant|>`,
      parameters: {
        max_new_tokens: 2000,
        temperature: 0.1,
        top_p: 0.95,
        repetition_penalty: 1.2,
        return_full_text: false,
      },
    });

    const stream = HuggingFaceStream(response);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('[API_ERROR]', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred.' }), { status: 500 });
  }
}