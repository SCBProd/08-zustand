///app\notes\filter\[...slug]\page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Tag } from "@/types/note";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

// type guard
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

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";

  const rawTag = slug?.[0];
  const tag = rawTag === "all" ? undefined : rawTag;

  const safeTag = isTag(tag) ? tag : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, safeTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        tag: safeTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={safeTag} />
    </HydrationBoundary>
  );
}