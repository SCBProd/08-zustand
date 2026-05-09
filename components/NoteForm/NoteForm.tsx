"use client";

import { createNote, NewNoteData } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/stores/noteStore";
import styles from "./NoteForm.module.css";

type Props = {
  categories: string[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

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
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <label className={styles.label}>
        Title
        <input
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          name="content"
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Category
        <select
          name="categoryId"
          defaultValue={draft.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel</button>
      </div>
    </form>
  );
};

export default NoteForm;