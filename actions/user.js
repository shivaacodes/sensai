"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) throw new Error("User not Found");

    // Generate AI insights outside the transaction
    let insights = null;
    let industryInsight = null;

    try {
      // First check if industry insight exists
      industryInsight = await db.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });

      if (!industryInsight) {
        // Generate insights before starting transaction
        insights = await generateAIInsights(data.industry);
      }
    } catch (error) {
      console.error("Error generating AI insights:", error);
      throw new Error("Failed to generate industry insights");
    }

    // Now perform the database updates in a transaction
    const result = await db.$transaction(
      async (tx) => {
        // Create industry insight if it doesn't exist and we have new insights
        if (!industryInsight && insights) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            experience: data.experience,
            industry: data.industry,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return {
          user: updatedUser,
          industry: industryInsight,
        };
      },
      {
        timeout: 10000, // 10 second timeout for the transaction itself
      }
    );

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    console.error("Error updating user and industry:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
