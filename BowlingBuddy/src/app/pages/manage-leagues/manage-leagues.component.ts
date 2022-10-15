import { Component, OnInit } from '@angular/core';
import { ILeagueOverView } from 'src/app/models/interfaces/ILeagueOverView';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-manage-leagues',
  templateUrl: './manage-leagues.component.html',
  styleUrls: ['./manage-leagues.component.scss']
})
export class ManageLeaguesComponent implements OnInit {
  public leagueOverViews: ILeagueOverView[] = [];
  private _gridApi: any = null;

  public defaultColDef = {
    sortable: true,
    filter: false
  };

  public columnDefs = [
    {
      headerName: 'Name', 
      field: 'Name',
    },
    {
      headerName: 'Teams', 
      field: 'Teams',
    },
    {
      headerName: 'Players', 
      field: 'Players',
    },
    {
      headerName: 'Total Collected', 
      field: 'TotalCollected',
    },
    {
      headerName: 'Lane Fee Per Week', 
      field: 'LaneFeePerWeek', 
    },
    {
      headerName: 'Lane Fees Collected', 
      field: 'LaneFeesCollected', 
    },
    {
      headerName: 'Prize Amount Per Week', 
      field: 'PrizeAmountPerWeek', 
    },
    {
      headerName: 'Prize Amount Collected', 
      field: 'PrizeAmountCollected', 
    },
    {
      headerName: 'Number Of Weeks', 
      field: 'NumberOfWeeks', 
    },
    {
      headerName: 'Weeks Recored', 
      field: 'WeeksRecored', 
    },
  ];

  constructor(private _dataManager: DataManagerService) { }

  ngOnInit(): void {
    this._dataManager.GetLeagueOverviews().pipe().subscribe((overviews) => {
      this.leagueOverViews = overviews;

      if(this._gridApi != null){
        this._gridApi.setRowData(overviews);
      }
    });
  }

  onGridReady(params: any) {
    this._gridApi = params.api;
    this._gridApi.setRowData(this.leagueOverViews);
    this._gridApi.sizeColumnsToFit();
  }
}
