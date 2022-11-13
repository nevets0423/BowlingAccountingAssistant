import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, timer } from 'rxjs';
import { AutoNum } from '../models/AutoNum';
import { BehaviorSubjectArray } from '../models/BehaviorSubjectArray';
import { IAutoNum } from '../models/interfaces/IAutoNum';
import { IDataSaveObject } from '../models/interfaces/IDataSaveObject';
import { ILeagueFile } from '../models/interfaces/ILeagueFile';
import { ILeagueInfo } from '../models/interfaces/ILeagueInfo';
import { ILeagueOverView } from '../models/interfaces/ILeagueOverView';
import { IMigrationInfo } from '../models/interfaces/IMigrationInfo';
import { IPlayerInfo } from '../models/interfaces/IPlayerInfo';
import { ITeamInfoDTO } from '../models/interfaces/ITeamInfoDTO';
import { Version } from '../models/Version';
import { FileManagerService } from './file-manager.service';
import { Path } from './../Helpers/file-path-builder';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService implements OnDestroy {
  private _pathToDocuments: string = "";
  private _mainFolderName: string = "BowlerBuddy";
  private _leagueFolderName: string = "Leagues";
  private _arichiveFolderName: string = "Archive";
  private _loadedLeagueFileName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _loadingLeauges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loadingLeaugeInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _saving: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _newLeagueCreated: BehaviorSubject<ILeagueFile|null> = new BehaviorSubject<ILeagueFile|null>(null);
  private _errorMessage: string = "";
  private _dirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _leagueInfo: BehaviorSubject<ILeagueInfo|null> = new BehaviorSubject<ILeagueInfo|null>(null);
  private _leagues: BehaviorSubjectArray<ILeagueFile> = new BehaviorSubjectArray<ILeagueFile>([]);
  private _teams: BehaviorSubjectArray<ITeamInfoDTO> = new BehaviorSubjectArray<ITeamInfoDTO>([]);
  private _players: BehaviorSubjectArray<IPlayerInfo> = new BehaviorSubjectArray<IPlayerInfo>([]);
  private _ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _autoNumbers: AutoNum = new AutoNum({LeagueId: 0, PlayerId: 0, TeamId: 0} as IAutoNum);
  private _migrationInfo: IMigrationInfo = {LastMigrationRun: -1, LastRunOnVersion: new Version({Major: 0, Minor: 0, Revision: 0}), LastRunOnVersionInterface: {Major: 0, Minor: 0, Revision: 0}};
  private static _timer: NodeJS.Timer|undefined = undefined;

  constructor(private _fileManager: FileManagerService) { 
    _fileManager.GetPath("documents")
    .then((value: string) => {
      this._pathToDocuments = value;
      this._ready.next(true);
    }, error => this.HandleError(error));

    if(DataManagerService._timer){
      clearTimeout(DataManagerService._timer);
    }

    DataManagerService._timer = setInterval(() => {
      this.Save();
    }, 10 * 1000);
  }

  ngOnDestroy() {
    clearTimeout(DataManagerService._timer);
  }

  get NewLeagueCreated(): Observable<ILeagueFile|null> {
    return this._newLeagueCreated.asObservable();
  }

  get MigrationLastRunOnVersion(){
    return this._migrationInfo.LastRunOnVersion.Full;
  }

  get OnReady(): Observable<boolean> {
    return this._ready.asObservable();
  }

  get Saving(): Observable<boolean>{
    return this._saving.asObservable();
  }

  get Dirty(): Observable<boolean>{
    return this._dirty.asObservable();
  }

  get LoadingLeagues(): Observable<boolean>{
    return this._loadingLeauges.asObservable();
  }

  get LoadingLeagueInfo(): Observable<boolean>{
    return this._loadingLeaugeInfo.asObservable();
  }

  get Error(): Observable<boolean>{
    return this._error.asObservable();
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

  get Teams(): Observable<ITeamInfoDTO[]>{
    return this._teams.asObservable();
  }

  get Players(): Observable<IPlayerInfo[]>{
    return this._players.asObservable();
  }

  get LoadedLeagueFileName() : Observable<string>{
    return this._loadedLeagueFileName.asObservable();
  }

  GetLeagueOverviews(): Observable<ILeagueOverView[]>{
    let leagueOverviews: BehaviorSubjectArray<ILeagueOverView> = new BehaviorSubjectArray<ILeagueOverView>([]);
    
    this.GetLeagueFiles().then((leagueFiles) => {
      leagueFiles.forEach(leagueFile => {
        this.GetLeagueSaveData(leagueFile.FileName).then(leageSaveData => {
          let leagueOverview = {
            ID: leageSaveData.LeagueInfo.ID,
            Name: leageSaveData.LeagueInfo.Name,
            FileName: leagueFile.FileName,
            PrizeAmountPerWeek: leageSaveData.LeagueInfo.PrizeAmountPerWeek,
            Players: leageSaveData.PlayerInfos.length,
            Teams: leageSaveData.TeamInfos.length,
            LaneFeePerWeek: leageSaveData.LeagueInfo.LaneFee,
            NumberOfWeeks: leageSaveData.LeagueInfo.NumberOfWeeks,
            WeeksRecored: leageSaveData.PlayerInfos.reduce((currentMax, currentPlayer) => currentMax = (currentPlayer.AmountPaidEachWeek.length > currentMax) ? currentPlayer.AmountPaidEachWeek.length : currentMax, 0),
            TotalCollected: leageSaveData.PlayerInfos.reduce((currentValue, currentPlayer) => currentValue += (currentPlayer.AmountPaidEachWeek.length == 0) ? 0 : currentPlayer.AmountPaidEachWeek.reduce((current, week) => current += week),0),
          } as ILeagueOverView;

          leagueOverview.LaneFeesCollected = (leagueOverview.WeeksRecored * leagueOverview.LaneFeePerWeek) * leagueOverview.Players;
          if(leagueOverview.LaneFeesCollected > leagueOverview.TotalCollected){
            leagueOverview.LaneFeesCollected = leagueOverview.TotalCollected;
          }

          leagueOverview.PrizeAmountCollected = leagueOverview.TotalCollected - leagueOverview.LaneFeesCollected ;
          if(leagueOverview.PrizeAmountCollected < 0){
            leagueOverview.PrizeAmountCollected = 0;
          }

          leagueOverviews.push(leagueOverview);
        }).catch(leagueOverviews.error);
      });
    }).catch(leagueOverviews.error);

    return leagueOverviews.asObservable();
  }

  LoadLeagues(): Promise<ILeagueFile[]>{
    return new Promise<ILeagueFile[]>((resolve, reject) => {
      this._loadingLeauges.next(true);
      this._leagues.clear();
      this.GetLeagueFiles().then((leagueFiles) => {
        this._leagues.next(leagueFiles);
        this._loadingLeauges.next(false);
        resolve(leagueFiles);
      }).catch((error) => {
        this.HandleError(error);
        reject(error);
      });
    });
  }

  LoadLeague(fileName: string){
    this._loadingLeaugeInfo.next(true);
    this.ClearError();
    this.Save();
    this.GetLeagueSaveData(fileName).then((dataSaveObject) => {
      this._leagueInfo.next(dataSaveObject.LeagueInfo);
      this._teams.next(dataSaveObject.TeamInfos);
      this._players.next(dataSaveObject.PlayerInfos);
      this._autoNumbers = new AutoNum(dataSaveObject.AutoNumber);
      this._migrationInfo = dataSaveObject.MirgrationInfo;
      this._migrationInfo.LastRunOnVersion = new Version(this._migrationInfo.LastRunOnVersionInterface);
      this._loadedLeagueFileName.next(fileName);
    }).catch((error) => {this.HandleError(error)});;
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

    this._fileManager.WriteToFile(Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, newFileName), JSON.stringify(dataSaveObject))
    .then((content: string) => {
      console.log("New League Created", dataSaveObject);
      let leagueFile = {
        DisplayName: value.Name,
        FileName: newFileName
      } as ILeagueFile;
      this._leagues.push(leagueFile);
      this._newLeagueCreated.next(leagueFile);
    },(error: any) => this.HandleError(error));
  }

  ArchiveLeague(fileName: string){
    if(fileName == null || fileName.length == 0){
      return;
    }
    console.log(`Archiving league ${fileName}.`);

    this._saving.next(true);
    if(this._loadedLeagueFileName.value == fileName){
      this._leagueInfo.next(null);
      this._loadedLeagueFileName.next("");
    }

    let sourcePath = Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, fileName);
    let date = new Date();
    let dateString = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    let destinationPath = Path.Create(this._pathToDocuments, this._mainFolderName, this._arichiveFolderName, `${dateString}--${fileName}`);

    this._fileManager.MoveFile(sourcePath, destinationPath)
    .then((content: string) => {
      this._leagues.remove((value: ILeagueFile) => value.FileName == fileName);
      this._saving.next(false);
      console.log("League Archived");
    }, error => this.HandleError(error));
  }

  Save(){
    if(!this._dirty.value){
      console.log('nothing dirty');
      return;
    }

    if(this._leagueInfo.value == null){
      this.HandleError("Failed to save. No League currently open.");
      return;
    }

    console.log('saving');
    this._saving.next(true);
    let dataSaveObject: IDataSaveObject = {
      AutoNumber: this._autoNumbers.ToInterface(),
      LeagueInfo: this._leagueInfo.value,
      PlayerInfos: this._players.value,
      TeamInfos: this._teams.value,
      MirgrationInfo: this._migrationInfo
    };

    this._fileManager.WriteToFile(Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, this._loadedLeagueFileName.value), JSON.stringify(dataSaveObject))
    .then((content: string) => {
      console.log("League Saved", dataSaveObject);
      this._saving.next(false);
      this._dirty.next(false);
    }, (error: any) => this.HandleError(error));
  }

  AddPlayer(value: IPlayerInfo): number{
    let id = this._autoNumbers.PlayerID;
    value.ID = id;
    this._players.push(value);

    this._dirty.next(true);
    return id;
  }

  AddTeam(value: ITeamInfoDTO): number{
    let id = this._autoNumbers.TeamID;
    value.ID = id;
    this._teams.push(value);

    this._dirty.next(true);
    return id;
  }

  GetPlayers(): IPlayerInfo[] {
    return this._players.value;
  }

  GetTeams(): ITeamInfoDTO[] {
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

  GetTeamByID(id: number) : ITeamInfoDTO {
    let team = this._teams.find((team: ITeamInfoDTO) => {
      return team.ID == id;
    });

    if(!team){
      throw new Error("Team not found.");
    }

    return team;
  }

  UpdatePlayer(player: IPlayerInfo){
    this._players.replace(player, (value: IPlayerInfo) => {
      return value.ID == player.ID;
    });
    this._dirty.next(true);
  }

  UpdateTeam(team: ITeamInfoDTO){
    this._teams.replace(team, (value: ITeamInfoDTO) => {
      return value.ID == team.ID;
    });
    this._dirty.next(true);
  }

  UpdateLeague(value: ILeagueInfo){
    this._leagueInfo.next(value);
    this._dirty.next(true);
  }

  DeletePlayer(player: IPlayerInfo){
    this._players.remove((value: IPlayerInfo) => {
      return value.ID == player.ID;
    });
    this._dirty.next(true);
  }

  DeleteTeam(team: ITeamInfoDTO){
    this._teams.remove((value: ITeamInfoDTO) => {
      return value.ID == team.ID;
    });
    this._players.remove((player: IPlayerInfo) => {
      return player.TeamID == team.ID;
    });
    this._dirty.next(true);
  }

  private GetLeagueFiles(): Promise<ILeagueFile[]>{
    let leagueFiles: ILeagueFile[] = [];
    return new Promise<ILeagueFile[]>((resolve, reject) => {
      this._fileManager.GetAllFiles(Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName))
      .then((fileNames: string[]) => {
        fileNames.forEach(fileName => {
          if(!fileName.endsWith('.sav')){
            return;//Continue in this context
          }
  
          leagueFiles.push({
            FileName: fileName,
            DisplayName: fileName.replace(".sav", "")
          } as ILeagueFile);
        });
        resolve(leagueFiles);
      }, (error: any) => reject(error));
    });
  }

  private GetLeagueSaveData(fileName: string): Promise<IDataSaveObject>{
    return new Promise<IDataSaveObject>((resolve, reject) => {
      this._fileManager.ReadFile(Path.Create(this._pathToDocuments, this._mainFolderName, this._leagueFolderName, fileName))
      .then((content: string) => {
        try{
          if(!content){
            console.error("File was empty.", content);
            reject("File was empty.");
            return;
          }
          let dataSaveObject: IDataSaveObject = JSON.parse(content);
  
          if(!dataSaveObject){
            console.error("Failed to load content from league.", content);
            reject("Failed to load content from league.");
            return;
          }
          
          resolve(dataSaveObject);
        }
        catch(error){
          console.error("Failed to load content from league.", content);
          reject(error);
        }
      }, (error: any) => reject(error));
    });
  }

  private ClearError(){
    this._error.next(false);
    this._errorMessage = "";
  }

  private HandleError(value: any): void{
    console.error(value);
    this._error.next(true);
    this._loadingLeaugeInfo.next(false);
    this._loadingLeauges.next(false);
    this._errorMessage = value;
    this._saving.next(false);
  }
}
