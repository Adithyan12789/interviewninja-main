"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interview = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interview.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interview = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .orderBy("createdAt", "desc")
    .get();

  return interview.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return {
      success: false,
      error: "Failed to generate feedback. Please try again later.",
    };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { userId, interviewId } = params;

  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

    if(feedback.empty) return null;

    const feedbackDoc = feedback.docs[0];

    return {
        id: feedbackDoc.id,
        ...feedbackDoc.data(),
    } as Feedback;
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    // Query all feedback documents for the user
    const feedbackSnapshot = await db
      .collection("feedback")
      .where("userId", "==", userId)
      .get();

    if (feedbackSnapshot.empty) {
      return null;
    }

    const feedbackDocs = feedbackSnapshot.docs;
    
    // Compute aggregates
    let totalScoreSum = 0;
    let highestScore = 0;
    const categoryScoresMap: Record<string, { sum: number, count: number }> = {};
    
    feedbackDocs.forEach(doc => {
      const feedbackData = doc.data();
      const totalScore = feedbackData.totalScore || 0;
      
      // Update total sum
      totalScoreSum += totalScore;
      
      // Update highest score
      if (totalScore > highestScore) {
        highestScore = totalScore;
      }
      
      // Process category scores
      if (feedbackData.categoryScores && Array.isArray(feedbackData.categoryScores)) {
        feedbackData.categoryScores.forEach((category: { name: string, score: number }) => {
          if (!categoryScoresMap[category.name]) {
            categoryScoresMap[category.name] = { sum: 0, count: 0 };
          }
          categoryScoresMap[category.name].sum += category.score;
          categoryScoresMap[category.name].count += 1;
        });
      }
    });

    // Get interview IDs to fetch interview data for role analysis
    const interviewIds = feedbackDocs.map(doc => doc.data().interviewId);
    
    // Fetch interviews to determine most practiced role
    let mostPracticedRole: string | null = null;
    const roleCounts: Record<string, number> = {};
    
    if (interviewIds.length > 0) {
      // Fetch interviews in batches to avoid Firestore limitations
      for (const interviewId of interviewIds) {
        const interviewDoc = await db.collection("interviews").doc(interviewId).get();
        if (interviewDoc.exists) {
          const interviewData = interviewDoc.data();
          const role = interviewData?.role || 'Unknown';
          roleCounts[role] = (roleCounts[role] || 0) + 1;
        }
      }
      
      // Find most frequent role
      let maxCount = 0;
      for (const [role, count] of Object.entries(roleCounts)) {
        if (count > maxCount) {
          maxCount = count;
          mostPracticedRole = role;
        }
      }
    }

    // Calculate category averages
    const categoryAverages = Object.entries(categoryScoresMap).map(([name, data]) => ({
      name,
      average: data.sum / data.count
    }));

    // Calculate overall average score
    const averageScore = totalScoreSum / feedbackDocs.length;

    return {
      totalInterviewsTaken: feedbackDocs.length,
      averageScore,
      highestScore,
      mostPracticedRole,
      categoryAverages
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    return null;
  }
}

export async function getAllFeedbackByUserId(userId: string): Promise<Array<Feedback & { interview: Interview | null }> | null> {
  try {
    // Query all feedback documents for the user
    const feedbackSnapshot = await db
      .collection("feedback")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    if (feedbackSnapshot.empty) {
      return null;
    }

    const feedbackDocs = feedbackSnapshot.docs;
    const feedbackWithInterview: Array<Feedback & { interview: Interview | null }> = [];

    // Process each feedback document
    for (const doc of feedbackDocs) {
      const feedbackData = doc.data();
      const feedbackId = doc.id;
      const interviewId = feedbackData.interviewId;

      // Fetch associated interview data
      let interview: Interview | null = null;
      if (interviewId) {
        const interviewDoc = await db.collection("interviews").doc(interviewId).get();
        if (interviewDoc.exists) {
          interview = {
            id: interviewDoc.id,
            ...interviewDoc.data()
          } as Interview;
        }
      }

      // Combine feedback with interview data
      feedbackWithInterview.push({
        id: feedbackId,
        ...feedbackData,
        interview
      } as Feedback & { interview: Interview | null });
    }

    return feedbackWithInterview;
  } catch (error) {
    console.error("Error getting all feedback by user ID:", error);
    return null;
  }
}
