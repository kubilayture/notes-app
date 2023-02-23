import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/notes';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent {
  @Input() note!: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();

  editNote() {
    this.edit.emit(this.note);
  }

  deleteNote() {
    this.delete.emit(this.note);
  }
}
