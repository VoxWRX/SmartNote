import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, updateNote, deleteNote } from '../actions/api';

export type Note = {
  id: string;
  title: string;
  content: string;
  isLocked: boolean;
  folderId?: string;
  tags?: { id: string, name: string, color?: string }[];
  updatedAt: string;
  createdAt: string;
};

export function useNotes() {
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const data = await getNotes();
      return data as Note[];
    },
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    error: notesQuery.error,
    createNote: createMutation.mutateAsync,
    updateNote: updateMutation.mutateAsync,
    deleteNote: deleteMutation.mutateAsync,
  };
}
