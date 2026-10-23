import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewCard = async ({
  id,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {

  const currentUser = await getCurrentUser();

  const feedback = currentUser?.id && id
    ? await getFeedbackByInterviewId({
        interviewId: id,
        userId: currentUser.id,
      })
    : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  
  // Use a stable date value to prevent hydration errors
  const dateToFormat = feedback?.createdAt || createdAt;
  const formattedDate = dateToFormat 
    ? dayjs(dateToFormat).format("MMM D, YYYY")
    : "Recent";

  // Get a deterministic cover image to prevent hydration errors
  const coverImage = getInterviewCover(role, id);

  return (
    <div className="group relative w-[380px] max-sm:w-full">
      {/* Animated gradient border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e]/95 to-[#16213e]/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] min-h-[420px] flex flex-col">
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-400/30">
            <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">{normalizedType}</p>
          </div>
        </div>

        {/* Interview Image with premium styling */}
        <div className="relative mb-5 w-fit">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-60 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-300"></div>
          <div className="relative p-1 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full">
            <div className="bg-[#1a1a2e] rounded-full p-1">
              <Image
                src={coverImage}
                alt="cover image"
                width={80}
                height={80}
                className="rounded-full object-cover size-[80px]"
              />
            </div>
          </div>
          {/* Status indicator */}
          {feedback && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold capitalize mb-4 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
          {role} Interview
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-300 font-medium">{formattedDate}</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-xs font-bold">
              <span className="text-white">{feedback?.totalScore || "---"}</span>
              <span className="text-gray-400">/100</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1 line-clamp-3">
          {feedback?.finalAssessment ||
            "Ready to showcase your skills? Start this interview to get personalized feedback and improve your performance."}
        </p>

        {/* Bottom section */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <DisplayTechIcons techStack={techstack} />

          <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
            <Button className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl px-6 py-2.5 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border border-purple-400/20">
              {feedback ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Feedback
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Interview
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default InterviewCard;
