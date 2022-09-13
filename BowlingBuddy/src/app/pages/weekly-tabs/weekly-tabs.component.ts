import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ILeagueInfo } from 'src/app/models/interfaces/ILeagueInfo';
import { DataManagerService } from 'src/app/services/data-manager.service';

@Component({
  selector: 'app-weekly-tabs',
  templateUrl: './weekly-tabs.component.html',
  styleUrls: ['./weekly-tabs.component.scss']
})
export class WeeklyTabsComponent implements OnInit {
  weekNumber = 0;
  weeks: number[] = [];
  activeWeek: number = 0;

  constructor(private _dataManager: DataManagerService) { }

  ngOnInit(): void {
    this._dataManager.LeagueInfo.pipe(filter(value => value != null)).subscribe((leagueInfo: ILeagueInfo|null) => {
      if(leagueInfo == null){
        return;
      }

      for(let i = 0; i < leagueInfo.NumberOfWeeks; i++){
        this.weeks.push(i)
      }
      this.activeWeek = 0;
    });
  }

  onClick(week: number){
    this.activeWeek = week;
  }
}
