import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req) => {
    try {
        const { topic, prompt } = await req.json();
        const response = await openai.chat.completions.create({
            model: process.env.GPT_MODEL,
            messages: [{
                role: 'user',
                content: `"You are an intelligent assistant tasked with verifying whether a provided prompt is clearly related to a specific topic and understandable to humans. Your response should follow this format:
                        Answer with 'True' if the prompt is related to the topic and understandable to humans.
                        If the answer is 'False', explain why the prompt is either unrelated to the topic, unclear, or both.
                        Here is the input:
                        Topic: ${topic}
                        Prompt: ${prompt}

                        Respond only with 'true' or 'false' followed by the next line of an explanation if 'False'."`
            }],
        });
        console.log(response.choices[0].message.content);
        return new Response (JSON.stringify(response.choices[0].message.content), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to connect to openAI", {
            status: 500
        })
    }
}