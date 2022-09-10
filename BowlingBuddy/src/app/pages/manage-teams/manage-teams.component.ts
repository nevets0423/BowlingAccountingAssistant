import { Component, OnInit } from '@angular/core';
import { CheckBoxCellRendererComponent } from '../../grid-render-components/check-box-cell-renderer/check-box-cell-renderer.component';
import { NumericInputCellRendererComponent } from '../../grid-render-components/numeric-input-cell-renderer/numeric-input-cell-renderer.component';
import { TextInputCellRendererComponent } from '../../grid-render-components/text-input-cell-renderer/text-input-cell-renderer.component';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { ITeamInfo } from '../../models/interfaces/ITeamInfo';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent implements OnInit {
  private _leagueInfo: ILeagueInfo| null = null;
  private _teams: ITeamInfo[] = [];
  private _players: IPlayerInfo[] = [];

  get Teams(): ITeamInfo[] {
    return this._teams;
  }

  private _gridApis: Map<number, any> = new Map<number, any>();
  public defaultColDef = {
    sortable: false,
    filter: true
  };

  public rowData: any[] = [];
  public columnDefs = [
    {headerName: '', 
      field: 'checked',
      cellRenderer: CheckBoxCellRendererComponent,
      width: 45,
      suppressSizeToFit:true
    },
    {headerName: 'Name', 
      field: 'Name', 
      cellRenderer: TextInputCellRendererComponent,
      cellRendererParams: {
        onChange: this.onPlayerUpdated.bind(this)
      }
    },
    {headerName: 'Start Week', 
      field: 'WeekStarted', 
      cellRenderer: NumericInputCellRendererComponent,
      width: 60,
      cellRendererParams: {
        width: 50,
        min: 0,
        minColumnName: 'WeekStarted',
        maxColumnName: 'WeekEnded',
        onChange: this.onPlayerUpdated.bind(this)
      }
    },
    {headerName: 'End Week', 
      field: 'WeekEnded', 
      width: 60,
      cellRenderer: NumericInputCellRendererComponent,
      cellRendererParams: {
        width: 50,
        max: this._leagueInfo?.NumberOfWeeks || 100,
        minColumnName: 'WeekStarted',
        maxColumnName: 'WeekEnded',
        onChange: this.onPlayerUpdated.bind(this)
      }
    },
  ];

  constructor(private _dataManager: DataManagerService) { }

  ngOnInit(): void {
    this._dataManager.LeagueInfo.subscribe(leagueInfo => {
      this._leagueInfo = leagueInfo;
      let cellRendererParams = this.columnDefs[this.columnDefs.findIndex(c => c.field == 'WeekEnded')].cellRendererParams;
      if(cellRendererParams?.max){
        cellRendererParams.max = this._leagueInfo?.NumberOfWeeks || 100;
      }
    });
    this._dataManager.Teams.subscribe(teams => {
      this._teams = teams;
    });
    this._dataManager.Players.subscribe(players => {
      this._players = players;
      this._teams.forEach(team => {
        this._gridApis.get(team.ID).setRowData(this.PlayersForTeam(team.ID));
      });
    });
  }

  PlayersForTeam(teamID: number): IPlayerInfo[]{
    return this._players.filter(player => player.TeamID == teamID);
  }

  CreateNewTeam(){
    this._dataManager.AddTeam({
      ID: 0,
      LeagueID: this._leagueInfo?.ID
    } as ITeamInfo);
  }

  CreateNewPlayer(teamID: number){
    this._dataManager.AddPlayer({
      ID: 0,
      Name: "NewPlayer",
      AmountPaidEachWeek: [],
      PaidToDate: 0,
      TeamID: teamID,
      WeekEnded: this._leagueInfo?.NumberOfWeeks,
      WeekStarted: 0
    } as IPlayerInfo);
  }

  DeletePlayers(teamID: number){
    this._gridApis.get(teamID).forEachNodeAfterFilterAndSort((rowNode: any, index: number) => {
      if(!rowNode.data["checked"] || false){
        return;
      }
      this._dataManager.DeletePlayer(rowNode.data as IPlayerInfo);
    });
  }

  onGridReady(params: any, teamID: number) {
    if(!this._gridApis.has(teamID)){
      this._gridApis.set(teamID, params.api);
    }
    this._gridApis.get(teamID).sizeColumnsToFit();
    this._gridApis.get(teamID).setRowData(this.PlayersForTeam(teamID));
  }

  onPlayerUpdated(params: any){
    this._dataManager.UpdatePlayer(params.rowData);
  }
}
