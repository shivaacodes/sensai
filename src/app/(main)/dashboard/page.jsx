import { redirect } from "next/navigation";
import React from "react";
import { getUserOnboardingStatus } from "../../../../actions/user";
import { getIndustryInsights } from "../../../../actions/dashboard";
import DashboardView from "./_components/dashboard-view";

const Dashboard = async () => {
  try {
    // Check onboarding status
    const { isOnboarded } = await getUserOnboardingStatus();

    if (!isOnboarded) {
      redirect("/onboarding");
    }

    // Fetch industry insights
    const insights = await getIndustryInsights();

    return (
      <div className="container mx-auto">
        <DashboardView insights={insights} />
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    // You might want to handle this error differently, perhaps showing an error UI
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-red-600">
          Error loading dashboard data. Please try again later.
        </h2>
      </div>
    );
  }
};

export default Dashboard;
