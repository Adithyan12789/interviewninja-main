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
      <div className="flex flex-row justify-center animate-slide-up">
        <h1 className="text-4xl font-bold gradient-text-primary text-center">
          Feedback on the Interview -{" "}
          <span className="capitalize gradient-text-secondary">{interview.role}</span> Interview
        </h1>
      </div>

      {/* Overall Score Display */}
      <div className="flex flex-col items-center gap-6 animate-scale-in">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Large score circle with glow effect */}
            <div className="absolute -inset-2 rounded-full opacity-50 blur-xl animate-glow"
              style={{
                background: feedback?.totalScore ? (
                  feedback.totalScore >= 70 ? "radial-gradient(circle, rgba(73,222,80,0.6) 0%, transparent 70%)" :
                  feedback.totalScore >= 50 ? "radial-gradient(circle, rgba(245,166,35,0.6) 0%, transparent 70%)" :
                  "radial-gradient(circle, rgba(247,83,83,0.6) 0%, transparent 70%)"
                ) : "none"
              }}
            />
            <div className="relative w-40 h-40 rounded-full border-8 flex items-center justify-center glass-card"
              style={{
                borderColor: feedback?.totalScore ? (
                  feedback.totalScore >= 70 ? "#49de50" :
                  feedback.totalScore >= 50 ? "#f5a623" : "#f75353"
                ) : "#6870a6"
              }}
            >
              <div className="text-center">
                <div className="text-7xl font-bold" style={{
                  color: feedback?.totalScore ? (
                    feedback.totalScore >= 70 ? "#49de50" :
                    feedback.totalScore >= 50 ? "#f5a623" : "#f75353"
                  ) : "#ffffff"
                }}>
                  {feedback?.totalScore || 0}
                </div>
                <div className="score-label text-xl">/100</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-2 items-center glass-panel px-3 py-2">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p className="text-white">
                Overall Impression
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-row gap-2 glass-panel px-3 py-2">
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

      <hr className="border-white/10" />

      {/* Final Assessment */}
      <div className="highlight-box animate-slide-up">
        <h3 className="text-2xl font-bold gradient-text-secondary mb-4">Final Assessment</h3>
        <p className="text-gray-300 leading-relaxed">{feedback?.finalAssessment}</p>
      </div>

      {/* Score Breakdown Chart */}
      {feedback?.categoryScores && (
        <div className="animate-slide-up">
          <ScoreBreakdownChart categoryScores={feedback.categoryScores} />
        </div>
      )}

      {/* Strengths */}
      {feedback?.strengths && feedback.strengths.length > 0 && (
        <div className="animate-slide-up">
          <StrengthsBadges strengths={feedback.strengths} />
        </div>
      )}

      {/* Areas for Improvement */}
      {feedback?.areasForImprovement && feedback.areasForImprovement.length > 0 && (
        <div className="animate-slide-up">
          <ImprovementChecklist areas={feedback.areasForImprovement} />
        </div>
      )}

      <div className="buttons animate-slide-up">
        <Button className="flex-1 text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white rounded-full px-5 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <Link href="/" className="flex w-full justify-center">
            Back to dashboard
          </Link>
        </Button>

        <Button className="flex-1 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-5 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            Retake Interview
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;