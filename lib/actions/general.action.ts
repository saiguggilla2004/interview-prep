import {db} from "@/firebase/admin";


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
  
  
  