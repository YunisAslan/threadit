"use client";

import Link from "next/link";
import { Button } from "./ui/Button";

function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <p className="font-bold text-sm">
            Thread<span className="text-red-600">it</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
