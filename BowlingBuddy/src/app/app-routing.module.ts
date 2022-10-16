import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { ManageLeaguesComponent } from './pages/manage-leagues/manage-leagues.component';
import { ManageTeamsComponent } from './pages/manage-teams/manage-teams.component';
import { WeeklyTabsComponent } from './pages/weekly-tabs/weekly-tabs.component';
import { WelcomeScreenComponent } from './pages/welcome-screen/welcome-screen.component';

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  { path: 'new-league', component: CreateLeagueComponent },
  { path: 'weekly-tabs', component: WeeklyTabsComponent },
  { path: 'manage-teams', component: ManageTeamsComponent },
  { path: 'manage-league', component: ManageLeaguesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
