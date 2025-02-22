"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold gradient-title font-poppins">
          404
        </h1>
        <p className="text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft size={13} /> Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
