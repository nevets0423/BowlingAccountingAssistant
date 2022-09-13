import { Component, Input, OnInit } from '@angular/core';
import { ITeamInfoDTO } from '../../models/interfaces/ITeamInfoDTO';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { DataManagerService } from '../../services/data-manager.service';
import { NumericArrayInputCellRendererComponent } from '../../grid-render-components/numeric-array-input-cell-renderer/numeric-array-input-cell-renderer.component';

@Component({
  selector: 'app-week-display',
  templateUrl: './week-display.component.html',
  styleUrls: ['./week-display.component.scss']
})
export class WeekDisplayComponent implements OnInit {
  @Input() week: number|undefined;
  private _leagueInfo: ILeagueInfo| null = null;
  private _teams: ITeamInfoDTO[] = [];
  private _players: IPlayerInfo[] = [];

  get Week():number{
    return this.week || 0;
  }

  get Teams(): ITeamInfoDTO[] {
    return this._teams;
  }

  private _gridApis: Map<number, any> = new Map<number, any>();

  public defaultColDef = {
    sortable: false,
    filter: true
  };

  public columnDefs = [
    {
      headerName: 'Name', 
      field: 'Name', 
      width: 125,
      cellStyle: (params: any) => {
        let player: IPlayerInfo = params.data;
        if(!player || player.AmountPaidEachWeek.length <= this.Week){
          return {backgroundColor: 'red'};
        }
        let amountOwed = (this._leagueInfo?.LaneFee || 0) + (this._leagueInfo?.PrizeAmountPerWeek || 0);
        if(player.AmountPaidEachWeek[this.Week] > 0 && player.AmountPaidEachWeek[this.Week] < amountOwed){
          return {backgroundColor: 'gold'};
        }
        if(player.AmountPaidEachWeek[this.Week] < amountOwed){
          return {backgroundColor: 'firebrick'};
        }
        return null;
      }
    },
    {
      headerName: 'Paid', 
      field: 'AmountPaidEachWeek', 
      cellRenderer: NumericArrayInputCellRendererComponent,
      width: 60,
      cellRendererParams: {
        width: 50,
        index: 0,
        onChange: this.onPlayerUpdated.bind(this)
      }
    }
  ];

  constructor(private _dataManager: DataManagerService) { }

  get LeaguePaidToday(): number{
    return this._players.filter((player: IPlayerInfo) => this.IsPlayerActive(player, this.Week))
      .map((player:IPlayerInfo) => {
        return player.AmountPaidEachWeek?.[this.Week] || 0
      })
      .reduce((totalValue, currentValue) => totalValue + currentValue);
  }

  get LeaguePaidToDate(): number{
    return this._players.filter((player: IPlayerInfo) => this.IsPlayerActive(player, this.Week))
      .map((player:IPlayerInfo) => {
        return player.AmountPaidEachWeek.reduce((totalValue, currentValue, currentIndex) => totalValue + ((currentIndex <= this.Week) ? currentValue : 0), 0);
      })
      .reduce((totalValue, currentValue) => totalValue + currentValue);
  }

  get LeaguePaidToLanes(): number{
    let leagueOwedToLanes = this.LeagueOwedToLanes;
    let leaguePaidToDate = this.LeaguePaidToDate;

    return (leagueOwedToLanes > leaguePaidToDate) ? leaguePaidToDate : leagueOwedToLanes;
  }

  get LeagueOwedToLanes(): number{
    return this._players.reduce((totalValue, currentValue) => { 
      for(let i = 0; i <= this.Week; i++){
        if(this.IsPlayerActive(currentValue, i)){
          totalValue += this._leagueInfo?.LaneFee || 0;
        }
      }

      return totalValue;
    }, 0);
  }

  get LeaguePrizeMoney(): number{
    let leagueOwedToLanes = this.LeagueOwedToLanes;
    let leaguePaidToDate = this.LeaguePaidToDate;
    
    return (leaguePaidToDate - leagueOwedToLanes < 0) ? 0 : (leaguePaidToDate - leagueOwedToLanes);
}

  ngOnInit(): void {
    if(this.week == undefined){
      throw Error('Week is required.');
    }

    let cellRendererParams = this.columnDefs[this.columnDefs.findIndex(c => c.field == 'AmountPaidEachWeek')].cellRendererParams;
    if(cellRendererParams?.index != undefined){
      cellRendererParams.index = this.Week;
    }

    this._dataManager.LeagueInfo.subscribe(leagueInfo => {
      this._leagueInfo = leagueInfo;
    });
    this._dataManager.Teams.subscribe(teams => {
      this._teams = teams;
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

  onGridReady(params: any, teamID: number) {
    this._gridApis.set(teamID, params.api);
    params.api.setRowData(this.PlayersForTeam(teamID));
    params.api.sizeColumnsToFit();
  }

  onPlayerUpdated(params: any){
    console.log("player updated", params);
    this._dataManager.UpdatePlayer(params.rowData);
  }

  private PlayersForTeam(teamID: number): IPlayerInfo[]{
    return this._players.filter(player => player.TeamID == teamID && this.IsPlayerActive(player, this.Week));
  }

  private IsPlayerActive(player: IPlayerInfo, week: number){
    return player.WeekStarted - 1 <= week && player.WeekEnded - 1 >= week;
  }
}
