import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/notes';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedPriority!: string | null;
  searchText: string = '';
  notesToShow = 10;
  noResultsFound = false;

  constructor(private noteService: NoteService, private router: Router) {}

  // Gets the notes from localStorage with the noteService's getNotes method
  ngOnInit() {
    this.notes = this.noteService
      .getNotes()
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, this.notesToShow);
  }

  // Navigates to note-edit page if you click the edit button
  edit(note: Note) {
    this.router.navigate(['/note-edit', note.id]);
  }

  // Deletes the note from localStorage if you click the delete button
  delete(note: Note) {
    this.noteService.delete(note);
    this.notes = this.noteService.getNotes();
  }

  // filterNotes function filters both searchText and selectedPriority. selectedPriority doesn't bring the items if it doesn't match to searchTerm.
  filterNotes() {
    const searchText = this.searchText.toLowerCase();
    if (this.selectedPriority) {
      this.notes = this.noteService.getNotes().filter(
        (note) =>
          note.content.toLowerCase().includes(searchText) &&
          note.priority === this.selectedPriority // filters for both cases
      );
    } else {
      this.notes = this.noteService
        .getNotes()
        .filter((note) => note.content.toLowerCase().includes(searchText))
        .slice(0, this.notesToShow);
    }
    this.noResultsFound = this.notes.length === 0;
  }

  showMore() {
    this.notesToShow += 10;
    this.filterNotes();
  }
}
