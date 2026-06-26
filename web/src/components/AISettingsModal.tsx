'use client';
import { useState, useEffect } from 'react';

export function AISettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [port, setPort] = useState('11434');

  useEffect(() => {
    if (isOpen) {
      setProvider(localStorage.getItem('ai_provider') || 'openai');
      setApiKey(localStorage.getItem('ai_api_key') || '');
      setPort(localStorage.getItem('ai_port') || '11434');
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('ai_provider', provider);
    localStorage.setItem('ai_api_key', apiKey);
    localStorage.setItem('ai_port', port);
    onClose();
  };

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
        <h2 style={{ marginBottom: '20px', color: 'var(--accent-color)' }}>AI Settings</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Provider</label>
          <select 
            value={provider} 
            onChange={e => setProvider(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
            <option value="ollama">Ollama (Local)</option>
            <option value="lmstudio">LMStudio (Local)</option>
          </select>
        </div>

        {['openai', 'gemini'].includes(provider) && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>API Key</label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={e => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
            <small style={{ color: 'var(--accent-color)', display: 'block', marginTop: '5px' }}>Stored securely in your browser's localStorage.</small>
          </div>
        )}

        {['ollama', 'lmstudio'].includes(provider) && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Local Port</label>
            <input 
              type="text" 
              value={port} 
              onChange={e => setPort(e.target.value)}
              placeholder="e.g. 11434"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', background: 'transparent', color: 'var(--text-color)' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', cursor: 'pointer', border: 'none' }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
