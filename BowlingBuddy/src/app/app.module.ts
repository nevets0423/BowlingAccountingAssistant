import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { ManageTeamsComponent } from './pages/manage-teams/manage-teams.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './pages/header/header.component';
import { AgGridModule } from 'ag-grid-angular';
import { CheckBoxCellRendererComponent } from './grid-render-components/check-box-cell-renderer/check-box-cell-renderer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputCellRendererComponent } from './grid-render-components/text-input-cell-renderer/text-input-cell-renderer.component';
import { WeekDisplayComponent } from './pages/week-display/week-display.component';
import { WeeklyTabsComponent } from './pages/weekly-tabs/weekly-tabs.component';
import { GenericInputCellRendererComponent } from './grid-render-components/generic-input-cell-renderer/generic-input-cell-renderer.component';
import { ManageLeaguesComponent } from './pages/manage-leagues/manage-leagues.component';
import { ButtonCellRendereComponent } from './grid-render-components/button-cell-renderer/button-cell-renderer.component';
import { WelcomeScreenComponent } from './pages/welcome-screen/welcome-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateLeagueComponent,
    ManageTeamsComponent,
    HeaderComponent,
    CheckBoxCellRendererComponent,
    TextInputCellRendererComponent,
    WeekDisplayComponent,
    WeeklyTabsComponent,
    GenericInputCellRendererComponent,
    ManageLeaguesComponent,
    ButtonCellRendereComponent,
    WelcomeScreenComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxElectronModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
