import { Component } from '@angular/core';
import { MigrationManagerService } from './services/migration-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'BowlingBuddy';

  constructor() { }
}
