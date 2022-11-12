import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { MigrationManagerService } from 'src/app/services/migration-manager.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  private _loadingWaitTimeComplete: BehaviorSubject<boolean>;
  private _processingComplete: BehaviorSubject<boolean>;

  constructor(private _mirgrationManager: MigrationManagerService, private _router: Router) { 
    this._loadingWaitTimeComplete = new BehaviorSubject<boolean>(false);
    this._processingComplete = new BehaviorSubject<boolean>(false);

    this._loadingWaitTimeComplete.subscribe(value => {this.EveryThingIsComplete()});
    this._processingComplete.subscribe(value => {this.EveryThingIsComplete()});
  }

  get ErrorOccured(): Observable<boolean> {
    return this._mirgrationManager.Error;
  }

  get ErrorMessage(): string {
    return this._mirgrationManager.ErrorMessage;
  }

  ngOnInit(): void {
    this._mirgrationManager.Migrating.pipe(filter(value => value)).subscribe(value => {
      this._processingComplete.next(true);
    });

    this._mirgrationManager.MigrateData();

    setTimeout(() => {this._loadingWaitTimeComplete.next(true); }, 2000);
  }

  private EveryThingIsComplete(){
    if(this._loadingWaitTimeComplete.value && this._processingComplete.value){
      this._router.navigateByUrl('home');
    }
  }
}
