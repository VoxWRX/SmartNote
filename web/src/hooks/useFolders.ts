import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFolders, createFolder, updateFolder, deleteFolder } from '../actions/api';

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
};

export function useFolders() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const data = await getFolders();
      return data as Folder[];
    },
  });

  const createMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => updateFolder(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // Deleting a folder deletes notes inside it
    },
  });

  return {
    folders: query.data || [],
    isLoading: query.isLoading,
    createFolder: createMutation.mutateAsync,
    updateFolder: updateMutation.mutateAsync,
    deleteFolder: deleteMutation.mutateAsync,
  };
}
