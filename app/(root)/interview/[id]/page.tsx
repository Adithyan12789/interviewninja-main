import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import { getInterviewById } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return (
    <>
      <div className="flex flex-row gap-4 justify-between animate-slide-up">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 blur"></div>
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="profile"
                  width={40}
                  height={40}
                  className="relative rounded-full object-cover size-[40px]"
                />
              ) : (
                <Image
                  src={getRandomInterviewCover()}
                  alt="cover-image"
                  width={40}
                  height={40}
                  className="relative rounded-full object-cover size-[40px]"
                />
              )}
            </div>
            <h3 className="capitalize text-2xl font-bold gradient-text-secondary">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <div className="glass-panel px-4 py-2 h-fit">
          <p className="text-white font-semibold">{interview.type}</p>
        </div>
      </div>

      {/* Metadata Panel */}
      <div className="metadata-panel mt-6 mb-8 animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2 glass-panel p-4 hover-lift">
            <div className="text-gray-400 text-sm">Role</div>
            <div className="text-white font-semibold capitalize">{interview.role}</div>
          </div>
          
          <div className="flex flex-col gap-2 glass-panel p-4 hover-lift">
            <div className="text-gray-400 text-sm">Interview Type</div>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-[#cac5fe] border border-purple-500/30 rounded-full px-3 py-1 text-sm font-medium">
                {interview.type}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 glass-panel p-4 hover-lift">
            <div className="text-gray-400 text-sm">Level</div>
            <div className="text-white font-semibold capitalize">{interview.level}</div>
          </div>
          
          <div className="flex flex-col gap-2 glass-panel p-4 hover-lift">
            <div className="text-gray-400 text-sm">Questions</div>
            <div className="text-white font-semibold">{interview.questions?.length || 0} total</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {interview.techstack?.map((tech, index) => (
                <div 
                  key={index}
                  className="glass-panel px-3 py-1 text-sm text-white hover-lift"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 bg-gradient-to-br from-white/5 to-white/[0.02] animate-scale-in">
        <Agent
          userName={user?.name || ""}
          userId={user?.id}
          userPhoto={user?.photoURL}
          interviewId={id}
          type="interview"
          questions={interview.questions}
        />
      </div>
    </>
  );
};

export default InterviewDetails;
