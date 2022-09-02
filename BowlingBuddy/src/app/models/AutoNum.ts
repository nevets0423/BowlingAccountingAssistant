export class AutoNum {
    private _playerId: number = 0;
    private _teamId: number = 0;
    private _leagueId: number = 0;

    public get PlayerID() {
        return this._playerId++;
    }

    public set PlayerID(value: number) {
        this._playerId = value;
    }

    public get TeamID() {
        return this._teamId++;
    }

    public set TeamID(value: number) {
        this._teamId = value;
    }

    public get LeagueID() {
        return this._leagueId++;
    }

    public set LeagueID(value: number) {
        this._leagueId = value;
    }
}