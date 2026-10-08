import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ScoreBreakdownChart from "@/components/ScoreBreakdownChart";
import StrengthsBadges from "@/components/StrengthsBadges";
import ImprovementChecklist from "@/components/ImprovementChecklist";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || "",
  });

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold text-white">
          Feedback on the Interview -{" "}
          <span className="capitalize text-white">{interview.role}</span> Interview
        </h1>
      </div>

      {/* Overall Score Display */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Large score circle */}
            <div className="w-32 h-32 rounded-full border-8 flex items-center justify-center"
              style={{
                borderColor: feedback?.totalScore ? (
                  feedback.totalScore >= 70 ? "#49de50" :
                  feedback.totalScore >= 50 ? "#f5a623" : "#f75353"
                ) : "#6870a6"
              }}
            >
              <div className="text-center">
                <div className="score-large" style={{
                  color: feedback?.totalScore ? (
                    feedback.totalScore >= 70 ? "#49de50" :
                    feedback.totalScore >= 50 ? "#f5a623" : "#f75353"
                  ) : "#ffffff"
                }}>
                  {feedback?.totalScore || 0}
                </div>
                <div className="score-label">/100</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p className="text-white">
                Overall Impression
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-row gap-2">
              <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p className="text-white">
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Final Assessment */}
      <div className="highlight-box">
        <h3 className="text-white text-xl font-semibold mb-4">Final Assessment</h3>
        <p className="text-white">{feedback?.finalAssessment}</p>
      </div>

      {/* Score Breakdown Chart */}
      {feedback?.categoryScores && (
        <ScoreBreakdownChart categoryScores={feedback.categoryScores} />
      )}

      {/* Strengths */}
      {feedback?.strengths && feedback.strengths.length > 0 && (
        <StrengthsBadges strengths={feedback.strengths} />
      )}

      {/* Areas for Improvement */}
      {feedback?.areasForImprovement && feedback.areasForImprovement.length > 0 && (
        <ImprovementChecklist areas={feedback.areasForImprovement} />
      )}

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold bg-white w-fit hover:bg-black hover:text-white rounded-full px-5 py-3 cursor-pointer min-h-10">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold bg-white w-fit hover:bg-black hover:text-white rounded-full px-5 py-3 cursor-pointer min-h-10">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;