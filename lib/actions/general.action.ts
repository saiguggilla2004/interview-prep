"use server";

import { feedbackSchema } from "@/constants";
import {db} from "@/firebase/admin";
import { generateObject } from "ai";

import { google } from "@ai-sdk/google";
export async function getInterviewById(id: string): Promise<Interview | null> {
    try {
      const interviewsSnapshot = await db
        .collection("interviews")
        .doc(id)
        .get();
  
     
  
    //   const interviews: Interview[] = interviewsSnapshot.docs.map(doc => ({
    //     id: doc.id,
    //     ...(doc.data() as Omit<Interview, 'id'>),
    //   }));
  
      return interviewsSnapshot.data() as Interview | null;
    } catch (error) {
      console.error("Error fetching interviews:", error);
      return null;
    }
  }
  


  export async function createFeedback(params:CreateFeedbackParams)
  {
   const {interviewId,userId,transcript}=params;


   try{
      const formattedTranscript=transcript.map((sentence:{role:string,content:string})=>(
        `-${sentence.role}: ${sentence.content}\n`
      )).join("");


      const {object:{totalScore,categoryScores,strengths,areasForImprovement,finalAssessment}}=await generateObject({
        model:google('gemini-2.0-flash-001',{
            structuredOutputs:false,
        }),
        schema:feedbackSchema,
        prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
        system:"You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",      
        

    });

    const feedback=await db.collection("feedback").add({
        interviewId,
        userId,
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
        createdAt: new Date().toISOString(),
    });

    return {
        success:true,
        feedbackId:feedback.id
    };


   }
   catch(error)
   {
    console.error("Error creating feedback:", error);

    return {
        success:false,
        feedbackId:""
    }
   }
  }
  
  
  export async function getFeedbackByInterviewId(params:GetFeedbackByInterviewIdParams): Promise<Feedback | null> {

    const {interviewId,userId}=params;
    try {
      const feedback = await db
        .collection("feedback")
        .where("interviewId", "==", interviewId)
        .where('userId', '==', userId)
        .limit(1)
        .get();
  
      if(feedback.empty)
      {
        return null;
      }
  
      const feedbackDoc=feedback.docs[0];

      return {
        id:feedbackDoc.id,...feedbackDoc.data()
      } as Feedback | null;
      
    } catch (error) {
      console.error("Error fetching interviews:", error);
      return null;
    }
  }
  