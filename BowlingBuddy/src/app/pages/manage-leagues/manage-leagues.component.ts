import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ILeagueOverView } from 'src/app/models/interfaces/ILeagueOverView';
import { DataManagerService } from '../../services/data-manager.service';
import { GridApi, ICellRendererParams } from 'ag-grid-community/main'
import { ButtonCellRendereComponent as ButtonCellRendererComponent } from 'src/app/grid-render-components/button-cell-renderer/button-cell-renderer.component';
import { buttonRendererParams } from 'src/app/grid-render-components/button-cell-renderer/button-renderer-params';

@Component({
  selector: 'app-manage-leagues',
  templateUrl: './manage-leagues.component.html',
  styleUrls: ['./manage-leagues.component.scss']
})
export class ManageLeaguesComponent implements OnInit, OnDestroy {
  public leagueOverViews: ILeagueOverView[] = [];
  private _gridApi: GridApi | null = null;

  public defaultColDef = {
    sortable: true,
    filter: false
  };

  public columnDefs = [
    {
      headerName: '', 
      field: 'FileName', 
      width: 100,
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        Name: "Open",
        onClick: this.openLeague
      } as buttonRendererParams
    },
    {
      headerName: '', 
      field: 'FileName', 
      width: 150,
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        Name: "Delete",
        onClick: this.deleteLeague
      } as buttonRendererParams
    },
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

  ngOnDestroy(): void {
    this._gridApi = null;
  }

  ngOnInit(): void {
    this._dataManager.GetLeagueOverviews().pipe().subscribe((overviews) => {
      this.leagueOverViews = overviews;

      if(this._gridApi != null){
        this._gridApi.setRowData(overviews);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._gridApi?.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this._gridApi = params.api;
    this._gridApi?.setRowData(this.leagueOverViews);
    this._gridApi?.sizeColumnsToFit();
  }

  openLeague(params: ICellRendererParams<any, any> | undefined){
    console.log("open", params);
  }

  deleteLeague(params: ICellRendererParams<any, any> | undefined){
    console.log("delete", params);
  }
}
