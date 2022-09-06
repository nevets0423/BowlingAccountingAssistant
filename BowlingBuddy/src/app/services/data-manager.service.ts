import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { AutoNum } from '../models/AutoNum';
import { BehaviorSubjectArray } from '../models/BehaviorSubjectArray';
import { IAutoNum } from '../models/interfaces/IAutoNum';
import { IDataSaveObject } from '../models/interfaces/IDataSaveObject';
import { ILeagueFile } from '../models/interfaces/ILeagueFile';
import { ILeagueInfo } from '../models/interfaces/ILeagueInfo';
import { IMigrationInfo } from '../models/interfaces/IMigrationInfo';
import { IPlayerInfo } from '../models/interfaces/IPlayerInfo';
import { ITeamInfo } from '../models/interfaces/ITeamInfo';
import { Version } from '../models/Version';
import { FileManagerService } from './file-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  private _pathToDocuments: string = "";
  private _mainFolderName: string = "BowlerBuddy";
  private _leagueFolderName: string = "Leagues";
  private _loadedLeagueFileName: string = "";
  private _loadingLeauges: boolean = false;
  private _loadingLeaugeInfo: boolean = false;
  private _error: boolean = false;
  private _saving: boolean = false;
  private _errorMessage: string = "";
  private _leagueInfo: BehaviorSubject<ILeagueInfo|null> = new BehaviorSubject<ILeagueInfo|null>(null);
  private _leagues: BehaviorSubjectArray<ILeagueFile> = new BehaviorSubjectArray<ILeagueFile>([]);
  private _teams: BehaviorSubjectArray<ITeamInfo> = new BehaviorSubjectArray<ITeamInfo>([]);
  private _players: BehaviorSubjectArray<IPlayerInfo> = new BehaviorSubjectArray<IPlayerInfo>([]);
  private _ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _autoNumbers: AutoNum = new AutoNum({LeagueId: 0, PlayerId: 0, TeamId: 0} as IAutoNum);
  private _migrationInfo: IMigrationInfo = {LastMigrationRun: -1, LastRunOnVersion: new Version({Major: 0, Minor: 0, Revision: 0}), LastRunOnVersionInterface: {Major: 0, Minor: 0, Revision: 0}};

  constructor(private _fileManager: FileManagerService) { 
    _fileManager.GetPath("documents", (value: string) => { 
      this._pathToDocuments = value;
      this._ready.next(true);
    }, (value: any) => this.HandleError(value));
  }

  get MigrationLastRunOnVersion(){
    return this._migrationInfo.LastRunOnVersion.Full;
  }

  get OnReady(): Observable<boolean> {
    return this._ready.asObservable();
  }

  get Saving(): boolean{
    return this._saving;
  }

  get LoadingLeagues(): boolean{
    return this._loadingLeauges;
  }

  get LoadingLeagueInfo(): boolean{
    return this._loadingLeaugeInfo;
  }

  get Error(): boolean{
    return this._error;
  }

  get ErrorMessage(): string{
    return this._errorMessage;
  }

  get Leagues(): Observable<ILeagueFile[]>{
    return this._leagues.asObservable();
  }

  get LeagueInfo(): Observable<ILeagueInfo|null>{
    return this._leagueInfo.asObservable();
  }

  get Teams(): Observable<ITeamInfo[]>{
    return this._teams.asObservable();
  }

  get Players(): Observable<IPlayerInfo[]>{
    return this._players.asObservable();
  }

  LoadLeagues(){
    this._loadingLeauges = true;
    this._leagues.clear();
    this._fileManager.GetAllFiles(this.CreatePath(this._pathToDocuments, this._mainFolderName, this._leagueFolderName), (fileNames: string[]) => {
      if(fileNames.length == 0){
        this._leagues.clear();
      }

      fileNames.forEach(fileName => {
        if(!fileName.endsWith('.sav')){
          return;//Continue in this context
        }

        this._leagues.push({
          FileName: fileName,
          DisplayName: fileName.replace(".sav", "")
        } as ILeagueFile);
      });

      this._loadingLeauges = false;
    }, (value: any) => this.HandleError(value));
  }

  LoadLeague(fileName: string){
    this._loadingLeaugeInfo = true;
    this.ClearError();
    this._fileManager.ReadFile(this.CreatePath(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, fileName), (content: string) => {
      try{
        if(!content){
          console.error("File was empty.", content);
          throw new Error("File was empty.");
        }
        let dataSaveObject: IDataSaveObject = JSON.parse(content);

        if(!dataSaveObject){
          console.error("Failed to load content from league.", content);
          throw new Error("Failed to load content from league.");
        }
        
        this._leagueInfo.next(dataSaveObject.LeagueInfo);
        this._teams.next(dataSaveObject.TeamInfos);
        this._players.next(dataSaveObject.PlayerInfos);
        this._autoNumbers = new AutoNum(dataSaveObject.AutoNumber);
        this._migrationInfo = dataSaveObject.MirgrationInfo;
        this._migrationInfo.LastRunOnVersion = new Version(this._migrationInfo.LastRunOnVersionInterface);
        this._loadedLeagueFileName = fileName;
      }
      catch(error){
        console.error("Failed to load content from league.", content);
        this.HandleError(error);
      }
      this._loadingLeaugeInfo = false;
    }, (value: any) => this.HandleError(value));
  }

  CreateLeague(value: ILeagueInfo){
    let id = this._autoNumbers.LeagueID;
    value.ID = id;
    let newFileName = value.Name + ".sav";
    let version = new Version({Major: 0, Minor: 0, Revision: 0});
    version.Full = Version.GetCurrentVersion();

    let mirgrationInfo: IMigrationInfo = {
      LastMigrationRun: 0,
      LastRunOnVersion: version,
      LastRunOnVersionInterface: version.toInterface()
    }; 

    let dataSaveObject: IDataSaveObject = {
      AutoNumber: this._autoNumbers.ToInterface(),
      LeagueInfo: value,
      PlayerInfos: [],
      TeamInfos: [],
      MirgrationInfo: mirgrationInfo
    };

    this._fileManager.WriteToFile(this.CreatePath(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, newFileName), JSON.stringify(dataSaveObject), (content: string)=> {
      console.log("New League Created", dataSaveObject);
      this._leagues.push({
        DisplayName: value.Name,
        FileName: newFileName
      } as ILeagueFile);
    }, (value: any) => this.HandleError(value));
  }

  Save(){
    if(this._leagueInfo.value == null){
      this.HandleError("Failed to save. No League currently open.");
      return;
    }

    this._saving = true;
    let dataSaveObject: IDataSaveObject = {
      AutoNumber: this._autoNumbers.ToInterface(),
      LeagueInfo: this._leagueInfo.value,
      PlayerInfos: this._players.value,
      TeamInfos: this._teams.value,
      MirgrationInfo: this._migrationInfo
    };

    this._fileManager.WriteToFile(this.CreatePath(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, this._loadedLeagueFileName), JSON.stringify(dataSaveObject), 
      (content: string) => {
        console.log("League Saved", dataSaveObject);
        this._saving = false;
      }, (value: any) => this.HandleError(value));
  }

  AddPlayer(value: IPlayerInfo): number{
    let id = this._autoNumbers.PlayerID;
    value.ID = id;
    this._players.push(value);

    return id;
  }

  AddTeam(value: ITeamInfo): number{
    let id = this._autoNumbers.TeamID;
    value.ID = id;
    this._teams.push(value);

    return id;
  }

  GetPlayers(): IPlayerInfo[] {
    return this._players.value;
  }

  GetTeams(): ITeamInfo[] {
    return this._teams.value;
  }

  GetPlayerByID(id: number) : IPlayerInfo {
    let player = this._players.find((player: IPlayerInfo) => {
      return player.ID == id;
    });

    if(!player){
      throw new Error("Player not found.")
    }

    return player;
  }

  GetTeamByID(id: number) : ITeamInfo {
    let team = this._teams.find((team: ITeamInfo) => {
      return team.ID == id;
    });

    if(!team){
      throw new Error("Team not found.");
    }

    return team;
  }

  UpdatePlayer(value: IPlayerInfo, match: (value: IPlayerInfo) => boolean){
    this._players.replace(value, match);
  }

  UpdateTeam(value: ITeamInfo, match: (value: ITeamInfo) => boolean){
    this._teams.replace(value, match);
  }

  UpdateLeague(value: ILeagueInfo){
    this._leagueInfo.next(value);
  }

  DeletePlayer(match: (value: IPlayerInfo) => boolean){
    this._players.remove(match);
  }

  DeleteTeam(match: (value: ITeamInfo) => boolean){
    this._teams.remove(match);
  }

  private ClearError(){
    this._error = false;
    this._errorMessage = "";
  }

  private HandleError(value: any): void{
    this._error = true;
    this._loadingLeaugeInfo = false;
    this._loadingLeauges = false;
    this._errorMessage = value;
  }

  private CreatePath(...values: string[]): string{
    let path = "";
    values.forEach(value => {
      let trimmedValue = value.trim();
      path += trimmedValue.endsWith('\\') || trimmedValue.endsWith('/') ? trimmedValue : (trimmedValue + "\\");
    });
    return path.endsWith('\\') || path.endsWith('/') ? path.slice(0, -1) : path;
  }
}
