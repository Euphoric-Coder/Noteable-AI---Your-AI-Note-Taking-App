const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const aiAssist = async (query, answer) => {
  const prompt = `
    For the Question "${query}", and the given Answer "${answer}", please provide a structured answer in HTML format only and no more than the answer itself.
    `;
  const result = await model.generateContent(prompt);

  console.log(prompt, answer);
  console.log(result.response.text());
  return result.response
    .text()
    .replace(/\n/g, "")
    .replace("```", "")
    .replace("html", "");
};
