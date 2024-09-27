"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Logo } from "./logo";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50   fixed top-0 flex items-center w-full p-6",
        scrolled && "shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm">
              <Link href={"/auth"}>Log in</Link>
            </Button>
            <Button size="sm">
              <Link href={"/auth"}>Get Slacki free</Link>
            </Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/new">Enter Slacki</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
