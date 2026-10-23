import { getCurrentUser } from "@/lib/actions/auth.action";
import { getUserStats, getAllFeedbackByUserId } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import StatisticsSummary from "@/components/StatisticsSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function StatisticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const stats = await getUserStats(user.id);
  const feedbackHistory = await getAllFeedbackByUserId(user.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h2 className="text-4xl font-bold gradient-text-primary">Statistics & Analytics</h2>
          <p className="text-gray-400 mt-2">
            Track your progress and identify areas for improvement
          </p>
        </div>
      </div>

      {stats ? (
        <div className="flex flex-col gap-8">
          {/* Overall Statistics */}
          <div className="animate-scale-in">
            <h3 className="text-2xl font-bold gradient-text-secondary mb-4">Overall Performance</h3>
            <StatisticsSummary stats={stats} />
          </div>

          {/* Category Breakdown */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold gradient-text-secondary mb-4">
              Performance by Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.categoryAverages.map((category, index) => {
                const percentage = (category.average / 100) * 100;
                const isExcellent = category.average >= 80;
                const isGood = category.average >= 60 && category.average < 80;

                return (
                  <div key={index} className="card-border">
                    <div className="glass-card p-6 bg-gradient-to-br from-white/5 to-white/[0.02] hover-lift">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">
                          {category.name}
                        </h4>
                        <span className="text-white text-xl font-bold">
                          {category.average.toFixed(1)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isExcellent
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : isGood
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-orange-500 to-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Status */}
                      <p className="text-sm mt-2 text-gray-400">
                        {isExcellent
                          ? "Excellent! Keep up the great work"
                          : isGood
                          ? "Good progress, keep improving"
                          : "Focus on this area for improvement"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Improvements */}
          {feedbackHistory && feedbackHistory.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              {/* Top Strengths */}
              <div className="card-border">
                <div className="glass-card p-6 bg-gradient-to-br from-green-900/10 to-emerald-900/10 hover-lift">
                  <h3 className="text-2xl font-bold gradient-text-secondary mb-4">
                    Common Strengths
                  </h3>
                  <div className="flex flex-col gap-3">
                    {Array.from(
                      new Set(
                        feedbackHistory.flatMap((f) => f.strengths).slice(0, 5)
                      )
                    ).map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 glass-panel hover-lift"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(73,222,80,0.5)]" />
                        <p className="text-white text-sm">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="card-border">
                <div className="glass-card p-6 bg-gradient-to-br from-orange-900/10 to-red-900/10 hover-lift">
                  <h3 className="text-2xl font-bold gradient-text-secondary mb-4">
                    Areas to Focus On
                  </h3>
                  <div className="flex flex-col gap-3">
                    {Array.from(
                      new Set(
                        feedbackHistory
                          .flatMap((f) => f.areasForImprovement)
                          .slice(0, 5)
                      )
                    ).map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 glass-panel hover-lift"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(245,166,35,0.5)]" />
                        <p className="text-white text-sm">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card-border animate-scale-in">
          <div className="glass-card p-12 text-center bg-gradient-to-br from-white/5 to-white/[0.02]">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/robot.png"
                alt="No statistics"
                width={200}
                height={200}
              />
              <h3 className="text-2xl font-bold gradient-text-secondary">
                No Statistics Available Yet
              </h3>
              <p className="text-gray-400 max-w-md">
                Complete your first interview to start tracking your progress and
                see detailed analytics!
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
