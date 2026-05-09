"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

const NoteDetailsClient = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!note) return <p>Note not found</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
    : `Created at: ${new Date(note.createdAt).toLocaleString()}`;

  return (
    <Modal onClose={() => router.back()}>
      <div>
        <button onClick={() => router.back()}>
          Close
        </button>

        <h2>{note.title}</h2>
        <p>{note.content}</p>

        {note.tag && <p>Tag: {note.tag}</p>}

        <p>{formattedDate}</p>
      </div>
    </Modal>
  );
};

export default NoteDetailsClient;