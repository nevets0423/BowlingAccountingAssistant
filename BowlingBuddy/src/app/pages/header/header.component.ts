import { Component, OnInit } from '@angular/core';
import { filter, skip, take } from 'rxjs';
import { LeagueFile } from 'src/app/models/LeagueFile';
import { DataManagerService } from 'src/app/services/data-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  leagueFiles: LeagueFile[] = [];
  selectedLeague: string = "";
  loading: boolean = true;

  constructor(private _dataManager: DataManagerService) { }

  ngOnInit(): void {
    this._dataManager.OnReady.pipe(filter(value => value), take(1)).subscribe(() => {
      this._dataManager.Leagues.pipe(filter(value => value != null), skip(1)).subscribe(leagueFiles => {
        this.leagueFiles = leagueFiles;
        this.loading = false;
      });
      this._dataManager.LoadLeagues();
    });
  }

  onSelectionChanged(){
    this._dataManager.LoadLeague(this.selectedLeague);
  }
}
