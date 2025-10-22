import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Connect to DB and delete chat by ID and user ID
    await connectDB();
    await Chat.deleteOne({ _id: chatId, userId });

    return NextResponse.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

//chat gpt
// import { NextResponse } from "next/server";
// import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { chatId, action } = await req.json();

//     if (!chatId) {
//       return NextResponse.json({
//         success: false,
//         message: "chatId is required",
//       });
//     }

//     if (action !== "delete") {
//       return NextResponse.json({
//         success: false,
//         message: "Invalid action",
//       });
//     }

//     // Generate AI response confirming deletion
//     const response = await openrouter.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//           role: "user",
//           content: `I want to delete the chat with id ${chatId}. Confirm in a polite way.`,
//         },
//       ],
//       max_tokens: 150,
//       temperature: 0.7,
//     });

//     return NextResponse.json({
//       success: true,
//       message: response.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

// youtube
// import connectDB from "@/config/db";
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/dist/types/server";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { userId } = getAuth(req);
//     const { chatId } = await req.json();

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }
//     //connect the database and delete the chat
//     await connectDB()
//     await Chat.deleteOne({_id:chatId, userId})

//     return NextResponse.json({success:true, message:"chat deleted"})

//   } catch (error) {

//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
