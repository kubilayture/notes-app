import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteAddComponent } from './components/note-add/note-add.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'note-list', component: NoteListComponent, canActivate: [AuthGuard] },
  { path: 'note-add', component: NoteAddComponent, canActivate: [AuthGuard] },
  {
    path: 'note-edit/:id',
    component: NoteEditComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
