import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/notes';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  note!: Note;
  noteForm!: FormGroup;

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Renders the note-edit/note.id page when click the edit button of the selected note-item on note-list page
  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id'); // Gets note.id and routes to note-edit/note-id
    this.note = this.noteService.getNoteById(noteId ?? '');
    if (!this.note) {
      this.router.navigate(['/note-list']);
    }
    this.noteForm = this.formBuilder.group({
      content: [this.note.content, Validators.required],
      priority: [this.note.priority, [Validators.required]],
    });
  }

  // Updates the note-item without changing the id and redirects to note-list page
  onSubmit(): void {
    const updatedNote = {
      id: this.note.id,
      ...this.noteForm.value,
    };
    this.noteService.update(updatedNote);
    this.router.navigate(['/note-list']);
  }
}
