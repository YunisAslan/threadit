"use client";

import { useState } from "react";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import UseCustomToast from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

function CreateComment({ postId, replyToId }: CreateCommentProps) {
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();
  const { loginToast } = UseCustomToast();
  const router = useRouter();

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(
        "/api/subreddit/post/comment",
        payload
      );

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            onClick={() => createComment({ postId, text: input, replyToId })}
            disabled={input.length === 0}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
