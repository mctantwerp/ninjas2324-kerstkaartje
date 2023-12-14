const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

// const llm = new OpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

dotenv.config(); 

async function getJoke() {
  const model = new ChatOpenAI({});
  const promptTemplate = PromptTemplate.fromTemplate(
    "Tell me a joke about {topic}"
  );

  const chain = promptTemplate.pipe(model);

  const result = await chain.invoke({ topic: "bears" });
  return result.content;
}

app.use(express.json());

// Define your routes
app.get("/", async(req, res) => {
    let joke = await getJoke();
    res.send(' '+joke);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware for parsing JSON bodies

app.post("/user", (req, res) => {
  const { age, gender, hobbies } = req.body;

  // You can now use the age, gender, and hobbies variables in your code.
  // For example, let's just send them back as a JSON response:

  res.json({ age, gender, hobbies });
});
