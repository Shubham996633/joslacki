import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type RequestType = { name: string; workspaceId: Id<"workspaces"> };
type ResponseType = Id<"channels">;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  OnError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateChannel = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.channels.create);
  const mutate = useCallback(
    async (values: RequestType, Options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values);
        Options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");

        Options?.OnError?.(error as Error);
        if (Options?.throwError) throw error;
      } finally {
        setStatus("settled");
        Options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
