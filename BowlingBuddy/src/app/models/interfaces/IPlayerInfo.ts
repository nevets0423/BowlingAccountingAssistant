export interface IPlayerInfo{
    ID: number;
    TeamID: number;
    Name: string;
    PaidToDate: number;
    WeekStarted: number;
    WeekEnded: number;
    AmountPaidEachWeek: number[];
}