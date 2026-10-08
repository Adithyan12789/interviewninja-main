import React from "react";
import { ClipboardList, TrendingUp, Trophy, Briefcase } from "lucide-react";

interface StatisticsSummaryProps {
  stats: {
    totalInterviewsTaken: number;
    averageScore: number;
    highestScore: number;
    mostPracticedRole: string | null;
  };
}

const StatisticsSummary = ({ stats }: StatisticsSummaryProps) => {
  const { totalInterviewsTaken, averageScore, highestScore, mostPracticedRole } = stats;

  const statCards = [
    {
      label: "Total Interviews",
      value: totalInterviewsTaken.toString(),
      icon: ClipboardList,
      description: "Interviews completed",
    },
    {
      label: "Average Score",
      value: averageScore.toFixed(1),
      icon: TrendingUp,
      description: "Your average performance",
    },
    {
      label: "Highest Score",
      value: highestScore.toFixed(1),
      icon: Trophy,
      description: "Personal best score",
    },
    {
      label: "Most Practiced",
      value: mostPracticedRole || "N/A",
      icon: Briefcase,
      description: "Most frequent role",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card-border">
            <div className="dark-gradient rounded-2xl p-6 flex flex-col gap-4 min-h-[180px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsSummary;