export interface pre_Player{
    Id: Number;
	TeamId: Number;
	Name: string;
	PaidToDate: Number;
	WeekStarted: Number;
	WeekEnded: Number;
	AmountPaidEachWeek: Number[];
	paid: Number;
	oweToDate: Number;
	difference: Number;
}