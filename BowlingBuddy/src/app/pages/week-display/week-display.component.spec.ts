import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { NgxElectronModule } from 'ngx-electron';
import { GenericInputCellRendererComponent } from '../../grid-render-components/generic-input-cell-renderer/generic-input-cell-renderer.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ILeagueInfo } from '../../models/interfaces/ILeagueInfo';
import { IPlayerInfo } from '../../models/interfaces/IPlayerInfo';
import { ITeamInfoDTO } from '../../models/interfaces/ITeamInfoDTO';
import { DataManagerMock } from '../../test-helpers/data-manager-mock';

import { WeekDisplayComponent } from './week-display.component';

describe('WeekDisplayComponent', () => {
  let component: WeekDisplayComponent;
  let fixture: ComponentFixture<WeekDisplayComponent>;
  let mockDataManagerService: DataManagerMock;
  let originalTimeout: number;

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  })

  beforeEach(async () => {
    mockDataManagerService = new DataManagerMock();
    mockDataManagerService.LeagueInfo = {
      ID: 1,
      LaneFee: 10,
      Name: "TestLeague",
      NumberOfWeeks: 20,
      PrizeAmountPerWeek: 5
    } as ILeagueInfo;

    mockDataManagerService.Teams = [{
      ID: 0,
      LeagueID: 1
    } as ITeamInfoDTO];

    mockDataManagerService.Players = CreatePlayers(2)
    
    await TestBed.configureTestingModule({
      declarations: [ 
        WeekDisplayComponent,
        GenericInputCellRendererComponent
      ],
      providers: [
        mockDataManagerService.Provider,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxElectronModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        AgGridModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('player should be', () => {
    [
      { week: 0, weekStarted: 0, weekEnded: 8, shouldBeActive: true },
      { week: 0, weekStarted: 1, weekEnded: 8, shouldBeActive: false },
      { week: 0, weekStarted: 2, weekEnded: 8, shouldBeActive: false },
      { week: 1, weekStarted: 0, weekEnded: 8, shouldBeActive: true },
      { week: 1, weekStarted: 1, weekEnded: 8, shouldBeActive: true },
      { week: 1, weekStarted: 0, weekEnded: 0, shouldBeActive: false },
      { week: 1, weekStarted: 2, weekEnded: 8, shouldBeActive: false },
      { week: 2, weekStarted: 1, weekEnded: 8, shouldBeActive: true },
      { week: 2, weekStarted: 0, weekEnded: 0, shouldBeActive: false },
      { week: 2, weekStarted: 1, weekEnded: 1, shouldBeActive: false },
      { week: 2, weekStarted: 3, weekEnded: 8, shouldBeActive: false },
    ].forEach((params: any,) => {
      it(`${params.shouldBeActive ? "active": "not active"} for week ${params.week} when they started on week ${params.weekStarted}`, async () => {
        let players = CreatePlayers(1);
        players[0].WeekStarted = params.weekStarted;
        players[0].WeekEnded = params.weekEnded;

        expect(component["IsPlayerActive"](players[0], params.week)).toBe(params.shouldBeActive);
      });
    });
  });

  describe('total amount paid today sums correctly', () => {
    [
      { week: 0, expectResult: 20, playerOneStartDate: 0},
      { week: 0, expectResult: 10, playerOneStartDate: 3},
      { week: 0, expectResult: 10, playerOneStartDate: 1},

      { week: 1, expectResult: 20, playerOneStartDate: 0},
      { week: 1, expectResult: 10, playerOneStartDate: 2},
      { week: 1, expectResult: 10, playerOneStartDate: 3},

      { week: 2, expectResult: 50, playerOneStartDate: 0},
      { week: 2, expectResult: 50, playerOneStartDate: 2},
      { week: 2, expectResult: 25, playerOneStartDate: 3},
      { week: 2, expectResult: 25, playerOneStartDate: 4},

      { week: 3, expectResult: 30, playerOneStartDate: 0},
      { week: 3, expectResult: 30, playerOneStartDate: 3},
      { week: 3, expectResult: 15, playerOneStartDate: 4},

      { week: 4, expectResult: 0, playerOneStartDate: 0},
      { week: 4, expectResult: 0, playerOneStartDate: 3},
    ].forEach((params: any, index: number) => {
      it(`${index} -- week ${params.week} should total ${params.expectResult} when player one starts on week ${params.playerOneStartDate}`, async () => {
        let players = CreatePlayers(2);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players
        component.week = params.week;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('#paidToday');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectResult.toString());
      });
    });
  });

  describe('total amount paid to date sums correctly', () => {
    [
      {week: 0, expectedResults: 10, playerOneStartDate: 1},
      {week: 0, expectedResults: 20, playerOneStartDate: 0},
      {week: 1, expectedResults: 40, playerOneStartDate: 0},
      {week: 1, expectedResults: 30, playerOneStartDate: 1},
      {week: 1, expectedResults: 20, playerOneStartDate: 2},
      {week: 1, expectedResults: 20, playerOneStartDate: 3},
      {week: 2, expectedResults: 90, playerOneStartDate: 0},
      {week: 2, expectedResults: 80, playerOneStartDate: 1},
      {week: 2, expectedResults: 70, playerOneStartDate: 2},
      {week: 2, expectedResults: 45, playerOneStartDate: 3},
    ].forEach(params => {
      it(`week ${params.week} should be ${params.expectedResults} when player one starts on week ${params.playerOneStartDate}`, async () =>{
        let players = CreatePlayers(3);
        players[0].WeekStarted = params.playerOneStartDate;
        players[2].AmountPaidEachWeek = [];
        mockDataManagerService.Players = players
        component.week = params.week;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('#paidToDate');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectedResults.toString());
      });
    });
  });

  describe('total paid to lanes sums correctly', () => {
    [
      {week: 0, expectedResults: 20, playerOneStartDate: 0},
      {week: 0, expectedResults: 10, playerOneStartDate: 1},
      {week: 1, expectedResults: 40, playerOneStartDate: 0},
      {week: 1, expectedResults: 30, playerOneStartDate: 1},
      {week: 1, expectedResults: 20, playerOneStartDate: 2},
      {week: 2, expectedResults: 60, playerOneStartDate: 0},
      {week: 2, expectedResults: 50, playerOneStartDate: 1},
      {week: 2, expectedResults: 40, playerOneStartDate: 2},
      {week: 2, expectedResults: 30, playerOneStartDate: 3},
    ].forEach(params => {
      it(`week ${params.week} should total ${params.expectedResults} when player one starts on week ${params.playerOneStartDate}`, async () => {
        let players = CreatePlayers(2);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players
        component.week = params.week;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('#paidToLanes');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectedResults.toString());
      });
    });
  });

  describe('total lane fee owed sums correctly', () => {
    [
      { week: 0, players: 1, expectResult: 10, playerOneStartDate: 0, playerOneEndDate: 10},
      { week: 1, players: 1, expectResult: 20, playerOneStartDate: 0, playerOneEndDate: 10},
      { week: 2, players: 2, expectResult: 60, playerOneStartDate: 0, playerOneEndDate: 10},
      { week: 3, players: 3, expectResult: 120, playerOneStartDate: 0, playerOneEndDate: 10},
      { week: 1, players: 2, expectResult: 20, playerOneStartDate: 2, playerOneEndDate: 10},
      { week: 1, players: 2, expectResult: 30, playerOneStartDate: 1, playerOneEndDate: 10},
    ].forEach((params: any) => {
      it(`week ${params.week} should total ${params.expectResult} with ${params.players} players, when player one starts on week ${params.playerOneStartDate} and stops week ${params.playerOneEndDate}`, async () => {
        component.week = params.week;
        let players = CreatePlayers(params.players);
        players[0].WeekStarted = params.playerOneStartDate;
        players[0].WeekEnded = params.playerOneEndDate;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('#owedToLanes');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectResult.toString());
      });
    });
  });

  describe('total prize amount sums correctly', () => {
    [
      {week: 0, expectedResults: 0, playerOneStartDate: 0},
      {week: 0, expectedResults: 0, playerOneStartDate: 1},
      {week: 1, expectedResults: 0, playerOneStartDate: 0},
      {week: 1, expectedResults: 0, playerOneStartDate: 1},
      {week: 1, expectedResults: 0, playerOneStartDate: 2},
      {week: 2, expectedResults: 30, playerOneStartDate: 0},
      {week: 2, expectedResults: 30, playerOneStartDate: 1},
      {week: 2, expectedResults: 30, playerOneStartDate: 2},
      {week: 2, expectedResults: 15, playerOneStartDate: 3},
      {week: 3, expectedResults: 40, playerOneStartDate: 0},
      {week: 3, expectedResults: 40, playerOneStartDate: 1},
      {week: 3, expectedResults: 40, playerOneStartDate: 2},
      {week: 3, expectedResults: 25, playerOneStartDate: 3},
      {week: 3, expectedResults: 20, playerOneStartDate: 4},
    ].forEach(params => {
      it(`week ${params.week} should total ${params.expectedResults} when player one starts on week ${params.playerOneStartDate}`, async () => {
        let players = CreatePlayers(2);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players
        component.week = params.week;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('#prizeMoney');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectedResults.toString());
      });
    });
  });

  describe('total paid to date by player sums correctly', () => {
    [
      { week: 0, playerOneStartDate: 0, expectResult: 10},
      { week: 1, playerOneStartDate: 0, expectResult: 20},
      { week: 1, playerOneStartDate: 1, expectResult: 10},
    ].forEach((params: any) => {
      it(`week ${params.week} should total ${params.expectResult}, when player starts on week ${params.playerOneStartDate}`, async () => {
        component.week = params.week;
        let players = CreatePlayers(1);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('div[col-id="paidToDate"].ag-cell-value');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectResult.toString());
      });
    });
  });

  describe('total player owes to date sums correctly', () => {
    [
      { week: 0, playerOneStartDate: 0, expectResult: 15},
      { week: 1, playerOneStartDate: 0, expectResult: 30},
      { week: 1, playerOneStartDate: 1, expectResult: 15},
    ].forEach((params: any) => {
      it(`week ${params.week} should total ${params.expectResult}, when player starts on week ${params.playerOneStartDate}`, async () => {
        component.week = params.week;
        let players = CreatePlayers(1);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('div[col-id="oweToDate"].ag-cell-value');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectResult.toString());
      });
    });
  });

  describe('players difference to date sums correctly', () => {
    [
      { week: 0, playerOneStartDate: 0, expectResult: -5},
      { week: 1, playerOneStartDate: 0, expectResult: -10},
      { week: 1, playerOneStartDate: 1, expectResult: -5},
      { week: 2, playerOneStartDate: 0, expectResult: 0},
    ].forEach((params: any) => {
      it(`week ${params.week} should total ${params.expectResult}, when player starts on week ${params.playerOneStartDate}`, async () => {
        component.week = params.week;
        let players = CreatePlayers(1);
        players[0].WeekStarted = params.playerOneStartDate;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('div[col-id="difference"].ag-cell-value');
        const inputElement: HTMLInputElement|null = element.querySelector('input');

        expect(inputElement).toBeTruthy();
        expect(inputElement?.value).toBe(params.expectResult.toString());
      });
    });
  });

  describe('player name is color coded correctly', () => {
    [
      {color: "gold", paidToday: 5, shouldContain: true},
      {color: "firebrick", paidToday: 0, shouldContain: true},
      {color: "background-color", paidToday: 15, shouldContain: false}
    ].forEach((params: any) => {
      it(`player background should be ${params.color} when they pay ${params.paidToday}`, async () => {
        let players = CreatePlayers(1);
        players[0].AmountPaidEachWeek[0] = params.paidToday;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('div[col-id="Name"].ag-cell-value');

        expect(element).toBeTruthy();

        if(params.shouldContain){
          expect(element?.attributes.getNamedItem("style")?.value).toContain(params.color.toString());
        }
        else{
          expect(element?.attributes.getNamedItem("style")?.value).not.toContain(params.color.toString());
        }
      });
    });
  });

  describe('player difference is color coded correctly', () => {
    [
      {color: "firebrick", paidToday: 0, shouldContain: true},
      {color: "background-color", paidToday: 15, shouldContain: false}
    ].forEach((params: any) => {
      it(`player background should be ${params.color} when they pay ${params.paidToday}`, async () => {
        let players = CreatePlayers(1);
        players[0].AmountPaidEachWeek[0] = params.paidToday;
        mockDataManagerService.Players = players;
        fixture.detectChanges();
        await fixture.whenStable();

        const element: HTMLElement = fixture.nativeElement.querySelector('div[col-id="difference"].ag-cell-value');

        expect(element).toBeTruthy();

        if(params.shouldContain){
          expect(element?.attributes.getNamedItem("style")?.value).toContain(params.color.toString());
        }
        else{
          expect(element?.attributes.getNamedItem("style")?.value).not.toContain(params.color.toString());
        }
      });
    });
  });
});

function CreatePlayers(count: number){
  let players: IPlayerInfo[] = [];
  for(let i = 0; i < count; i++){
    players.push({
      ID: i,
      Name: `player${i}`,
      TeamID: 0,
      AmountPaidEachWeek: [10,10,25,15],
      WeekStarted: 0,
      WeekEnded: 4
    });
  }

  return players;
}