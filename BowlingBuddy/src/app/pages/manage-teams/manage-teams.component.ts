import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { GenericInputCellRendererComponent } from '../../grid-render-components/generic-input-cell-renderer/generic-input-cell-renderer.component';
import { InputCellRedererParameters } from '../../grid-render-components/generic-input-cell-renderer/input-cell-rederer-parameters';
import { ITeamInfoManager } from '../../models/interfaces/ITeamInfoManager';
import { CheckBoxCellRendererComponent } from '../../grid-render-components/check-box-cell-renderer/check-box-cell-renderer.component';
import { TextInputCellRendererComponent } from '../../grid-render-components/text-input-cell-renderer/text-input-cell-renderer.component';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { ITeamInfoDTO } from '../../models/interfaces/ITeamInfoDTO';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss']
})
export class ManageTeamsComponent implements OnInit {
  private _leagueInfo: ILeagueInfo| null = null;
  private _teams: ITeamInfoManager[] = [];
  private _players: IPlayerInfo[] = [];

  get Teams(): ITeamInfoManager[] {
    return this._teams;
  }

  private _gridApis: Map<number, any> = new Map<number, any>();
  public defaultColDef = {
    sortable: false,
    filter: true
  };

  public columnDefs = [
    {headerName: '', 
      field: 'checked',
      cellRenderer: CheckBoxCellRendererComponent,
      width: 45,
      suppressSizeToFit:true
    },
    {headerName: 'Name', 
      field: 'Name', 
      width: 125,
      cellRenderer: TextInputCellRendererComponent,
      cellRendererParams: {
        onChange: this.onPlayerUpdated.bind(this)
      }
    },
    {headerName: 'Start Week', 
      field: 'WeekStarted', 
      width: 60,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 50,
        getMax: (params: ICellRendererParams<IPlayerInfo, any>) => { return params.data?.WeekEnded; },
        getMin: (params: ICellRendererParams<IPlayerInfo, any>) => { return 0; },
        getValue: (params: ICellRendererParams<IPlayerInfo, any>) => { return params.data?.WeekStarted; },
        onChange: this.onPlayerUpdated.bind(this),
        readonly: false,
        updateData: (value: number, data: IPlayerInfo) => { data.WeekStarted = value; return data;}
      } as InputCellRedererParameters
    },
    {headerName: 'End Week', 
      field: 'WeekEnded', 
      width: 60,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 50,
        getMax: (params: ICellRendererParams<IPlayerInfo, any>) => { return this._leagueInfo?.NumberOfWeeks; },
        getMin: (params: ICellRendererParams<IPlayerInfo, any>) => { return params.data?.WeekStarted; },
        getValue: (params: ICellRendererParams<IPlayerInfo, any>) => { return params.data?.WeekEnded; },
        onChange: this.onPlayerUpdated.bind(this),
        readonly: false,
        updateData: (value: number, data: IPlayerInfo) => { data.WeekEnded = value; return data;}
      } as InputCellRedererParameters
    },
  ];

  constructor(private _dataManager: DataManagerService) { }

  ngOnInit(): void {
    this._gridApis.clear();
    this._dataManager.LeagueInfo.subscribe(leagueInfo => {
      this._leagueInfo = leagueInfo;
    });
    this._dataManager.Teams.subscribe(teams => {
      this._teams = teams.map(team => { return {ID:team.ID, LeagueID:team.LeagueID, Checked:false } as ITeamInfoManager});
    });
    this._dataManager.Players.subscribe(players => {
      this._players = players;
      this._teams.forEach(team => {
        let api = this._gridApis.get(team.ID);
        if(api && !api.destroyCalled){
          api.setRowData(this.PlayersForTeam(team.ID));
        }
      });
    });
  }

  CreateNewTeam(){
    this._dataManager.AddTeam({
      ID: 0,
      LeagueID: this._leagueInfo?.ID
    } as ITeamInfoDTO);
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

  DeleteTeams(){
    this._teams.forEach((team: ITeamInfoManager) => {
      if(team.Checked){
        this._dataManager.DeleteTeam(team);
      }
    });
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
    this._gridApis.set(teamID, params.api);
    params.api.setRowData(this.PlayersForTeam(teamID));
    params.api.sizeColumnsToFit();
  }

  onPlayerUpdated(value: number, rowData: any){
    this._dataManager.UpdatePlayer(rowData);
  }

  private PlayersForTeam(teamID: number): IPlayerInfo[]{
    return this._players.filter(player => player.TeamID == teamID);
  }
}
