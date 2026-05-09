// lib\api.ts

import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, CreateNoteDto } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface ApiError {
  message: string;
  error?: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// GET notes
export const fetchNotes = async (params: {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}): Promise<NotesResponse> => {
  const response: AxiosResponse<NotesResponse> = await api.get("/notes", {
    params,
  });

  return response.data;
};

// CREATE note
export const createNote = async (data: NewNoteData) => {
  const res = await axios.post<Note>('/notes', data);
  return res.data;
};

// DELETE note
export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);

  return response.data;
};

// GET note by id
export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);

  return response.data;
}; 
// GET all categories
export const getCategories = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await api.get("/notes/categories");

  return response.data;
};