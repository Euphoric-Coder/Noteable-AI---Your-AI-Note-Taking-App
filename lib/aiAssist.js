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
    4. Also enclose the whole answer in <p> tags.
    5. Before writing the answer, first check if the answer is correct or if it is wrong, then return empty string.
    6. Before the answer, write "<strong>Answer:</strong>"
    7. Also avoid using <ul> and <ol> tags but use multiple <p> tags and enclose the whole answer in <p> tags separately and also use bold (using the <strong> tag) and italics to make it look better.
    8. To highlight topics make sure to use <strong> and <i> tags and also h1 (for the main topic), h2, h3 tags. And for the heading don't enclose them in <p> tags.  
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
