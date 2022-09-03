import { AutoNum } from "./AutoNum";
import { LeagueInfo } from "./LeagueInfo";
import { MigrationInfo } from "./MigrationInfo";
import { PlayerInfo } from "./PlayerInfo";
import { TeamInfo } from "./TeamInfo";

export interface DataSaveObject{
    LeagueInfo: LeagueInfo;
    TeamInfos: TeamInfo[];
    PlayerInfos: PlayerInfo[];
    AutoNumber: AutoNum;
    MirgrationInfo: MigrationInfo;
}