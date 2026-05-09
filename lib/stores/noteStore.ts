"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteDto } from "@/types/note";

type NoteDraftStore = {
  draft: CreateNoteDto;
  setDraft: (note: CreateNoteDto) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteDto = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set(() => ({
          draft: note,
        })),

      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);