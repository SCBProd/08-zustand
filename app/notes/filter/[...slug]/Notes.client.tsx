"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import type { Tag } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  tag?: string;
};

// безпечна перевірка enum Tag
const isTag = (value?: string): value is Tag => {
  if (!value) return false;

  return (
    value === "Work" ||
    value === "Personal" ||
    value === "Meeting" ||
    value === "Shopping" ||
    value === "Todo"
  );
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, tag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        tag: isTag(tag) ? tag : undefined,
        search: debouncedSearch || undefined,
      }),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  const notes = data?.notes ?? [];

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />

      <Link href="/notes/action/create">
        Create note
      </Link>

      {notes.length > 0 && <NoteList notes={notes} />}

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        setPage={setPage}
      />
    </>
  );
}