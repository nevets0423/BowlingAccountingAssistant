import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private _electronService: ElectronService) { }

  GetPath(name: string, next: (value: string) => void, error: (value: any) => void | null){
    this._electronService.ipcRenderer.send('GetPath', name);
    this._electronService.ipcRenderer.on('GetPath-reply', (event, results: any) => {
      if(results.error){
        error(results.errorMessage);
        return;
      }
      next(results.path);
    });
  }

  GetAllFiles(path: string, next: (value: string[]) => void, error: (value: any) => void | null){
    this._electronService.ipcRenderer.send('GetAllFiles', path);
    this._electronService.ipcRenderer.on('GetAllFiles-reply', (event, results: any) => {
      if(results.error){
        error(results.errorMessage);
        return;
      }
      next(results.files);
    });
  }

  ReadFile(path: string, next: (value: string) => void, error: (value: any) => void | null){
    this._electronService.ipcRenderer.send('ReadFile', path);
    this._electronService.ipcRenderer.on('ReadFile-reply', (event, results: any) => {
      if(results.error){
        error(results.errorMessage);
        return;
      }
      next(results.fileContent);
    });
  }

  WriteToFile(path: string, content: string, next: (value: string) => void, error: (value: any) => void | null){
    if(path == null || path.length == 0){
      error("No Path Provided.");
      return;
    }
    var fileName = path.split('\\').pop()?.split('/').pop();

    if(fileName == null || fileName.length == 0){
      error("Path is invalid.");
      return;
    }

    var folderPath = path.replace(fileName, "");

    this._electronService.ipcRenderer.send('ReadFile', folderPath, fileName, content);
    this._electronService.ipcRenderer.on('ReadFile-reply', (event, results: any) => {
      if(results.error){
        error(results.errorMessage);
        return;
      }
      next(results.fileContent);
    });
  }
}