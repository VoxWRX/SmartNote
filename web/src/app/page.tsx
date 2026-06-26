'use client';

import { useState, useMemo } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useNotes, Note } from '../hooks/useNotes';
import { useFolders } from '../hooks/useFolders';
import { useTags } from '../hooks/useTags';
import { LockModal } from '../components/LockModal';
import { AISettingsModal } from '../components/AISettingsModal';

const THEME_COLORS = {
  light: '#fcfcfc',
  dark: '#121212',
  blue: '#f0f8ff',
  pink: '#fff0f5',
  slate: '#f8fafc'
};

export default function Home() {
  const { user, isLoading: userLoading } = useUser();
  const { notes, isLoading: notesLoading, createNote, updateNote, deleteNote } = useNotes();
  const { folders } = useFolders();
  const { tags } = useTags();
  
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorFolder, setEditorFolder] = useState<string>('');
  const [editorTags, setEditorTags] = useState<string[]>([]);
  
  // Modals & States
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  const [lockModalMode, setLockModalMode] = useState<'lock' | 'unlock' | null>(null);
  const [noteToUnlock, setNoteToUnlock] = useState<Note | null>(null);
  const [unlockedNotes, setUnlockedNotes] = useState<Set<string>>(new Set());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'locked' | 'favorites'>('all');

  // Filtered Notes
  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      // Sidebar filters
      if (activeFilter === 'locked' && !n.isLocked) return false;
      if (activeFilter === 'all' && n.isLocked) return false; // Hide locked from 'all' by default (or user wants them only in locked?)
      // Actually user said: "add a locked note folder in the sidebar and when the note is locked push it to this folder"
      // So let's hide locked notes from the general view if not in 'locked' filter
      if (activeFilter !== 'locked' && n.isLocked) return false;

      // Search filters
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(q);
        const matchesDate = new Date(n.updatedAt).toLocaleDateString().includes(q);
        const matchesTags = n.tags?.some(t => t.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDate && !matchesTags) return false;
      }
      return true;
    });
  }, [notes, activeFilter, searchQuery]);

  if (userLoading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading session...</div>;

  if (!user) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--sidebar-bg)' }}>
          <h1 className="handwriting" style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--accent-color)' }}>Smart Note</h1>
          <p style={{ marginBottom: '30px', fontSize: '1.2rem' }}>Welcome! Please log in to view and create your zen notes.</p>
          <a href="/auth/login" style={{ padding: '12px 24px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', borderRadius: '25px', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none' }}>
            Log In / Register
          </a>
        </div>
      </div>
    );
  }

  const handleNoteClick = (note: Note) => {
    if (note.isLocked && !unlockedNotes.has(note.id)) {
      setNoteToUnlock(note);
      setLockModalMode('unlock');
      return;
    }
    setActiveNote(note);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setEditorFolder(note.folderId || '');
    setEditorTags(note.tags?.map(t => t.id) || []);
  };

  const handleNewNote = () => {
    setActiveNote(null);
    setEditorTitle('');
    setEditorContent('');
    setEditorFolder('');
    setEditorTags([]);
  };

  const handleSave = async () => {
    if (!editorTitle) return alert('Please enter a title');
    
    const noteData = {
      title: editorTitle,
      content: editorContent,
      folderId: editorFolder || undefined,
      tags: editorTags
    };

    if (activeNote) {
      await updateNote({ id: activeNote.id, data: noteData });
    } else {
      const created = await createNote(noteData);
      setActiveNote(created);
    }
  };

  const handleDelete = async () => {
    if (!activeNote) return;
    if (confirm('Are you sure you want to delete this note?')) {
      await deleteNote(activeNote.id);
      handleNewNote();
    }
  };

  const handleLockSubmit = async (password: string) => {
    if (lockModalMode === 'lock' && activeNote) {
      // Call API to set lock and password
      await updateNote({ id: activeNote.id, data: { isLocked: true, password } });
      setLockModalMode(null);
      // Remove from unlocked set if locking
      const nextUnlocked = new Set(unlockedNotes);
      nextUnlocked.delete(activeNote.id);
      setUnlockedNotes(nextUnlocked);
      handleNewNote(); // Clear editor
    } else if (lockModalMode === 'unlock' && noteToUnlock) {
      // Verification logic: Since we don't have the password verify endpoint explicitly yet,
      // In a real app we would POST /notes/:id/unlock {password} -> gets true/false
      // For now we will unlock on the client for UI purposes, but backend API should handle real unlock validation
      const nextUnlocked = new Set(unlockedNotes);
      nextUnlocked.add(noteToUnlock.id);
      setUnlockedNotes(nextUnlocked);
      setLockModalMode(null);
      
      // Load it into editor
      setActiveNote(noteToUnlock);
      setEditorTitle(noteToUnlock.title);
      setEditorContent(noteToUnlock.content);
      setEditorFolder(noteToUnlock.folderId || '');
      setEditorTags(noteToUnlock.tags?.map(t => t.id) || []);
      setNoteToUnlock(null);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 className="handwriting" style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--accent-color)' }}>
          Smart Note
        </h1>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li onClick={() => setActiveFilter('all')} style={{ marginBottom: '15px', fontWeight: activeFilter === 'all' ? 'bold' : 500, cursor: 'pointer', color: activeFilter === 'all' ? 'var(--accent-color)' : 'inherit' }}>📝 All Notes</li>
            <li style={{ marginBottom: '15px', fontWeight: 500, cursor: 'pointer' }}><a href="/folders" style={{ textDecoration: 'none', color: 'inherit' }}>📁 Manage Folders</a></li>
            <li style={{ marginBottom: '15px', fontWeight: 500, cursor: 'pointer' }}><a href="/tags" style={{ textDecoration: 'none', color: 'inherit' }}>🏷️ Manage Tags</a></li>
            <li onClick={() => setActiveFilter('favorites')} style={{ marginBottom: '15px', fontWeight: activeFilter === 'favorites' ? 'bold' : 500, cursor: 'pointer', color: activeFilter === 'favorites' ? 'var(--accent-color)' : 'inherit' }}>⭐ Favorites</li>
            <li onClick={() => setActiveFilter('locked')} style={{ marginBottom: '15px', fontWeight: activeFilter === 'locked' ? 'bold' : 500, cursor: 'pointer', color: activeFilter === 'locked' ? 'var(--accent-color)' : 'inherit' }}>🔒 Locked Notes</li>
          </ul>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '10px' }}><a href="/about" style={{ textDecoration: 'none', color: 'var(--accent-color)' }}>About Smart Note</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/guide" style={{ textDecoration: 'none', color: 'var(--accent-color)' }}>User Guide</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/privacy" style={{ textDecoration: 'none', color: 'var(--accent-color)' }}>Privacy Policy</a></li>
            </ul>
          </div>
        </nav>
        
        <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img src={user.picture || ''} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a href="/auth/logout" style={{ fontSize: '0.8rem', color: 'var(--accent-color)', textDecoration: 'underline' }}>Log Out</a>
            <button onClick={() => setIsAISettingsOpen(true)} style={{ fontSize: '0.8rem', background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}>⚙️ AI</button>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>Theme:</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
            {(Object.entries(THEME_COLORS)).map(([theme, color]) => (
               <button 
                 key={theme} 
                 onClick={() => document.documentElement.setAttribute('data-theme', theme)}
                 style={{ 
                   width: '24px', 
                   height: '24px', 
                   borderRadius: '50%', 
                   border: '2px solid var(--border-color)',
                   backgroundColor: color,
                   cursor: 'pointer'
                 }} 
                 title={theme}
               />
            ))}
          </div>
        </div>
      </aside>
      
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <input 
            type="search" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Title, Date, or Tag..." 
            style={{ 
              padding: '12px 20px', 
              borderRadius: '25px', 
              border: '1px solid var(--border-color)',
              width: '400px',
              backgroundColor: 'var(--sidebar-bg)',
              color: 'var(--text-color)',
              outline: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          <div>
            <button onClick={handleNewNote} style={{ 
              padding: '10px 20px', 
              backgroundColor: 'var(--accent-color)', 
              color: 'var(--bg-color)', 
              borderRadius: '20px',
              fontWeight: 600,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer',
              border: 'none'
            }}>
              + New Note
            </button>
          </div>
        </header>

        <section style={{ display: 'flex', gap: '30px', flex: 1, overflow: 'hidden' }}>
          {/* Notes List Column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '15px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>
              {activeFilter === 'locked' ? 'Locked Notes' : 'Recent Notes'}
            </h2>
            
            {notesLoading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredNotes.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>No notes found.</p>}
                {filteredNotes.map(note => (
                  <div key={note.id} onClick={() => handleNoteClick(note)} style={{
                    padding: '15px',
                    borderRadius: '12px',
                    border: activeNote?.id === note.id ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: 'var(--sidebar-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                        {note.isLocked && '🔒 '} {note.title || 'Untitled'}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {(!note.isLocked || unlockedNotes.has(note.id)) && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {note.content || 'Empty note'}
                      </p>
                    )}
                    {note.isLocked && !unlockedNotes.has(note.id) && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)', filter: 'blur(4px)', userSelect: 'none' }}>
                        This content is hidden from view
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editor Column */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              flex: 1, 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px',
              padding: '30px',
              backgroundColor: 'var(--bg-color)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Editor Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="Note Title" 
                  style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-color)',
                    outline: 'none',
                    flex: 1
                  }}
                />
                {activeNote && (
                  <button 
                    title="Lock Note"
                    onClick={() => {
                      if (!activeNote.isLocked) {
                        setLockModalMode('lock');
                      }
                    }} 
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: activeNote.isLocked ? 'default' : 'pointer' }}
                  >
                    {activeNote.isLocked ? '🔒' : '🔓'}
                  </button>
                )}
              </div>

              {/* Organization Tools */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <select 
                  value={editorFolder} 
                  onChange={e => setEditorFolder(e.target.value)}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-color)' }}
                >
                  <option value="">No Folder</option>
                  {folders.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>

                <select 
                  multiple 
                  value={editorTags} 
                  onChange={e => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setEditorTags(options);
                  }}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-color)', height: '36px', minWidth: '150px' }}
                >
                  {tags.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', alignSelf: 'center' }}>(Cmd/Ctrl click to multi-select tags)</span>
              </div>

              <textarea 
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Start typing your zen thoughts here..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-color)',
                  outline: 'none',
                  resize: 'none',
                  fontSize: '1.1rem',
                  lineHeight: '1.8'
                }}
              />
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  onClick={handleDelete} 
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ff4444', color: '#ff4444', cursor: 'pointer', background: 'transparent' }}
                  disabled={!activeNote}
                >
                  Delete Note
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'transparent', color: 'var(--text-color)' }} onClick={() => alert('AI summarize initiated!')}>
                    🤖 AI Assist
                  </button>
                  <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', cursor: 'pointer', border: 'none' }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar / Tools Column */}
          <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '15px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>Calendar</h2>
            <div style={{ 
              height: '300px', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: 'var(--sidebar-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 600 }}>{new Date().getDate()}</div>
                <div style={{ color: 'var(--accent-color)' }}>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AISettingsModal isOpen={isAISettingsOpen} onClose={() => setIsAISettingsOpen(false)} />
      <LockModal 
        isOpen={lockModalMode !== null} 
        noteTitle={lockModalMode === 'lock' ? activeNote?.title || 'Note' : noteToUnlock?.title || 'Note'}
        onClose={() => { setLockModalMode(null); setNoteToUnlock(null); }}
        onSubmit={handleLockSubmit}
      />
    </div>
  );
}
