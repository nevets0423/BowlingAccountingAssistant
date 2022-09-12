import { Component, OnInit } from '@angular/core';
import { filter, of, skip, take } from 'rxjs';
import { ILeagueFile } from '../../models/interfaces/ILeagueFile';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  leagueFiles: ILeagueFile[] = [];
  selectedLeague: string = "";
  loading: boolean = true;

  constructor(private _dataManager: DataManagerService) { }

  get LoadingLeagues(){
    return this._dataManager.LoadingLeagues;
  }

  get LoadingLeagueInfo(){
    return this._dataManager.LoadingLeagueInfo;
  }

  get Dirty(){
    return this._dataManager.Dirty;
  }

  get Saving(){
    return this._dataManager.Saving;
  }

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
