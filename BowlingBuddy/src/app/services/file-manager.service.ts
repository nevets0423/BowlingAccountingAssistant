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

  WriteToFile(path: string, content: string, next: (value: string) => void, error: { (value: any) : void } | null = null){
    if(path == null || path.length == 0){
      error?.("No Path Provided.");
      return;
    }
    var fileName = path.split('\\').pop()?.split('/').pop();

    if(fileName == null || fileName.length == 0){
      error?.("Path is invalid.");
      return;
    }

    var folderPath = path.replace(fileName, "").slice(0, -1);

    this.Execute('SaveFile', [folderPath, fileName, content], next, error);
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
        if(results.error){
          request?.error?.(results.errorMessage);
          return;
        }
        request?.next(results.content);
        this._running = false;
      });
      this.ExecuteNext();
    });
  }
}
