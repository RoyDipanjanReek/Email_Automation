import "dotenv/config";
import * as z from "zod";
import { createAgent, tool, humanInTheLoopMiddleware } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { gmailEmails } from "./data.js";
import { Command, MemorySaver } from "@langchain/langgraph";
import readline from "node:readline/promises";

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});

// This is tool for get all the relevent emails.
const getEmail = tool(
  () => {
    // todo access gmail apis

    return JSON.stringify(gmailEmails);
  },
  {
    name: "get_Emails",
    description: "Get the emails from inbox.",
  }
);

// This is tool for to do the refund process.
const refund = tool(
  ({ emails }) => {
    // todo access backend apis

    return "All return processed are successfully.";
  },
  {
    name: "refund",
    description: "Process the refund for given emails.",
    schema: z.object({
      emails: z
        .array(z.string())
        .describe("The list of emails which need to be refunded."),
    }),
  }
);

// This is our agent who will all the task on behalf of me using different tools.
const agent = createAgent({
  model: llm,
  tools: [getEmail, refund],
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: {
        refund: true, // All decisions (approve, edit, reject) allowed
      },
      // Prefix for interrupt messages - combined with tool name and args to form the full message
      // e.g., "Tool execution pending approval: execute_sql with query='DELETE FROM...'"
      // Individual tools can override this by specifying a "description" in their interrupt config
      descriptionPrefix: "Refund pending approval",
    }),
  ],
  checkpointer: new MemorySaver(),
});

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let interrupt = [];

  while (true) {
    const query = await rl.question("You: ");

    if (query === "/bye") break;
    const responce = await agent.invoke(
      interrupt.length
        ? new Command({
            resume: {
              [interrupt?.[0]?.id]: {
                decisions: [{ type: query === "1" ? "approve" : "reject" }],
              },
            },
          })
        : {
            messages: [
              {
                role: "user",
                content: query,
              },
            ],
          },
      { configurable: { thread_id: "001" } }
    );

    interrupt = [];
    let output = "";
    if (responce?.__interrupt__?.length) {
      interrupt.push(responce.__interrupt__[0]);

      output +=
        responce.__interrupt__[0].value.actionRequests[0].description + "\n\n";

      output += "Choose:\n";

      output +=
        responce.__interrupt__[0].value.reviewConfigs[0].allowedDecisions
          .filter((decision) => decision !== "edit")
          .map((decision, idx) => `${idx + 1}.  ${decision}`)
          .join("\n");
    } else {
      output += responce.messages[responce.messages.length - 1].content;
    }

    console.log(output);
  }
  rl.close();
}

main();
