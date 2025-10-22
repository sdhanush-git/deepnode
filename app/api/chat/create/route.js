import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Prepare the chat data to store in the database
    const chatData = {
      userId,
      messages: [], // corrected 'message' to 'messages' to match your other code
      name: "New Chat", // corrected typo from 'New Chart' to 'New Chat'
    };

    // Connect to the database and create a new chat document
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({ success: true, message: "Chat created!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// Youtube
// import connectDB from "@/config/db";
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/dist/types/server";
// import { NextResponse } from "next/server";

// export async function POST(req){
//     try{
//         const {userId} = getAuth(req)

//         if(!userId){
//             return NextResponse.json({success:false, message:"User not authenticated",})
//         }

//         // Prepate the chat data that stored in the database!

//         const chatData = {
//             userId,
//             message:[ ],
//             name:"New Chart",
//         }

//         // connect the database and create a new chat

//         await connectDB();
//         await Chat.create(chatData)

//         return NextResponse.json({success:true, message: 'chat created !'})

//     }catch(error){
//         return NextResponse.json({success:false, error: error.message})
//     }
// }

//chat gpt
// import connectDB from "@/config/db";
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     // Prepare the chat data to store in the database
//     const chatData = {
//       userId,
//       messages: [], // ✅ changed from message → messages (to match ai route.js)
//       name: "New Chat",
//     };

//     // Connect to database and create new chat
//     await connectDB();
//     await Chat.create(chatData);

//     return NextResponse.json({
//       success: true,
//       message: "Chat created!",
//     });
//   } catch (error) {
//     console.error("Create Chat Error:", error);
//     return NextResponse.json({
//       success: false,
//       error: error.message,
//     });
//   }
// }
