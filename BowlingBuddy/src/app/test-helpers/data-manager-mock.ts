import { BehaviorSubject } from "rxjs";
import { BehaviorSubjectArray } from "../models/BehaviorSubjectArray";
import { ILeagueFile } from "../models/interfaces/ILeagueFile";
import { ILeagueInfo } from "../models/interfaces/ILeagueInfo";
import { IPlayerInfo } from "../models/interfaces/IPlayerInfo";
import { ISettings } from "../models/interfaces/ISettings";
import { ITeamInfoDTO } from "../models/interfaces/ITeamInfoDTO";
import { DataManagerService } from "../services/data-manager.service";

export class DataManagerMock{
    public DataManagerMockService: jasmine.SpyObj<DataManagerService>;
    
    private _loadingLeauges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _loadingLeaugeInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _saving: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _dirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _leagueInfo: BehaviorSubject<ILeagueInfo|null> = new BehaviorSubject<ILeagueInfo|null>(null);
    private _leagues: BehaviorSubjectArray<ILeagueFile> = new BehaviorSubjectArray<ILeagueFile>([]);
    private _teams: BehaviorSubjectArray<ITeamInfoDTO> = new BehaviorSubjectArray<ITeamInfoDTO>([]);
    private _players: BehaviorSubjectArray<IPlayerInfo> = new BehaviorSubjectArray<IPlayerInfo>([]);
    private _ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _newLeagueCreated: BehaviorSubjectArray<ILeagueFile> = new BehaviorSubjectArray<ILeagueFile>([]);
    private _settings: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>({lastOpenedLeague: '123.sav'});
    private _loadedLeagueFileName: BehaviorSubject<string> = new BehaviorSubject<string>("");


    constructor(){
        this.DataManagerMockService = jasmine.createSpyObj('DataManagerService', ['LoadLeagues', 'LoadLeague', 'GetLeagueOverviews']);
        (this.DataManagerMockService as any).OnReady = this._ready.asObservable();
        (this.DataManagerMockService as any).Saving = this._saving.asObservable();
        (this.DataManagerMockService as any).Dirty = this._dirty.asObservable();
        (this.DataManagerMockService as any).LoadingLeagues = this._loadingLeauges.asObservable();
        (this.DataManagerMockService as any).LoadingLeagueInfo = this._loadingLeaugeInfo.asObservable();
        (this.DataManagerMockService as any).Error = this._error.asObservable();
        (this.DataManagerMockService as any).Leagues = this._leagues.asObservable();
        (this.DataManagerMockService as any).LeagueInfo = this._leagueInfo.asObservable();
        (this.DataManagerMockService as any).Teams = this._teams.asObservable();
        (this.DataManagerMockService as any).Players = this._players.asObservable();
        (this.DataManagerMockService as any).NewLeagueCreated = this._newLeagueCreated.asObservable();
        (this.DataManagerMockService as any).LoadedLeagueFileName = this._loadedLeagueFileName.asObservable();
        (this.DataManagerMockService as any).Settings = this._settings.asObservable();
    }

    get Provider(){
        return {provide: DataManagerService, useValue: this.DataManagerMockService};
    }

    set OnReady(value: boolean){
        this._ready.next(value);
    }

    set Saving(value: boolean){
        this._saving.next(value);
    }

    set Dirty(value: boolean){
        this._dirty.next(value);
    }

    set LoadingLeagues(value: boolean){
        this._loadingLeauges.next(value);
    }

    set LoadingLeagueInfo(value: boolean){
        this._loadingLeaugeInfo.next(value);
    }

    set Error(value: boolean){
        this._error.next(value);
    }

    set Leagues(value: ILeagueFile[]){
        this._leagues.next(value);
    }

    set Teams(value: ITeamInfoDTO[]){
        this._teams.next(value);
    }

    set Players(value: IPlayerInfo[]){
        this._players.next(value);
    }

    set LeagueInfo(value: ILeagueInfo){
        this._leagueInfo.next(value);
    }

    set Settings(value: ISettings){
        this._settings.next(value);
    }
}