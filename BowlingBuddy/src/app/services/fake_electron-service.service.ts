import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Fake_ElectronService {
    private GETPATH = "GetPath";
    private GETALLFILES = "GetAllFiles";
    private READFILE = "ReadFile";
    private SAVEFILE = "SaveFile";
    private FILEEXISTS = "FileExists";
    private MOVEFILE = "MoveFile";

    //private _storage: any = {};
    private _storage: any = {"PathToDocFolder\\BowlerBuddy\\Leagues\\1234.sav": "{\"AutoNumber\":{\"PlayerId\":0,\"LeagueId\":1,\"TeamId\":0},\"LeagueInfo\":{\"ID\":0,\"LaneFee\":12,\"Name\":\"1234\",\"NumberOfWeeks\":12,\"PrizeAmountPerWeek\":12},\"PlayerInfos\":[],\"TeamInfos\":[],\"MirgrationInfo\":{\"LastMigrationRun\":0,\"LastRunOnVersion\":{\"_major\":1,\"_minor\":0,\"_revision\":0},\"LastRunOnVersionInterface\":{\"Major\":1,\"Minor\":0,\"Revision\":0}}}"};

    public run(channel: string, args: any): Promise<any>{
        console.log(`calling channel ${channel} with `, args);

        switch(channel){
            case this.GETPATH:
                return this.GetPath(args);
            case this.GETALLFILES:
                return this.GetAllFiles(args);
            case this.READFILE:
                return this.ReadFile(args);
            case this.SAVEFILE:
                return this.SaveFile(args[0], args[1], args[2]);
            case this.FILEEXISTS:
                return this.FileExists(args);
            case this.MOVEFILE:
                return this.MoveFile(args[0], args[1], args[2], args[3]);
            default:
                return new Promise<any>((resolve, reject) => {
                    console.error(`You missed a function. ${channel} was called but that doesnt exist yet.`);
                    reject("EVERYTHING IS BROKE. Good job.");
                });
        }
    }

    private GetPath(arg: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve("PathToDocFolder");
        });
    }

    private GetAllFiles(path: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let propertyNames = Object.getOwnPropertyNames(this._storage);
            resolve(propertyNames.map(propertyName => {
                let index = propertyName.lastIndexOf('\\') + 1;
                return propertyName.substring(index);
            }));
        });
    }

    private ReadFile(fileName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(fileName in this._storage ? this._storage[fileName] : null);
        });
    }

    private SaveFile(folderPath: string, fileName: string, data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let filePath = folderPath + "\\" + fileName;
            this._storage[filePath] = `${data}`;

            resolve(data);
        });
    }

    private FileExists(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve((path in this._storage).toString());
        });
    }

    private MoveFile(sourcePath: string, destPath: string, sourceFile: string, destFile: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let sourceFilePath = sourcePath + "\\" + sourceFile;
            let destFilePath = destPath + "\\" + destFile;

            let data = sourceFilePath in this._storage ? this._storage[sourceFilePath] : null;
            delete this._storage[sourceFilePath];
            this._storage[destFilePath] = `${data}`;

            resolve(data);
        });
    }  
}