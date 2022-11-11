import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { skip, take } from 'rxjs';

import { DataManagerService } from '../data-manager.service';
import { FileManagerService } from '../file-manager.service';
import { ILeagueFile } from '../../models/interfaces/ILeagueFile';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { ITeamInfoDTO } from '../../models/interfaces/ITeamInfoDTO';

describe('DataManagerService', () => {
  let service: DataManagerService;
  let _fileManager = jasmine.createSpyObj('FileManagerService', [
    'GetPath',
    'GetAllFiles',
    'ReadFile',
    'WriteToFile'
  ]);

  beforeEach(async () => {
    _fileManager.GetPath.and.callFake((name: string) => {
      return new Promise<string>((resolve) => {
        resolve("path");
      });
    });
    
    await TestBed.configureTestingModule({
      providers:[{
        provide: FileManagerService,
        useValue: _fileManager
      }]
    });

    service = await TestBed.inject(DataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('LoadLeagues', () => {
    it('should set loading through out loading leagues cycle', () => {
      _fileManager.GetAllFiles.and.callFake((path: string) => {
        return new Promise<string[]>((resolve) => {
          resolve([]);
        });
      });

      service.LoadingLeagues.pipe(skip(0), take(1)).subscribe(value => {
        expect(value).toBeFalsy();
      });

      service.LoadingLeagues.pipe(skip(1), take(1)).subscribe(value => {
        expect(value).toBeTruthy();
      });

      service.LoadingLeagues.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeFalsy();
      });
  
      service.LoadLeagues();
      expect(_fileManager.GetAllFiles).toHaveBeenCalled();
    });

    it('should set leagues when calling loadLeagues', () => {
      _fileManager.GetAllFiles.and.callFake((path: string) => {
        return new Promise<string[]>((resolve) => {
          resolve(['file1.sav', 'file2.sav']);
        });
      });
  
      //skips: defualt null, clear, push file 1
      service.Leagues.pipe(skip(4), take(1)).subscribe((value: ILeagueFile[]) => {
        expect(value.length).toBe(2);
        expect(value[0].DisplayName).toBe('file1');
        expect(value[0].FileName).toBe('file1.sav');
      });
  
      service.LoadLeagues();
    });

    it('should ignore files without .sav', () => {
      _fileManager.GetAllFiles.and.callFake((path: string) => {
        return new Promise<string[]>((resolve) => {
          resolve(['file1.sav', 'file2.sav', 'file3.omg']);
        });
      });
  
      //skips: defualt null, clear, push file 1
      service.Leagues.pipe(skip(4), take(1)).subscribe((value: ILeagueFile[]) => {
        expect(value.length).toBe(2);
      });
  
      service.LoadLeagues();
    });

    it('should set error if an error occures', () => {
      _fileManager.GetAllFiles.and.callFake((path: string) => {
        return new Promise<string[]>((resolve, reject) => {
          reject("BOOM");
        });
      });

      service.Error.pipe(skip(1), take(1)).subscribe(value => {
        expect(value).toBeTrue();
      });
      service.LoadingLeagues.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeFalse();
      });

      service.LoadLeagues();
      expect(service.ErrorMessage).toBe("BOOM");
    });
  });

  describe('LoadLeague', () => {
    it('should set error if error occures', () => {
      _fileManager.ReadFile.and.callFake((path: string)=>{
        return new Promise<string[]>((resolve, reject) => {
          reject("BOOM");
        });
      });

      service.Error.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeTrue();
      });

      service.LoadingLeagues.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeFalse();
      });

      service.LoadLeague("LeagueName");
      
      expect(service.ErrorMessage).toBe("BOOM");
    });

    it('should set error if file was empty', () => {
      _fileManager.ReadFile.and.callFake((path: string)=>{
        return new Promise<string>((resolve) => {
          resolve("");
        });
      });

      service.LoadingLeagues.pipe(skip(1), take(1)).subscribe(value => {
        expect(value).toBeFalse();
      });

      service.Error.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeTrue();
      });

      service.LoadLeague("LeagueName");
    });

    it('should set error if file has bad data', () => {
      _fileManager.ReadFile.and.callFake((path: string)=>{
        return new Promise<string>((resolve) => {
          resolve("clearlyNotJson{]");
        });
      });

      service.Error.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeTrue();
      });

      service.LoadingLeagues.pipe(skip(2), take(1)).subscribe(value => {
        expect(value).toBeTrue();
      });

      service.LoadLeague("LeagueName");
    });


    it('should load league info from provided file', () => {
      _fileManager.ReadFile.and.callFake((path: string)=>{
        return new Promise<string>((resolve) => {
          resolve(JsonSaveString());
        });
      });
  
      service.LeagueInfo.pipe(skip(1), take(1)).subscribe((value: ILeagueInfo | null) => {
        expect(value?.ID).toBe(0);
        expect(value?.LaneFee).toBe(2);
        expect(value?.Name).toBe("hello");
        expect(value?.NumberOfWeeks).toBe(3);
        expect(value?.PrizeAmountPerWeek).toBe(4);
  
        expect(service.MigrationLastRunOnVersion).toBe("3.4.5");
      });
  
      service.Players.pipe(skip(1), take(1)).subscribe((players: IPlayerInfo[]) => {
        expect(players.length).toBe(1);
        expect(players[0].ID).toBe(0);
        expect(players[0].Name).toBe("steve");
        expect(players[0].TeamID).toBe(1);
        expect(players[0].WeekEnded).toBe(2);
        expect(players[0].WeekStarted).toBe(3);
        expect(players[0].AmountPaidEachWeek.length).toBe(2);
        expect(players[0].AmountPaidEachWeek[0]).toBe(12);
        expect(players[0].AmountPaidEachWeek[1]).toBe(13);
      });
  
      service.Teams.pipe(skip(1), take(1)).subscribe((teams: ITeamInfoDTO[]) => {
        expect(teams.length).toBe(1);
        expect(teams[0].ID).toBe(0);
        expect(teams[0].LeagueID).toBe(1);
      });
    });
  });

  describe('Create League', () => {
    it('should send json to create new file', fakeAsync(() =>{
      _fileManager.WriteToFile.and.callFake((path: string, content: string)=>{
        expect(path).toBe("path\\BowlerBuddy\\Leagues\\TheBestLeague.sav");                 
        expect(content).toBe("{\"AutoNumber\":{\"PlayerId\":0,\"LeagueId\":1,\"TeamId\":0},\"LeagueInfo\":{\"ID\":0,\"LaneFee\":100,\"Name\":\"TheBestLeague\",\"NumberOfWeeks\":3,\"PrizeAmountPerWeek\":5},\"PlayerInfos\":[],\"TeamInfos\":[],\"MirgrationInfo\":{\"LastMigrationRun\":0,\"LastRunOnVersion\":{\"_major\":1,\"_minor\":0,\"_revision\":0},\"LastRunOnVersionInterface\":{\"Major\":1,\"Minor\":0,\"Revision\":0}}}");
      
        return new Promise<string>((resolve) => {});
      });

      tick(50);
      
      service.CreateLeague({
        ID: 1,
        LaneFee: 100,
        Name: "TheBestLeague",
        NumberOfWeeks: 3,
        PrizeAmountPerWeek: 5
      } as ILeagueInfo);
    }));
  });
});

  

function JsonSaveString(){
  return "{\"AutoNumber\":{" +
    "\"_playerId\":1," +
    "\"_teamId\":2," +
    "\"_leagueId\":0" +
  "}," +
  "\"LeagueInfo\":{" +
    "\"ID\":0," +
    "\"LaneFee\":2," +
    "\"Name\":\"hello\"," +
    "\"NumberOfWeeks\":3," +
    "\"PrizeAmountPerWeek\":4" +
  "}," +
  "\"PlayerInfos\":[{" +
    "\"AmountPaidEachWeek\":[12, 11]," +
    "\"ID\":0," +
    "\"Name\":\"steve\"," +
    "\"TeamID\":1," +
    "\"WeekEnded\":2," +
    "\"WeekStarted\":3" +
  "}]," +
  "\"TeamInfos\":[{" +
    "\"ID\":0," +
    "\"LeagueID\":1" +
    "}]," +
    "\"MirgrationInfo\":{" +
    "\"LastMigrationRun\":2," +
    "\"LastRunOnVersion\":{" +
    "\"_major\":3," +
    "\"_minor\":4," +
    "\"_revision\":5" +
  "}}}"
}