import { getCurrentUser } from "@/lib/actions/auth.action";
import { getUserStats } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatisticsSummary from "@/components/StatisticsSummary";
import SignOutButton from "@/components/SignOutButton";
import { Edit, Mail, Calendar, Award, TrendingUp } from "lucide-react";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const stats = await getUserStats(user.id);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        {/* Header with gradient background */}
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative card-border w-full">
            <div className="dark-gradient rounded-3xl p-6 md:p-10 w-full">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 w-full">
                  {/* Profile Avatar */}
                  <div className="relative group flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center ring-4 ring-white/10">
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.name}
                          width={112}
                          height={112}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-5xl font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-white text-3xl md:text-4xl font-bold">
                        {user.name}
                      </h2>
                      <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                        <span className="text-yellow-400 text-xs font-semibold">PRO</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-300 break-all">{user.email}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm whitespace-nowrap">
                          Joined {new Date().toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      
                      {stats && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                          <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm whitespace-nowrap">
                            {stats.totalInterviewsTaken} Interview{stats.totalInterviewsTaken !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      
                      {stats && stats.averageScore > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                          <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm whitespace-nowrap">
                            {stats.averageScore.toFixed(0)}% Avg Score
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Button
                    asChild
                    className="flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6 py-3 cursor-pointer min-h-11 border-0 shadow-lg shadow-purple-500/25"
                  >
                    <Link href="/profile/edit">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        {stats ? (
          <div className="space-y-6 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Performance Overview</h3>
              <Link href="/statistics" className="text-blue-400 hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                View Detailed Stats →
              </Link>
            </div>
            <div className="w-full">
              <StatisticsSummary stats={stats} />
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl"></div>
            <div className="relative card-border w-full">
              <div className="dark-gradient rounded-3xl p-12 text-center w-full">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-blue-400" />
                </div>
                <h4 className="text-white text-xl font-bold mb-3">Start Your Journey</h4>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  No statistics available yet. Take your first interview to see your progress and track your improvement!
                </p>
                <Button
                  asChild
                  className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-3 cursor-pointer min-h-11 shadow-lg shadow-blue-500/25"
                >
                  <Link href="/interview">Start Your First Interview</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Link href="/history" className="group card-border hover:scale-[1.02] transition-transform w-full">
            <div className="dark-gradient rounded-2xl p-6 h-full w-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">Interview History</h4>
              <p className="text-gray-400 text-sm">View all your past interviews and performance</p>
            </div>
          </Link>

          <Link href="/statistics" className="group card-border hover:scale-[1.02] transition-transform w-full">
            <div className="dark-gradient rounded-2xl p-6 h-full w-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Analytics</h4>
              <p className="text-gray-400 text-sm">Detailed insights and progress tracking</p>
            </div>
          </Link>

          <Link href="/interview" className="group card-border hover:scale-[1.02] transition-transform w-full">
            <div className="dark-gradient rounded-2xl p-6 h-full w-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-2">New Interview</h4>
              <p className="text-gray-400 text-sm">Start a new practice interview session</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
