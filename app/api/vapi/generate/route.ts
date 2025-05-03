import { db } from "@/firebase/admin";
import {google} from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils";
import { generateText } from "ai"
export async function GET()
{
    return Response.json({success:true,message:"VAPI is working!"},{status:200});
}


export async function POST(request:Request)
{
    const  {type,role,level,techstack,amount,userid,coverImage }=await request.json();

    try{
     const {text:questions}=await generateText({
        model:google('gemini-2.0-flash-001'),
        prompt:`Prepare questions for a job interview
        The job role is ${role}.
        the job experience level is ${level}.
        the tech stack used in the job is ${techstack}.
        the focus between the behavioral and technical questions should lean towards the ${type} side.
        the amount of questions to be generated is ${amount}.
        Please return only the questions ,without any other text.
        the questions are going to be read by voice assistant, so please make sure to use a clear and simple language and donot use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions like this:
        ["question1","question2","question3"]

        thanks you`
     });


     const interview={
        role,type,level,
        techstack:techstack.split(","),
        questions:JSON.parse(questions),
        userId:userid,
        finalized:true,
        coverImage:getRandomInterviewCover(),
        createdAt:new Date().toISOString(),
     }

     await db.collection("interviews").add(interview);
     return Response.json({success:true,message:"Interview created successfully!"},{status:200});
    }
    catch(e)
    {
        console.log(e);
        return Response.json({success:false,message:"Error in VAPI"},{status:500});
    }
}