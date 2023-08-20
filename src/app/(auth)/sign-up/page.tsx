import SignUp from "@/components/SignUp";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

function Page() {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <BsChevronLeft className="w-3 h-3 mr-2" />
          Back to Home
        </Link>

        {/*  */}
        <SignUp />
      </div>
    </div>
  );
}

export default Page;
