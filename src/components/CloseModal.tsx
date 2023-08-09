"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { RxCross2 as X } from "react-icons/rx";

function CloseModal() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      <X className="w-5 h-5" />
    </Button>
  );
}

export default CloseModal;
