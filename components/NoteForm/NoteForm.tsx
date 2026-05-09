"use client";

import { createNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/stores/noteStore";
import type { CreateNoteDto } from "@/types/note";
import styles from "./NoteForm.module.css";

type Props = {
  categories: string[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      ...draft,
      [name]: value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: CreateNoteDto = {
      title: String(formData.get("title") || ""),
      content: String(formData.get("content") || ""),
      tag: formData.get("tag") as CreateNoteDto["tag"],
    };

    mutate(values);
  };

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </label>

      <label>
        Tag
        <select
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          {categories.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;