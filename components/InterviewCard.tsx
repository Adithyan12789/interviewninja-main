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
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview group">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-xl glass-panel">
            <p className="badge-text text-white font-semibold">{normalizedType}</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 blur group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={coverImage}
              alt="cover image"
              width={90}
              height={90}
              className="relative rounded-full object-fit size-[90px]"
            />
          </div>

          <h3 className="mt-5 capitalize text-xl font-bold gradient-text-secondary">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 glass-panel px-2 py-1 rounded-lg">
              <Image src="/calendar.svg" alt="calendar icon" width={18} height={18} />
              <p className="text-gray-300 text-sm">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 glass-panel px-2 py-1 rounded-lg">
              <Image src="/star.svg" alt="star icon" width={18} height={18} />
              <p className="text-gray-300 text-sm">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5 text-gray-300 leading-relaxed">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills!"}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <DisplayTechIcons techStack={techstack} />

          <Button className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-5 py-3 cursor-pointer min-h-10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <Link
              className="font-bold"
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};


export default InterviewCard;
