'use server';

import { auth0 } from '../lib/auth0';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const tokenObj = await auth0.getAccessToken();
  const token = typeof tokenObj === 'string' ? tokenObj : (tokenObj as any)?.token;
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error: ${error}`);
  }

  return res.json();
}

// NOTES
export async function getNotes() {
  return fetchWithAuth('/notes');
}

export async function createNote(data: { title: string; content: string; folderId?: string; tags?: string[] }) {
  return fetchWithAuth('/notes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateNote(id: string, data: any) {
  return fetchWithAuth(`/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteNote(id: string) {
  return fetchWithAuth(`/notes/${id}`, {
    method: 'DELETE',
  });
}

// FOLDERS
export async function getFolders() {
  return fetchWithAuth('/folders');
}

export async function createFolder(data: { name: string }) {
  return fetchWithAuth('/folders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateFolder(id: string, data: { name: string }) {
  return fetchWithAuth(`/folders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteFolder(id: string) {
  return fetchWithAuth(`/folders/${id}`, {
    method: 'DELETE',
  });
}

// TAGS
export async function getTags() {
  return fetchWithAuth('/tags');
}

export async function createTag(data: { name: string; color?: string }) {
  return fetchWithAuth('/tags', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTag(id: string, data: { name: string; color?: string }) {
  return fetchWithAuth(`/tags/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteTag(id: string) {
  return fetchWithAuth(`/tags/${id}`, {
    method: 'DELETE',
  });
}
