'use client';

import { useState } from 'react';
import { useTags } from '../../hooks/useTags';
import Link from 'next/link';

export default function TagsPage() {
  const { tags, isLoading, createTag, updateTag, deleteTag } = useTags();
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#000000');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingColor, setEditingColor] = useState('');

  const handleCreate = async () => {
    if (!newTagName.trim()) return;
    await createTag({ name: newTagName, color: newTagColor });
    setNewTagName('');
    setNewTagColor('#000000');
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;
    await updateTag({ id, data: { name: editingName, color: editingColor } });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id);
    } catch (err: any) {
      alert(`Could not delete tag. Make sure no notes are currently using it.\nError: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'var(--text-color)' }}>
      <Link href="/" style={{ textDecoration: 'none', color: 'var(--accent-color)', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ marginBottom: '30px', color: 'var(--accent-color)' }}>Manage Tags</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={newTagName}
          onChange={e => setNewTagName(e.target.value)}
          placeholder="New Tag Name" 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, backgroundColor: 'var(--sidebar-bg)', color: 'var(--text-color)' }}
        />
        <input 
          type="color" 
          value={newTagColor}
          onChange={e => setNewTagColor(e.target.value)}
          style={{ height: '40px', width: '60px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        />
        <button onClick={handleCreate} style={{ padding: '10px 20px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Create Tag
        </button>
      </div>

      {isLoading ? (
        <p>Loading tags...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tags.map(tag => (
            <li key={tag.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '10px', backgroundColor: 'var(--sidebar-bg)' }}>
              {editingId === tag.id ? (
                <div style={{ display: 'flex', gap: '10px', flex: 1, marginRight: '20px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={editingName} 
                    onChange={e => setEditingName(e.target.value)} 
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                  />
                  <input 
                    type="color" 
                    value={editingColor}
                    onChange={e => setEditingColor(e.target.value)}
                    style={{ height: '35px', width: '50px', padding: '0', border: 'none', cursor: 'pointer' }}
                  />
                  <button onClick={() => handleUpdate(tag.id)} style={{ padding: '5px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '5px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: tag.color || '#000' }} />
                  <span style={{ fontSize: '1.1rem' }}>{tag.name}</span>
                </div>
              )}

              {editingId !== tag.id && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setEditingId(tag.id); setEditingName(tag.name); setEditingColor(tag.color || '#000000'); }} style={{ padding: '5px 15px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(tag.id)} style={{ padding: '5px 15px', backgroundColor: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              )}
            </li>
          ))}
          {tags.length === 0 && <p style={{ color: 'var(--accent-color)' }}>No tags exist yet.</p>}
        </ul>
      )}
    </div>
  );
}
