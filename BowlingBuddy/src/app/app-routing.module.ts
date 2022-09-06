import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';

const routes: Routes = [
  { path: 'new-league', component: CreateLeagueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
