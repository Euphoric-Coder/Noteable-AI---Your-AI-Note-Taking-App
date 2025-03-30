const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// What is the eligibility criteria for the bsc. honours programme?
export const aiAssist = async (query, answer) => {
  const prompt = `
    For the Question "${query}", and the given Answer "${answer}", please provide a structured answer in HTML format only and no more than the answer itself.
    And see to the answer is not garbage and not wrong and matching the question. Otherwise return empty string.
    IMPORTANT NOTE:
    1. The answer should be in HTML format only.
    2. The answer should not contain any other text.
    3. If the answer is only a number then return empty string.
    `;
  const result = await model.generateContent(prompt);

  console.log(prompt, answer);
  console.log(result.response.text());
  return result.response
    .text()
    .replace(/\n/g, "")
    .replace("html", "")
    .replace("```", "");
};
