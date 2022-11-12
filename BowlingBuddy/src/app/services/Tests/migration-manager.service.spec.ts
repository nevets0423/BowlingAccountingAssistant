import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FileManagerService } from '../file-manager.service';

import { MigrationManagerService } from '../migration-manager.service';

let service: MigrationManagerService;

describe('MigrationManagerService', () => {
  let _fileManager: jasmine.SpyObj<FileManagerService>;

  beforeEach( async () => {
    _fileManager = jasmine.createSpyObj('FileManagerService', [
      'GetPath',
      'GetAllFiles',
      'ReadFile',
      'WriteToFile',
      'FileExists',
      'MoveFile'
    ]);

    _fileManager.GetPath.and.callFake((name: string) => {
      return new Promise<string>((resolve) => {
        resolve("path");
      });
    });

    await TestBed.configureTestingModule({
      providers:[
        { provide: FileManagerService, useValue: _fileManager }]
    });
    service = await TestBed.inject(MigrationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Migration from pre electron version', () => {
    beforeEach(() => {
      service['_pathToDocuments'] = "path";
    });

    it('checks correct path to see if old file exists', () => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => {}));
      service['MigratePreElectron']();

      expect(_fileManager.FileExists).toHaveBeenCalledWith('path\\BowlerBuddy\\BowlerBuddy.sav');
    });

    it('when file does not exist, nothing further is attempted', () => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(false); }));
      service['MigratePreElectron']();

      expect(_fileManager.ReadFile).not.toHaveBeenCalled();
      expect(_fileManager.WriteToFile).not.toHaveBeenCalled();
      expect(_fileManager.MoveFile).not.toHaveBeenCalled();
    });

    it('when checking if file exists encounters an error, it gets handled', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { reject("BOOM"); }));
      service['MigratePreElectron']();
      tick(100);

      ExpectErrorToBeHandled("BOOM");
    }));

    it('when reading file encounters an error, it gets handled', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { reject("BOOM"); }));
      service['MigratePreElectron']();
      tick(100);
      
      ExpectErrorToBeHandled("BOOM");
    }));

    it('when reading file returns empty string, file is archived and nothing else occures',fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(""); }));
      _fileManager.MoveFile.and.returnValue(new Promise<string>((resolve, reject) => {}));

      service['MigratePreElectron']();
      tick(100);
      
      expect(_fileManager.WriteToFile).not.toHaveBeenCalled();
      expect(_fileManager.MoveFile).toHaveBeenCalledWith('path\\BowlerBuddy\\BowlerBuddy.sav', 'path\\BowlerBuddy\\Archive\\BowlerBuddy.sav');
    }));

    it('when data from file is invalid json, error is handled and nothing else occurres', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve("SomeInvalidJson{{]]"); }));
      service['MigratePreElectron']();
      tick(100);

      ExpectErrorToBeHandled("Failed to load old league data. skipping migration.");
      expect(_fileManager.WriteToFile).not.toHaveBeenCalled();
      expect(_fileManager.MoveFile).not.toHaveBeenCalled();
    }));

    it('when write to file encounters an error, it is handled and file is not moved', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(CreateOldFileJson()); }));
      _fileManager.WriteToFile.and.returnValue(new Promise<string>((resolve, reject) => { reject("BOOM"); }));
      
      service['MigratePreElectron']();
      tick(100);

      ExpectErrorToBeHandled("BOOM");
      expect(_fileManager.MoveFile).not.toHaveBeenCalled();
    }));

    it('a new file is created for each league, with expected info', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(CreateOldFileJson()); }));
      _fileManager.WriteToFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(""); }));
      _fileManager.MoveFile.and.returnValue(new Promise<string>((resolve, reject) => {}));
      
      service['MigratePreElectron']();
      tick(100);

      expect(_fileManager.WriteToFile).toHaveBeenCalledWith("path\\BowlerBuddy\\Leagues\\test.sav", "{\"AutoNumber\":{\"LeagueId\":4,\"PlayerId\":20,\"TeamId\":10},\"MirgrationInfo\":{\"LastMigrationRun\":0,\"LastRunOnVersion\":{\"_major\":1,\"_minor\":0,\"_revision\":0},\"LastRunOnVersionInterface\":{\"Major\":1,\"Minor\":0,\"Revision\":0}},\"LeagueInfo\":{\"ID\":0,\"LaneFee\":10.3,\"Name\":\"test\",\"NumberOfWeeks\":12.2,\"PrizeAmountPerWeek\":5.1},\"PlayerInfos\":[{\"ID\":0,\"AmountPaidEachWeek\":[1,15,12],\"Name\":\"1\",\"TeamID\":0,\"WeekEnded\":12,\"WeekStarted\":1},{\"ID\":1,\"AmountPaidEachWeek\":[],\"Name\":\"2\",\"TeamID\":0,\"WeekEnded\":12,\"WeekStarted\":1},{\"ID\":2,\"AmountPaidEachWeek\":[],\"Name\":\"3\",\"TeamID\":0,\"WeekEnded\":12,\"WeekStarted\":1},{\"ID\":3,\"AmountPaidEachWeek\":[15,0,30,15,15,15,15,0,0],\"Name\":\"4\",\"TeamID\":1,\"WeekEnded\":9,\"WeekStarted\":1},{\"ID\":4,\"AmountPaidEachWeek\":[],\"Name\":\"5\",\"TeamID\":1,\"WeekEnded\":10,\"WeekStarted\":1},{\"ID\":5,\"AmountPaidEachWeek\":[],\"Name\":\"6\",\"TeamID\":1,\"WeekEnded\":9,\"WeekStarted\":1}],\"TeamInfos\":[{\"ID\":0,\"LeagueID\":0},{\"ID\":1,\"LeagueID\":0}]}");
      expect(_fileManager.WriteToFile).toHaveBeenCalledWith("path\\BowlerBuddy\\Leagues\\test2.sav", "{\"AutoNumber\":{\"LeagueId\":4,\"PlayerId\":20,\"TeamId\":10},\"MirgrationInfo\":{\"LastMigrationRun\":0,\"LastRunOnVersion\":{\"_major\":1,\"_minor\":0,\"_revision\":0},\"LastRunOnVersionInterface\":{\"Major\":1,\"Minor\":0,\"Revision\":0}},\"LeagueInfo\":{\"ID\":1,\"LaneFee\":11,\"Name\":\"test2\",\"NumberOfWeeks\":10,\"PrizeAmountPerWeek\":6},\"PlayerInfos\":[{\"ID\":9,\"AmountPaidEachWeek\":[],\"Name\":\"7\",\"TeamID\":2,\"WeekEnded\":2,\"WeekStarted\":1},{\"ID\":10,\"AmountPaidEachWeek\":[],\"Name\":\"8\",\"TeamID\":2,\"WeekEnded\":9,\"WeekStarted\":1},{\"ID\":11,\"AmountPaidEachWeek\":[15,0,30,0.1,30,15,15,0,30],\"Name\":\"9\",\"TeamID\":2,\"WeekEnded\":3,\"WeekStarted\":1}],\"TeamInfos\":[{\"ID\":2,\"LeagueID\":1}]}");
    }));

    it('when everything is successful the file is archived', fakeAsync(() => {
      _fileManager.FileExists.and.returnValue(new Promise<boolean>((resolve, reject) => { resolve(true); }));
      _fileManager.ReadFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(CreateOldFileJson()); }));
      _fileManager.WriteToFile.and.returnValue(new Promise<string>((resolve, reject) => { resolve(""); }));
      _fileManager.MoveFile.and.returnValue(new Promise<string>((resolve, reject) => {resolve("");}));

      service['MigratePreElectron']();
      tick(100);

      expect(_fileManager.MoveFile).toHaveBeenCalledWith('path\\BowlerBuddy\\BowlerBuddy.sav', 'path\\BowlerBuddy\\Archive\\BowlerBuddy.sav');
    }));
  });
});

function ExpectErrorToBeHandled(error: string){
  expect(service['_errorMessage']).toBe(error);
  expect(service['_error'].value).toBeTruthy();
  expect(service['_migrating'].value).toBeFalsy();
}

function CreateOldFileJson(){
  return `
  {
    "Leagues": [
      {
        "Id": 0,
        "Name": "test",
        "LaneFee": 10.3,
        "PrizeAmountPerWeek": 5.1,
        "NumberOfWeeks": 12.2
      },
      {
        "Id": 1,
        "Name": "test2",
        "LaneFee": 11.0,
        "PrizeAmountPerWeek": 6.0,
        "NumberOfWeeks": 10.0
      }
    ],
    "Teams": [
      {
        "Id": 0,
        "LeagueId": 0,
        "Players": [
          {
            "Id": 0,
            "TeamId": 0,
            "Name": "1",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":12,
            "AmountPaidEachWeek": [1,15,12]
          },
          {
            "Id": 1,
            "TeamId": 0,
            "Name": "2",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":12,
            "AmountPaidEachWeek": []
          },
          {
            "Id": 2,
            "TeamId": 0,
            "Name": "3",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":12,
            "AmountPaidEachWeek": []
          }
        ]
      },
      {
        "Id": 1,
        "LeagueId": 0,
        "Players": [
          {
            "Id": 3,
            "TeamId": 1,
            "Name": "4",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":9,
            "AmountPaidEachWeek": [15.0,0.0,30.0,15.0,15.0,15.0,15.0,0.0,0.0]
          },
          {
            "Id": 4,
            "TeamId": 1,
            "Name": "5",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":10,
            "AmountPaidEachWeek": []
          },
          {
            "Id": 5,
            "TeamId": 1,
            "Name": "6",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":9,
            "AmountPaidEachWeek": []
          }
        ]
      },
      {
        "Id": 2,
        "LeagueId": 1,
        "Players": [
          {
            "Id": 9,
            "TeamId": 2,
            "Name": "7",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":2,
            "AmountPaidEachWeek": []
          },
          {
            "Id": 10,
            "TeamId": 2,
            "Name": "8",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":9,
            "AmountPaidEachWeek": []
          },
          {
            "Id": 11,
            "TeamId": 2,
            "Name": "9",
            "PaidToDate": 0.0,
            "WeekStarted": 1,
            "WeekEnded":3,
            "AmountPaidEachWeek": [15.0,0.0,30.0,0.1,30.0,15.0,15.0,0.0,30.0]
          }
        ]
      }
    ],
    "AutoNum": {
      "PlayerId": 20,
      "TeamId": 10,
      "LeageId": 4
    }
  }`;
}