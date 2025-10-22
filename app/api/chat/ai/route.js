export const maxDuration = 60;
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    // Extract chatId and prompt from request body
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Connect to DB and find chat document
    await connectDB();
    const data = await Chat.findOne({ userId, _id: chatId });

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Chat not found",
      });
    }

    // Create user message object
    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };
    data.messages.push(userPrompt);

    // Call OpenRouter API for chat completion
    const completionResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          // Optional headers to identify your app
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "DeepSSK-Clone",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI friend assistant.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    const completion = await completionResponse.json();

    if (!completion.choices || completion.choices.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No response from OpenRouter API",
      });
    }

    const message = completion.choices[0].message;
    message.timestamp = Date.now();

    data.messages.push(message);
    await data.save();

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// chat gpt start//
// export const maxDuration = 60;

// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
// import OpenAI from "openai";

// // ✅ Initialize OpenAI client with OpenRouter setup
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1", // OpenRouter endpoint
//   apiKey: process.env.AI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { userId } = getAuth(req);

//     // Extract chatId and prompt from request body
//     const { chatId, prompt } = await req.json();

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     // ✅ Connect to MongoDB
//     await connectDB();

//     // Find chat document
//     const data = await Chat.findOne({ userId, _id: chatId });
//     if (!data) {
//       return NextResponse.json({
//         success: false,
//         message: "Chat not found",
//       });
//     }

//     // Create user message
//     const userPrompt = {
//       role: "user",
//       content: prompt,
//       timestamp: Date.now(),
//     };

//     data.messages.push(userPrompt);

//     // ✅ Call OpenRouter API for chat completion
//     const completion = await openai.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct", // free, high-quality model
//       messages: [{ role: "user", content: prompt }],
//     });

//     const message = completion.choices[0].message;
//     message.timestamp = Date.now();

//     data.messages.push(message);
//     await data.save();

//     return NextResponse.json({ success: true, data: message });
//   } catch (error) {
//     console.error("AI Route Error:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

//chat gpt

// // Please install OpenAI SDK first: `npm install openai`
// export const maxDuration = 60;
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/dist/types/server";
// import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
// import OpenAI from "openai";

// // Initalize openAI client with deepseek api key and base URL
// const openai = new OpenAI({
//   baseURL: "https://api.deepseek.com",
//   apiKey: process.env.process.env.AI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { userId } = getAuth(req);
//     //Extract chatId and Prombt from the request body
//     const { chaId, prompt } = await req.json();

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         message: "User no authenticated",
//       });
//     }

//     // Find the chat document in the database based on userId and ChatId
//     await connectDB();
//     const data = await Chat.findOne({ userId, _id: chatId });

//     //create a user message object
//     const userPrompt = {
//       role: "user",
//       content: prompt,
//       timestamp: Date.now(),
//     };

//     data.message.push(userPrompt);

//     // Call the deepseek api to get a chat completion
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "deepseek-chat",
//       store: true,
//     });

//     const message = completion.choices[0].message;

//     message.timestamp = Date.now();

//     data.messages.push(message);
//     data.save();

//     return NextResponse.json({ success: true, data: message });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
// // async function main() {
// //   const completion = await openai.chat.completions.create({
// //     messages: [{ role: "system", content: "You are a helpful assistant." }],
// //     model: "deepseek-chat",
// //   });

// //   console.log(completion.choices[0].message.content);
// // }

// // main();
