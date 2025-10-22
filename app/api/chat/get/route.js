import { NextResponse } from "next/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET(req) {
  try {
    // Extract 'prompt' query parameter, defaulting if missing
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get("prompt") || "Say hello to the user";

    // Call Mistral-7B-Instruct model via OpenRouter SDK
    const response = await openrouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      data: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenRouter GET route error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// import { NextResponse } from "next/server";
// import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// export async function GET(req) {
//   try {
//     // Example: get a query parameter from the request
//     const { searchParams } = new URL(req.url);
//     const prompt = searchParams.get("prompt") || "Say hello to the user";

//     // Call Mistral-7B-Instruct via OpenRouter
//     const response = await openrouter.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 300,
//       temperature: 0.7,
//     });

//     return NextResponse.json({
//       success: true,
//       data: response.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

// import connectDB from "@/config/db";
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/dist/types/server";
// // import { getAuth } from "@clerk/nextjs/server";

// import { NextResponse } from "next/server";

// export async function GEt(req) {
//     try{

//         const {userId} = getAuth(req);

//         if(!userId){
//             return NextResponse.json({
//                 success:false,
//                 message:"User not authenticated"
//             })
//         }
//         // Connect to the database and fetch all chats for the user
//         await connectDB()
//         const data = await Chat.find({userId});

//         return NextResponse.json({success:true, data})

//     }catch(error){
//         return NextResponse.json({success:false, error:error.message})
//     }
// }
