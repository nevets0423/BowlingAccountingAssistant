import { pre_Player } from "./pre_player";

export interface pre_Team{
    Id: Number;
	LeagueId: Number
    Players: pre_Player[]
}