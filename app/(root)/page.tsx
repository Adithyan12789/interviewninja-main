import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import {
  getCurrentUser,
} from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getUserStats,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StatisticsSummary from "@/components/StatisticsSummary";

const page = async () => {
  const user = await getCurrentUser();

  console.log("user: ", user)

  const [userInterviewsRaw, latestInterviewsRaw, stats] = await Promise.all([
    await getInterviewsByUserId(user?.id || ""),
    await getLatestInterviews({ userId: user?.id || "" }),
    await getUserStats(user?.id || ""),
  ]);

  const userInterviews = userInterviewsRaw ?? [];
  const latestInterviews = latestInterviewsRaw ?? [];

  console.log("userInterviews: ", userInterviews)

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-4xl font-bold gradient-text-primary animate-slide-up">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Practice on real interview questions & get instant feedback
          </p>

          <Button
            asChild
            className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-fit text-white rounded-full px-8 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/interview">Start An Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="Robot"
          width={400}
          height={400}
          className="hidden sm:block animate-scale-in"
          style={{ animationDelay: '0.3s' }}
        />
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="flex flex-col gap-6 mt-8 animate-slide-up">
          <h2 className="text-3xl font-bold gradient-text-secondary">Your Performance Overview</h2>
          <StatisticsSummary stats={stats} />
        </section>
      )}

      <section className="flex flex-col gap-6 mt-8 animate-slide-up">
        <h2 className="text-3xl font-bold gradient-text-secondary">Your Inteviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p className="text-gray-400">You Haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8 animate-slide-up">
        <h2 className="text-3xl font-bold gradient-text-secondary">Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p className="text-gray-400">There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
