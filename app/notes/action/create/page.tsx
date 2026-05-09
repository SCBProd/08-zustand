import type { Metadata } from "next";

import css from "./CreateNote.module.css";

import { getCategories } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub application.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub application.",
    url: "https://your-domain.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note - NoteHub",
      },
    ],
  },
};

const CreateNote = async () => {
  const categories = await getCategories();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm categories={categories} />
      </div>
    </main>
  );
};

export default CreateNote;