import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { ILeagueFile } from 'src/app/models/interfaces/ILeagueFile';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { MigrationManagerService } from 'src/app/services/migration-manager.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  private _loadingWaitTimeComplete: BehaviorSubject<boolean>;
  private _processingComplete: BehaviorSubject<boolean>;
  public ShowSpinner: boolean;
  public Message: string = "Loading your leagues";

  constructor(private _mirgrationManager: MigrationManagerService, private _router: Router, private _dataManager: DataManagerService) { 
    this._loadingWaitTimeComplete = new BehaviorSubject<boolean>(false);
    this._processingComplete = new BehaviorSubject<boolean>(false);
    this.ShowSpinner = true;

    this._loadingWaitTimeComplete.subscribe(value => {this.EveryThingIsComplete()});
    this._processingComplete.subscribe(value => {this.EveryThingIsComplete()});
  }

  get ErrorOccured(): Observable<boolean> {
    return this._mirgrationManager.Error;
  }

  get ErrorMessage(): string {
    return this._mirgrationManager.ErrorMessage;
  }

  ngOnInit(): void {
    this._mirgrationManager.Migrating.pipe(filter(value => value)).subscribe(value => {
      this._processingComplete.next(true);
    });

    this._mirgrationManager.MigrateData();

    setTimeout(() => {this._loadingWaitTimeComplete.next(true); }, 1500);
  }

  private EveryThingIsComplete(){
    if(this._loadingWaitTimeComplete.value && this._processingComplete.value){
      this._dataManager.LoadLeagues().then((leagueFiles: ILeagueFile[]) => {
        if(leagueFiles.length == 0){
          this.Message = "Welcome to Bowling Buddy.<br> Lets create your first league.";
          setTimeout(() => {
            this._router.navigateByUrl('home/new-league');
          }, 2000);
        }
        else{
          this.Message = "Welcome back.";
          setTimeout(() => {
            this._router.navigateByUrl('home');
          }, 500);
        }
      });
    }
  }
}
