"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Prisma, Subreddit } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-click-outside";

function SearchBar() {
  const commandRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["search-query"],
    // Instead of fetching when rendering happens, we fetch when the user is typing.
    enabled: false,
    queryFn: async () => {
      if (!input) return [];

      const { data } = await axios.get(`/api/search?q=${input}`);

      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities"
      />

      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found</CommandEmpty>}

          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communuties">
              {queryResults?.map((subreddit) => (
                <CommandItem
                  key={subreddit.id}
                  value={subreddit.name}
                  onSelect={(e) => {
                    router.push(`/t/${e}`);
                    router.refresh();
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/t/${subreddit.name}`}>t/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
}

export default SearchBar;
