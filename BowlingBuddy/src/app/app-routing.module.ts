import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { ManageTeamsComponent } from './pages/manage-teams/manage-teams.component';
import { WeeklyTabsComponent } from './pages/weekly-tabs/weekly-tabs.component';

const routes: Routes = [
  { path: 'new-league', component: CreateLeagueComponent },
  { path: 'weekly-tabs', component: WeeklyTabsComponent },
  { path: 'manage-teams', component: ManageTeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
