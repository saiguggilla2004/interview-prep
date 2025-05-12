import React from 'react'
import { getInterviewById } from '@/lib/actions/general.action'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
type RouteParams = {
  params: {
    id: string;
  };
};

const page = async ({params}:RouteParams) => {

const {id}=params;
console.log("Interview ID:", id);
const user=await getCurrentUser();
    const interview=await getInterviewById(id);

    if(!interview)
    {
        redirect("/");
    }
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 justify-between max-sm:flex-col ">
            <div className='flex flex-row gap-4 items-center'>

   <Image  src={getRandomInterviewCover()} alt="coverimage" className='rounded-full object-cover size-[40px]' width={40} height={40}/>

   <h3 className='capitalize'>{interview.role} Interview</h3>
            </div>
            <DisplayTechIcons techStack={interview.techstack}/>
        </div>
        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
      </div>

      <Agent userName={user?.name} interviewId={id} type="interview" questions={interview.questions}  userId={user?.id}/>
    </>
  );
}

export default page
