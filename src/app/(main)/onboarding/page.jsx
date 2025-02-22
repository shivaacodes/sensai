import { industries } from "@/data/industries";
import React from "react";
import { getUserOnboardingStatus } from "../../../../actions/user";
import { redirect } from "next/dist/server/api-utils";
import OnboardingForm from "./_components/onboarding-form";

const Onboarding = async () => {
  // Check if user is alreday Onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default Onboarding;
