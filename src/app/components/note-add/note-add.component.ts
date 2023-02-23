import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/notes';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss'],
})
export class NoteAddComponent {
  content = '';
  priority = "Orta";
  priorities = ["Düşük", "Orta", "Yüksek"];

  constructor(private noteService: NoteService, private router: Router) {}

  onSubmit() {
    const newNote = new Note({
      content: this.content,
      priority: this.priority,
    });
    this.noteService.add(newNote);
    this.router.navigate(['/note-list']);
  }

  isValid() {
    return this.content.trim() !== '';
  }
}
