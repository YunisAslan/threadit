import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserAccountNav from "./UserAccountNav";
import { User } from "@prisma/client";
import SearchBar from "./SearchBar";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  // console.log("Session :", session);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-gray-50 border-b border-gray-300 z-[10] py-3">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <p className="font-bold text-2xl text-primary">
            Thread<span className="text-red-600">it</span>
          </p>
        </Link>

        {/* Serch bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user as User} />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({
              size: "sm",
            })}
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
