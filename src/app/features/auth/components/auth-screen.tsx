"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  const date = new Date();
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="hidden  md:flex items-center my-7 gap-x-2 p-6">
            <Link href={"/"}>
              <Image src="/logo.png" height="50" width="50" alt="Logo" />
            </Link>
            <p className="text-white text-4xl font-bold">Get to Slacki</p>
          </div>
          {state === "signIn" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-white xl:text-left">
              © {date.getFullYear()}
              <Link
                href={"/"}
                className="hover:underline hover:text-sky-400 ml-2"
              >
                Slacki
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/reading.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};
