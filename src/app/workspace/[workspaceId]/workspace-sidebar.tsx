import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";

export const WorkspaceSidebar = () => {
  const router = useRouter();
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  const { data: channels } = useGetChannels({
    workspaceId,
  });
  const { data: members } = useGetMembers({
    workspaceId,
  });

  const handleNewChat = () => {
    const firstMember = members?.[1];
    router.replace(`/workspace/${workspaceId}/member/${firstMember?._id}`);
  };

  const [_open, setOpen] = useCreateChannelModal();

  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channels"
        onNew={
          member.role === "admin"
            ? () => {
                setOpen(!_open);
              }
            : undefined
        }
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            label={item.name}
            icon={HashIcon}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={handleNewChat}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
