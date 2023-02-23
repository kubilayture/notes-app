import { Injectable } from '@angular/core';
import { Note } from '../notes';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[];

  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: string): Note {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return note;
  }

  add(note: Note) {
    note.id = Date.now().toString();
    this.notes.push(note);
    this.save();
  }

  update(note: Note) {
    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = note;
      this.save();
    }
  }

  delete(note: Note) {
    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }

  private save() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
