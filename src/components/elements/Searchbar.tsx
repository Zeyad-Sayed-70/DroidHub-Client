"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSearchMutation } from "@/lib/features/search/searchApiSlice";
import useDebounce from "@/hooks/useDebounce";

const Searchbar = () => {
  const [search, { data, isLoading }] = useSearchMutation();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState(""); // State to hold the input value
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      search({ q: debouncedQuery });
    }
  }, [debouncedQuery, search]);

  return (
    <>
      <Input
        className="cursor-pointer bg-background"
        placeholder="Search DroidHub..."
        onClick={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search DroidHub..."
          value={query}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <CommandList>
          {isLoading ? (
            <div>Loading...</div>
          ) : data?.users && data.users.length ? (
            <CommandGroup heading="Results">
              {data.users.map((item) => (
                <CommandItem key={item._id}>{item.username}</CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Searchbar;
