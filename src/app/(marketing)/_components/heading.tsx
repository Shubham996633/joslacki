"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your people, projects and app, at one system. Welcome to{" "}
        <span className="underline">Slacki</span>
      </h1>
      <h3 className="mt-6 text-base sm:text-xl md:text-2xl font-medium">
        Slacki is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button
          asChild
          variant={"outline"}
          className="text-black text-xl p-4 font-bold"
          size={"lg"}
        >
          <Link href="/new">
            Enter Jotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <Button
          variant={"outline"}
          className="text-black text-xl p-4 font-bold"
          size={"lg"}
        >
          <Link href="/auth">Get Slacki free</Link>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
