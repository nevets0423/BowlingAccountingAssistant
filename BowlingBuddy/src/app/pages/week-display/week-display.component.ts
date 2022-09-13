import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITeamInfoDTO } from '../../models/interfaces/ITeamInfoDTO';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { DataManagerService } from '../../services/data-manager.service';
import { GenericInputCellRendererComponent } from 'src/app/grid-render-components/generic-input-cell-renderer/generic-input-cell-renderer.component';
import { InputCellRedererParameters } from 'src/app/grid-render-components/generic-input-cell-renderer/input-cell-rederer-parameters';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-week-display',
  templateUrl: './week-display.component.html',
  styleUrls: ['./week-display.component.scss']
})
export class WeekDisplayComponent implements OnInit, OnChanges {
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
      cellStyle: this.NameCellStyle.bind(this)
    },
    {
      headerName: 'Paid', 
      field: 'paid', 
      width: 60,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 50,
        getMax: undefined,
        getMin: undefined,
        label: '$',
        getValue: (params: ICellRendererParams<IPlayerInfo, any>) => { return ((params.data?.AmountPaidEachWeek?.length || 0) > this.Week) ? params.data?.AmountPaidEachWeek[this.Week] : 0; },
        onChange: this.onPlayerUpdated.bind(this),
        readonly: false,
        updateData: this.updatePlayerPaidAmountGridData.bind(this)
      } as InputCellRedererParameters
    },
    {
      headerName: 'Paid To Date', 
      field: 'paidToDate', 
      width: 80,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 70,
        getMax: undefined,
        getMin: undefined,
        label: '$',
        getValue: this.PlayerPaidToDate.bind(this),
        onChange: undefined,
        readonly: true,
        updateData: undefined
      } as InputCellRedererParameters
    },
    {
      headerName: 'Owe To Date', 
      field: 'oweToDate', 
      width: 80,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 70,
        getMax: undefined,
        getMin: undefined,
        label: '$',
        getValue: this.PlayerOwes.bind(this),
        onChange: undefined,
        readonly: true,
        updateData: undefined
      } as InputCellRedererParameters
    },
    {
      headerName: 'Difference', 
      field: 'difference', 
      width: 80,
      cellRenderer: GenericInputCellRendererComponent,
      cellRendererParams: {
        width: 70,
        getMax: undefined,
        getMin: undefined,
        label: '$',
        getValue: (params: ICellRendererParams<any, any>) => { return this.PlayerPaidToDate(params) - this.PlayerOwes(params); },
        onChange: undefined,
        readonly: true,
        updateData: undefined
      } as InputCellRedererParameters,
      cellStyle: (params: any) => {
        if((this.PlayerPaidToDate(params) - this.PlayerOwes(params)) < 0){
          return {backgroundColor: 'firebrick'};
        }
        return null;
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

  ngOnChanges(changes: SimpleChanges): void {
    this._gridApis.forEach((value,key) =>{
      value.setRowData(this.PlayersForTeam(key));
      value.refreshCells();
    });
  }

  onGridReady(params: any, teamID: number) {
    this._gridApis.set(teamID, params.api);
    params.api.setRowData(this.PlayersForTeam(teamID));
    params.api.sizeColumnsToFit();
  }

  onPlayerUpdated(value: number, rowData: any){
    console.log("player updated", rowData);
    this._dataManager.UpdatePlayer(rowData);
  }

  private NameCellStyle(params: any): any{
    let player: IPlayerInfo = params.data;
    let difference = this.PlayerPaidToDate(params) - this.PlayerOwes(params);
    if(difference < 0 && player.AmountPaidEachWeek.length <= this.Week){
      return {backgroundColor: 'firebrick'};
    }
  
    let amountOwed = (this._leagueInfo?.LaneFee || 0) + (this._leagueInfo?.PrizeAmountPerWeek || 0);
    if(difference < 0 && player.AmountPaidEachWeek[this.Week] > 0 && player.AmountPaidEachWeek[this.Week] < amountOwed){
      return {backgroundColor: 'gold'};
    }
    if(difference < 0 && player.AmountPaidEachWeek[this.Week] < amountOwed){
      return {backgroundColor: 'firebrick'};
    }
    return null;
  }

  private updatePlayerPaidAmountGridData(value: number, data: IPlayerInfo){
    while(data.AmountPaidEachWeek.length < this.Week + 1){
      data.AmountPaidEachWeek.push(0);
    }

    data.AmountPaidEachWeek[this.Week] = value;
    return data;
  }

  private PlayersForTeam(teamID: number): IPlayerInfo[]{
    return this._players.filter(player => player.TeamID == teamID && this.IsPlayerActive(player, this.Week));
  }

  private PlayerPaidToDate(params: ICellRendererParams<IPlayerInfo, any>): number{
    if(params.data?.AmountPaidEachWeek.length == 0){
      return 0;
    }
    return params.data?.AmountPaidEachWeek.reduce((totalValue, currentValue, index) => totalValue += (index <= this.Week) ? currentValue : 0) || 0;
  }

  private PlayerOwes(params: ICellRendererParams<IPlayerInfo, any>){
    let player: IPlayerInfo|undefined = params.data;
    if(!player){
      return 0;
    }
    let totalValue = 0;
    for(let i = 0; i <= this.Week; i++){
      if(this.IsPlayerActive(player, i)){
        totalValue += (this._leagueInfo?.LaneFee || 0) + (this._leagueInfo?.PrizeAmountPerWeek || 0);
      }
    }

    return totalValue;
  }

  private IsPlayerActive(player: IPlayerInfo, week: number){
    return player.WeekStarted - 1 <= week && player.WeekEnded - 1 >= week;
  }
}
