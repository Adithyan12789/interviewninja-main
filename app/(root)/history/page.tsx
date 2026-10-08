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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-3xl font-bold">Interview History</h2>
          <p className="text-gray-400 mt-2">
            View all your past interviews and performance
          </p>
        </div>
        <Button
          asChild
          className="text-sm font-semibold bg-white w-fit hover:bg-gray-600 hover:text-white rounded-full px-5 py-3 cursor-pointer min-h-10"
        >
          <Link href="/interview">New Interview</Link>
        </Button>
      </div>

      {feedbackHistory && feedbackHistory.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-border">
              <div className="dark-gradient rounded-2xl p-6">
                <p className="text-gray-400 text-sm">Total Interviews</p>
                <p className="text-white text-3xl font-bold mt-2">
                  {feedbackHistory.length}
                </p>
              </div>
            </div>
            <div className="card-border">
              <div className="dark-gradient rounded-2xl p-6">
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
              <div className="dark-gradient rounded-2xl p-6">
                <p className="text-gray-400 text-sm">Highest Score</p>
                <p className="text-white text-3xl font-bold mt-2">
                  {Math.max(...feedbackHistory.map((f) => f.totalScore))}/100
                </p>
              </div>
            </div>
          </div>

          {/* History List */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">All Interviews</h3>
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
        <div className="card-border">
          <div className="dark-gradient rounded-2xl p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/robot.png"
                alt="No interviews"
                width={200}
                height={200}
              />
              <h3 className="text-white text-xl font-bold">
                No Interview History Yet
              </h3>
              <p className="text-gray-400 max-w-md">
                You haven&apos;t completed any interviews yet. Start your first
                interview to build your history and track your progress!
              </p>
              <Button
                asChild
                className="mt-4 text-sm font-semibold bg-white w-fit hover:bg-gray-600 hover:text-white rounded-full px-5 py-3 cursor-pointer min-h-10"
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
