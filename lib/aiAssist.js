const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// What is the eligibility criteria for the bsc. honours programme?
export const aiAssist = async (query, answer) => {
  const prompt = `
  Question Asked: "${query}"
  Given the following answer: "${answer}"
  Generate a structured and detailed answer in HTML format for TipTap Editor
  The answer should be relevant to the question and must not contain any incorrect or irrelevant information.
  If the answer is not relevant or incorrect, Then return an empty string.
  Instructions:
    IMPORTANT NOTE:
    1. The answer should be in HTML format only and always start with a new line i.e. </ br> tag.
    2. The answer should not contain any other text.
    3. If the answer is only a number then return empty string.
    5. Before writing the answer, first check if the answer is correct or if it is wrong, then return empty string.
    6. Before the answer, write in this format only:"<strong>Answer:</strong>"
    7. Also avoid using <ul> and <ol> tags but use multiple <p> tags and enclose the whole answer in <p> tags separately and also use bold (using the <strong> tag) and italics to make it look better and also use numbers to define any point in the answer with a line space.
    8. Also keep in mind that each <p> tag is a separate paragraph or line in TipTap which may lead to spacing issues. 
    9. To highlight topics make sure to use <strong> and <i> tags and also h1 (for the main topic), h2, h3 tags. And for the heading don't enclose them in <p> tags.  
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
