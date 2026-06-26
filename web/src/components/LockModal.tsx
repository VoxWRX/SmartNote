'use client';
import { useState } from 'react';

export function LockModal({ 
  isOpen, 
  noteTitle, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  noteTitle: string; 
  onClose: () => void; 
  onSubmit: (password: string) => void;
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--sidebar-bg)', padding: '30px', borderRadius: '12px',
        width: '400px', border: '1px solid var(--border-color)', color: 'var(--text-color)'
      }}>
        <h2 style={{ marginBottom: '10px', color: 'var(--accent-color)' }}>Lock Note</h2>
        <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>Enter a password to lock/unlock <strong>{noteTitle}</strong></p>
        
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"}
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'transparent', color: 'var(--text-color)' }}>Cancel</button>
          <button 
            onClick={() => {
              onSubmit(password);
              setPassword('');
            }} 
            style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', cursor: 'pointer', border: 'none' }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
