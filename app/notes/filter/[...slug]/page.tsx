///app\notes\filter\[...slug]\page.tsx

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = slug?.[0] !== "all" ? slug?.[0] : "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        tag: tag || undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}