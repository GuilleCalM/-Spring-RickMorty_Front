import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListCharacterComponent } from './list-character/list-character.component';

export const routes: Routes = [
    { path: '', component: ListCharacterComponent},
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];
