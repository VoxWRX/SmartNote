import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTags, createTag, updateTag, deleteTag } from '../actions/api';

export type Tag = {
  id: string;
  name: string;
  color?: string;
};

export function useTags() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const data = await getTags();
      return data as Tag[];
    },
  });

  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; color?: string } }) => updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
  });

  return {
    tags: query.data || [],
    isLoading: query.isLoading,
    createTag: createMutation.mutateAsync,
    updateTag: updateMutation.mutateAsync,
    deleteTag: deleteMutation.mutateAsync,
  };
}
