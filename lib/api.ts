import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, CreateNoteDto, Tag } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface ApiError {
  message: string;
  error?: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


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

// =======================
// CREATE note
// =======================
export const createNote = async (data: CreateNoteDto): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
};

// =======================
// DELETE note
// =======================
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};

// =======================
// GET note by id
// =======================
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
};

// =======================
// GET categories
// =======================
export const getCategories = async (): Promise<Tag[]> => {
  const response: AxiosResponse<Tag[]> = await api.get("/notes/categories");
  return response.data;
};