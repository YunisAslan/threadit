import { buttonVariants } from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { authOptions } from "./api/auth/[...nextauth]/route";
import GeneralFeed from "@/components/GeneralFeed";
import CustomFeed from "@/components/CustomFeed";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}
        {session ? <CustomFeed /> : <GeneralFeed />}
        {/* info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-red-100  px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <FaHome className="w-4 h-4" />
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              Your personal Threadit home page. Come here to check in with your
              favorite communities.
            </div>

            <Link
              href="/t/create"
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
            >
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
