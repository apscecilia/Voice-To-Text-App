'use client';

import { useState, useEffect } from 'react';
import { getDocuments, updateDocument, deleteDocument } from '@/lib/firebase/firebaseUtils';
import { Note } from '@/lib/types/note';
import { format } from 'date-fns';

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const fetchedNotes = await getDocuments('notes');
    setNotes(fetchedNotes.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleSave = async () => {
    if (editingNote && editingNote.id) {
      await updateDocument('notes', editingNote.id, {
        ...editingNote,
        updatedAt: new Date().toISOString(),
      });
      setEditingNote(null);
      loadNotes();
    }
  };

  const handleDelete = async (noteId: string) => {
    await deleteDocument('notes', noteId);
    loadNotes();
  };

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No notes recorded yet. Click the record button to start.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Previous Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          {editingNote?.id === note.id ? (
            <div className="space-y-4">
              <textarea
                value={editingNote.text}
                onChange={(e) => setEditingNote({ ...editingNote, text: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingNote(null)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-800 whitespace-pre-wrap">{note.text}</p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>
                  <p>Created: {format(new Date(note.timestamp), 'PPpp')}</p>
                  {note.updatedAt && (
                    <p>Updated: {format(new Date(note.updatedAt), 'PPpp')}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id!)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
} 