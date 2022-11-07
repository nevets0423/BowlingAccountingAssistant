import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IIpcRendererQueueItem } from '../models/interfaces/IIpcRendererQueueItem';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private _running: boolean = false;
  private _queue: IIpcRendererQueueItem[] = [];

  constructor(private _electronService: ElectronService, private _zone: NgZone) { }

  GetPath(name: string, next: (value: string) => void, error: { (value: any) : void } | null = null){
    this.Execute('GetPath', name, next, error);
  }

  GetAllFiles(path: string, next: (value: string[]) => void, error: { (value: any) : void } | null = null){
    this.Execute('GetAllFiles', path, next, error);
  }

  ReadFile(path: string, next: (value: string) => void, error: { (value: any) : void } | null = null){
    this.Execute('ReadFile', path, next, error);
  }

  FileExists(path: string, next: (value: boolean) => void){
    this.Execute('FileExists', path, (value: string) => {next(value.toLocaleLowerCase() == 'true')}, null);
  }

  MoveFile(sourcePath: string, destinationPath: string, next: (value: string) => void, error: { (value: any) : void } | null = null){
    
    var sourceFileName = this.GetFileName(sourcePath, error);
    if(sourceFileName == undefined){
      return;
    }

    var destinationFileName = this.GetFileName(destinationPath, error);
    if(destinationFileName == undefined){
      return;
    }

    var sourceFolderPath = sourcePath.replace(sourceFileName, "").slice(0, -1);
    var destinationFolderPath = destinationPath.replace(destinationFileName, "").slice(0, -1);

    this.Execute('MoveFile', [sourceFolderPath, destinationFolderPath, sourceFileName, destinationFileName], next, error);
  }

  WriteToFile(path: string, content: string, next: (value: string) => void, error: { (value: any) : void } | null = null){
    var fileName = this.GetFileName(path, error);
    if(fileName == undefined){
      return;
    }

    var folderPath = path.replace(fileName, "").slice(0, -1);

    this.Execute('SaveFile', [folderPath, fileName, content], next, error);
  }

  private GetFileName(path: string, error: { (value: any) : void } | null = null){
    if(path == null || path.length == 0){
      error?.("No Path Provided.");
      return undefined;
    }
    var fileName = path.split('\\').pop()?.split('/').pop();

    if(fileName == null || fileName.length == 0){
      error?.("Path is invalid.");
      return undefined;
    }

    return fileName;
  }

  private Execute(channel: string, params: any, next: (value: any) => void, error: { (value: any) : void } | null){
    this._queue.push({
      Channel: channel,
      ResponseChannel: channel + "-reply",
      error: error,
      next: next,
      Params: params
    } as IIpcRendererQueueItem);

    this.ExecuteNext();
  }


  private ExecuteNext(){
    if(this._running || this._queue.length == 0){
      return;
    }

    let request = this._queue.pop();
    if(!request){
      return;
    }

    this._running = true;
    this._electronService.ipcRenderer.send(request.Channel, request.Params);
    this._electronService.ipcRenderer.once(request.ResponseChannel, (event, results: any) => {
      this._zone.run(() => {
        this._running = false;
        if(results.error){
          request?.error?.(results.errorMessage);
          return;
        }
        request?.next(results.content);
      });
      this.ExecuteNext();
    });
  }
}
