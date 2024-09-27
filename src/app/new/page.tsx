"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Footer } from "../(marketing)/_components/footer";
import { Heading } from "../(marketing)/_components/heading";
import { Heroes } from "../(marketing)/_components/heroes";
import { Navbar } from "../(marketing)/_components/navbar";
import { useGetWorkspaces } from "../features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "../features/workspaces/store/use-create-workspace-modal";

export default function New() {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const router = useRouter();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen, router]);

  return (
    <div className="h-full bg-[#5C3B58] text-white">
      <Navbar />
      <main className="h-full pt-40">
        <div className="min-h-full flex bg-[#5C3B58] flex-col ">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Heroes />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
