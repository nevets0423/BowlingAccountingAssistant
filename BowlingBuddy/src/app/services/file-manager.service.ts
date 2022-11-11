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

  GetPath(name: string): Promise<string> {
    return this.Execute('GetPath', name);
  }

  GetAllFiles(path: string): Promise<string[]> {
    return this.Execute('GetAllFiles', path);
  }

  ReadFile(path: string): Promise<string> {
    return this.Execute('ReadFile', path);
  }

  FileExists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.Execute('FileExists', path)
        .then((value) => {
          resolve(value.toLocaleLowerCase() == 'true');
        }, error => {
          reject(error);
        })
    });
  }

  MoveFile(sourcePath: string, destinationPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var sourceFileName = this.GetFileName(sourcePath);
      if (sourceFileName == undefined) {
        reject("failed to get source FileName");
        return;
      }

      var destinationFileName = this.GetFileName(destinationPath);
      if (destinationFileName == undefined) {
        reject("failed to get destination FileName");
        return;
      }

      var sourceFolderPath = sourcePath.replace(sourceFileName, "").slice(0, -1);
      var destinationFolderPath = destinationPath.replace(destinationFileName, "").slice(0, -1);

      this.Execute('MoveFile', [sourceFolderPath, destinationFolderPath, sourceFileName, destinationFileName])
        .then(value => { resolve(value); }, error => { reject(error); });
    });

  }

  WriteToFile(path: string, content: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var fileName = this.GetFileName(path);
      if (fileName == undefined) {
        reject('failed to get FileName');
        return;
      }

      var folderPath = path.replace(fileName, "").slice(0, -1);

      this.Execute('SaveFile', [folderPath, fileName, content])
      .then(value => { resolve(value); }, error => { reject(error); });
    });
  }

  private GetFileName(path: string) {
    if (path == null || path.length == 0) {
      return undefined;
    }
    var fileName = path.split('\\').pop()?.split('/').pop();

    if (fileName == null || fileName.length == 0) {
      return undefined;
    }

    return fileName;
  }

  private Execute(channel: string, params: any) {
    return new Promise<any>((resolve, reject) => {
      this._queue.push({
        Channel: channel,
        ResponseChannel: channel + "-reply",
        reject: reject,
        resolve: resolve,
        Params: params
      } as IIpcRendererQueueItem);

      this.ExecuteNext();
    });
  }


  private ExecuteNext() {
    if (this._running || this._queue.length == 0) {
      return;
    }

    let request = this._queue.pop();
    if (!request) {
      return;
    }

    this._running = true;
    this._electronService.ipcRenderer.send(request.Channel, request.Params);
    this._electronService.ipcRenderer.once(request.ResponseChannel, (event, results: any) => {
      this._zone.run(() => {
        this._running = false;
        if (results.error) {
          request?.reject(results.errorMessage);
          return;
        }
        request?.resolve(results.content);
      });
      this.ExecuteNext();
    });
  }
}
