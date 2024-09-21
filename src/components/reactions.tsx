import { useCurrentMember } from "@/app/features/members/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Doc, Id } from "../../convex/_generated/dataModel";

interface ReactionProps {
  data: Array<
    Omit<Doc<"reactions">, ""> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const currentMemberId = currentMember?._id;
  if (data.length === 0 || !currentMemberId) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <button
          key={reaction._id}
          className={cn(
            "h-6 rounded-full px-2 bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
            reaction?.memberIds.includes(currentMemberId) &&
              "bg-blue-100/70 border-blue-500 text-white"
          )}
        >
          {reaction.value}
          <span
            className={cn(
              "text-xs font-semibold text-muted-foreground",
              reaction.memberIds.includes(currentMemberId) && "text-blue-500"
            )}
          >
            {reaction.count}
          </span>
        </button>
      ))}
    </div>
  );
};
