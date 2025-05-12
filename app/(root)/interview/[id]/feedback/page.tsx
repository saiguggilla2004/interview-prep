import React from 'react';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterviewById,
  getFeedbackByInterviewId,
} from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';

interface RouteParams {
  params: { id: string };
}

const Page = async ({ params }: RouteParams) => {
  const { id } = params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect('/');

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || '',
  });

  return (
    <section className=" min-h-screen py-10">
      <div className="form max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-light-100 text-center">Interview Feedback</h1>

        {!feedback ? (
          <p className="text-center text-light-300">No feedback available for this interview.</p>
        ) : (
          <div className="space-y-6">

            {/* Total Score */}
            <div className="card-border p-4 rounded-md">
              <label className="label mb-1">Total Score</label>
              <p className="input bg-dark-400">{feedback.totalScore} / 100</p>
            </div>

            {/* Category Scores */}
            {feedback.categoryScores?.map((category: any, index: number) => (
              <div key={index} className="card-border p-4 rounded-md">
                <label className="label mb-1">{category.name}</label>
                <p className="input mb-2 bg-dark-400">Score: {category.score} / 100</p>
                <p className="text-light-300">{category.comment}</p>
              </div>
            ))}

            {/* Areas for Improvement */}
            {feedback.areasForImprovement?.length > 0 && (
              <div className="card-border p-4 rounded-md">
                <label className="label mb-1">Areas for Improvement</label>
                <ul className="list-disc list-inside text-light-300 space-y-1">
                  {feedback.areasForImprovement.map((point: string, idx: number) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Final Assessment */}
            <div className="card-border p-4 rounded-md">
              <label className="label mb-1">Final Assessment</label>
              <p className="text-light-300">{feedback.finalAssessment}</p>
            </div>

            {/* Date */}
            <div className="card-border p-4 rounded-md">
              <label className="label mb-1">Submitted On</label>
              <p className="input bg-dark-400">
                {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
