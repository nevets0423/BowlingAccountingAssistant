import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip, take } from 'rxjs';
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
  showDropDown: boolean = true;

  constructor(private _dataManager: DataManagerService, private _router: Router) { }

  get LoadingLeagues(){
    return this._dataManager.LoadingLeagues;
  }

  get AnyLeagues(){
    return this.leagueFiles.length > 0;
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

  get NoLeagueSelected() {
    return this.selectedLeague == "";
  }

  ngOnInit(): void {
    this._dataManager.OnReady.pipe(filter(value => value), take(1)).subscribe(() => {
      this._dataManager.Leagues.pipe(filter(value => value != null), skip(1)).subscribe(leagueFiles => {
        this.leagueFiles = leagueFiles;
        this.loading = false;
      });
      this._dataManager.LoadLeagues();
    });

    this._dataManager.NewLeagueCreated.pipe(filter(value => value != null)).subscribe(leagueFile => {
      if(leagueFile == null){
        return;
      }
      this.selectedLeague = leagueFile.FileName;
      this._dataManager.LoadLeague(this.selectedLeague);
      this._router.navigate(['/manage-teams']);
    });

    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      let navigationEnd = event as NavigationEnd;
      if(navigationEnd.url == '/manage-league'){
        this.showDropDown = false;
      }
      else{
        this.showDropDown = true;
      }
    });
  }

  onSelectionChanged(){
    this._dataManager.LoadLeague(this.selectedLeague);
    this._router.navigate(['/weekly-tabs']);
  }
}
