import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVersion } from '../models/interfaces/IVersion';
import { Version } from '../models/Version';
import { Path } from './../Helpers/file-path-builder';
import { FileManagerService } from './file-manager.service';
import { preDataSaveObject } from './migration-models/pre-electron-models/pre-data-save-object';
import { v1_0_0_IAutoNum } from './migration-models/v1.0.0-models/v1.0.0-IAutoNum';
import { v1_0_0_IDataSaveObject } from './migration-models/v1.0.0-models/v1.0.0-IDataSaveObject';
import { v1_0_0_ILeagueInfo } from './migration-models/v1.0.0-models/v1.0.0-ILeagueInfo';
import { v1_0_0_IMigrationInfo } from './migration-models/v1.0.0-models/v1.0.0-IMigrationInfo';
import { v1_0_0_IPlayerInfo } from './migration-models/v1.0.0-models/v1.0.0-IPlayerInfo';
import { v1_0_0_ITeamInfoDTO } from './migration-models/v1.0.0-models/v1.0.0-ITeamInfoDTO';
import { v1_0_0_IVersion } from './migration-models/v1.0.0-models/v1.0.0-IVersion';

@Injectable({
  providedIn: 'root'
})
export class MigrationManagerService {
  private _lockHeader: boolean = true;
  private _error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _migrating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _errorMessage: string = "";
  private _pathToDocuments: string = "";
  private _mainFolderName: string = "BowlerBuddy";
  private _leagueFolderName: string = "Leagues";
  private _arichiveFolderName: string = "Archive";

  constructor(private _fileManager: FileManagerService) { }

  get LockHeader(){
    return this._lockHeader;
  }

  unlockHeader(){
    this._lockHeader = false;
  }

  MigrateData(){
    this._migrating.next(true);
    this._fileManager.GetPath("documents", (value: string) => { 
      this._pathToDocuments = value;
      this.MigratePreElectron();
      this.RunMigrations();
    }, (value: any) => this.HandleError(value));
  }

  /*
    A section to run any migration scripts to up data from a version to the next version
    -----This is not ment to upgrade from pre electron to electron.----

    Outline to later implimentation:
      -get a list of leagues
      -check version against current version
      -if not the same
        -check for any migrations between file version and current version
        -if any run migrations in order
      -update version in file to current 
      -save file back
  */
  private RunMigrations(){

  }

  private MigratePreElectron(){
    let pathToOldSave = Path.Create(this._pathToDocuments, this._mainFolderName, "BowlerBuddy.sav");
    this._fileManager.FileExists(pathToOldSave, (exists: boolean) => {
      if(!exists){
        return;
      }

      this._fileManager.ReadFile(pathToOldSave, (content: string) => {
        if(!content){
          console.log("File was empty. No migration needed.", content);
          let destinationPath = Path.Create(this._pathToDocuments, this._mainFolderName, this._arichiveFolderName, "BowlerBuddy.sav");
          this.ArchiveFile(pathToOldSave, destinationPath);
          return;
        }

        let dataSaveObject: preDataSaveObject = JSON.parse(content);
        if(!dataSaveObject){
          console.error("Failed to load old league data. skipping migration.", content);
          return;
        }

        let newLeagueDataSaveObjects = dataSaveObject.Leagues.map(league => {
          return {
            AutoNumber: {
              LeagueId: dataSaveObject.AutoNum.LeageId,
              PlayerId: dataSaveObject.AutoNum.PlayerId,
              TeamId: dataSaveObject.AutoNum.TeamId
            } as v1_0_0_IAutoNum,
            MirgrationInfo: {
              LastMigrationRun: 0,
              LastRunOnVersion: new Version({Major: 1, Minor: 0, Revision: 0} as IVersion),
              LastRunOnVersionInterface: {
                Major: 1,
                Minor: 0, 
                Revision: 0
              } as v1_0_0_IVersion
            } as v1_0_0_IMigrationInfo,
            LeagueInfo: {
              ID: league.Id,
              LaneFee: league.LaneFee,
              Name: league.Name,
              NumberOfWeeks: league.NumberOfWeeks,
              PrizeAmountPerWeek: league.PrizeAmountPerWeek
            } as v1_0_0_ILeagueInfo,
            PlayerInfos: dataSaveObject.Teams.filter(team => team.LeagueId == league.Id).map(team => team.Players.map(player => { return {
              ID: player.Id,
              AmountPaidEachWeek: player.AmountPaidEachWeek,
              Name: player.Name,
              TeamID: player.TeamId,
              WeekEnded: player.WeekEnded,
              WeekStarted: player.WeekStarted
            } as v1_0_0_IPlayerInfo})).flat(),
            TeamInfos: dataSaveObject.Teams.map(team => {return {
              ID: team.Id,
              LeagueID: team.LeagueId
            } as v1_0_0_ITeamInfoDTO})
          } as v1_0_0_IDataSaveObject;
        });

        newLeagueDataSaveObjects.forEach(leagueSaveData => {
          var fileName = leagueSaveData.LeagueInfo.Name + ".sav";
          this._fileManager.WriteToFile(Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, fileName), JSON.stringify(leagueSaveData), (content: string)=> {
            console.log("League Saved", leagueSaveData.LeagueInfo.Name);
          }, (value: any) => this.HandleError(value));
        });
        
        let destinationPath = Path.Create(this._pathToDocuments, this._mainFolderName, this._arichiveFolderName, "BowlerBuddy.sav");
        this.ArchiveFile(pathToOldSave, destinationPath);
      }, this.HandleError);
    });
  }

  private ArchiveFile(sourcePath: string, destinationPath: string){
    if(sourcePath == null || sourcePath.length == 0){
      return;
    }

    if(destinationPath == null || destinationPath.length == 0){
      return;
    }

    this._fileManager.MoveFile(sourcePath, destinationPath, (content: string) => {
      console.log("File Archived");
    }, (value: any) => this.HandleError(value));
  }

  private HandleError(error: any){
    console.error(error);
    this._errorMessage = error;
    this._error.next(true);
    this._migrating.next(false);
  }
}
