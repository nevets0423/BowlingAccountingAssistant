import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MigrationManagerService {
  private _lockHeader: boolean = true;

  constructor() { }

  get LockHeader(){
    return this._lockHeader;
  }

  unlockHeader(){
    this._lockHeader = false;
  }
}
