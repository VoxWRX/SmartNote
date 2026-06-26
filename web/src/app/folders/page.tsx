'use client';

import { useState } from 'react';
import { useFolders } from '../../hooks/useFolders';
import Link from 'next/link';

export default function FoldersPage() {
  const { folders, isLoading, createFolder, updateFolder, deleteFolder } = useFolders();
  const [newFolderName, setNewFolderName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = async () => {
    if (!newFolderName.trim()) return;
    await createFolder({ name: newFolderName });
    setNewFolderName('');
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;
    await updateFolder({ id, data: { name: editingName } });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('WARNING: Deleting this folder will permanently delete all notes inside it! Are you sure?')) {
      await deleteFolder(id);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'var(--text-color)' }}>
      <Link href="/" style={{ textDecoration: 'none', color: 'var(--accent-color)', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ marginBottom: '30px', color: 'var(--accent-color)' }}>Manage Folders</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          placeholder="New Folder Name" 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, backgroundColor: 'var(--sidebar-bg)', color: 'var(--text-color)' }}
        />
        <button onClick={handleCreate} style={{ padding: '10px 20px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Create Folder
        </button>
      </div>

      {isLoading ? (
        <p>Loading folders...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {folders.map(folder => (
            <li key={folder.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '10px', backgroundColor: 'var(--sidebar-bg)' }}>
              {editingId === folder.id ? (
                <div style={{ display: 'flex', gap: '10px', flex: 1, marginRight: '20px' }}>
                  <input 
                    type="text" 
                    value={editingName} 
                    onChange={e => setEditingName(e.target.value)} 
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                  />
                  <button onClick={() => handleUpdate(folder.id)} style={{ padding: '5px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '5px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              ) : (
                <span style={{ fontSize: '1.1rem' }}>📁 {folder.name}</span>
              )}

              {editingId !== folder.id && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setEditingId(folder.id); setEditingName(folder.name); }} style={{ padding: '5px 15px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(folder.id)} style={{ padding: '5px 15px', backgroundColor: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              )}
            </li>
          ))}
          {folders.length === 0 && <p style={{ color: 'var(--accent-color)' }}>No folders exist yet.</p>}
        </ul>
      )}
    </div>
  );
}
