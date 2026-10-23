import { getCurrentUser } from "@/lib/actions/auth.action";
import { getAllFeedbackByUserId } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import InterviewCard from "@/components/InterviewCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function HistoryPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const feedbackHistory = await getAllFeedbackByUserId(user.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h2 className="text-4xl font-bold gradient-text-primary">Interview History</h2>
          <p className="text-gray-400 mt-2">
            View all your past interviews and performance
          </p>
        </div>
        <Button
          asChild
          className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <Link href="/interview">New Interview</Link>
        </Button>
      </div>

      {feedbackHistory && feedbackHistory.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-scale-in">
            <div className="card-border">
              <div className="glass-card p-6 bg-gradient-to-br from-white/5 to-white/[0.02] hover-lift">
                <p className="text-gray-400 text-sm">Total Interviews</p>
                <p className="text-white text-3xl font-bold mt-2">
                  {feedbackHistory.length}
                </p>
              </div>
            </div>
            <div className="card-border">
              <div className="glass-card p-6 bg-gradient-to-br from-white/5 to-white/[0.02] hover-lift">
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-white text-3xl font-bold mt-2">
                  {(
                    feedbackHistory.reduce((sum, f) => sum + f.totalScore, 0) /
                    feedbackHistory.length
                  ).toFixed(1)}
                  /100
                </p>
              </div>
            </div>
            <div className="card-border">
              <div className="glass-card p-6 bg-gradient-to-br from-white/5 to-white/[0.02] hover-lift">
                <p className="text-gray-400 text-sm">Highest Score</p>
                <p className="text-white text-3xl font-bold mt-2">
                  {Math.max(...feedbackHistory.map((f) => f.totalScore))}/100
                </p>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold gradient-text-secondary mb-4">All Interviews</h3>
            <div className="interviews-section">
              {feedbackHistory.map((feedback) => {
                const interview = feedback.interview;
                if (!interview) return null;

                return (
                  <InterviewCard
                    key={feedback.id}
                    id={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={feedback.createdAt}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="card-border animate-scale-in">
          <div className="glass-card p-12 text-center bg-gradient-to-br from-white/5 to-white/[0.02]">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/robot.png"
                alt="No interviews"
                width={200}
                height={200}
              />
              <h3 className="text-2xl font-bold gradient-text-secondary">
                No Interview History Yet
              </h3>
              <p className="text-gray-400 max-w-md">
                You haven&apos;t completed any interviews yet. Start your first
                interview to build your history and track your progress!
              </p>
              <Button
                asChild
                className="mt-4 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Link href="/interview">Start Your First Interview</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
