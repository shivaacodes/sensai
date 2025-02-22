"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
      Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
      {
        "salaryRanges": [
          { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["skill1", "skill2"],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["trend1", "trend2"],
        "recommendedSkills": ["skill1", "skill2"]
      }
      
      IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
      Include at least 5 common roles for salary ranges.
      Growth rate should be a percentage.
      Include at least 5 skills and trends.
    `;

    const result = await model.generateContent(prompt);

    // Properly access the response text
    const text = result.response.text();

    // Clean the response and parse JSON
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const parsedData = JSON.parse(cleanedText);
      return parsedData;
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("Failed to parse AI generated insights");
    }
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw new Error("Failed to generate industry insights");
  }
};

export async function getIndustryInsights() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      include: {
        industryInsight: true,
      },
    });

    if (!user) throw new Error("User not Found");

    // Check if we need to generate new insights
    if (!user.industryInsight) {
      const insights = await generateAIInsights(user.industry);

      const industryInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return industryInsight;
    }

    return user.industryInsight;
  } catch (error) {
    console.error("Error fetching industry insights:", error);
    throw new Error("Failed to get industry insights");
  }
}
