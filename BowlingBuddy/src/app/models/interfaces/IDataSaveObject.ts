import { IAutoNum } from "./IAutoNum";
import { ILeagueInfo } from "./ILeagueInfo";
import { IMigrationInfo } from "./IMigrationInfo";
import { IPlayerInfo } from "./IPlayerInfo";
import { ITeamInfo } from "./ITeamInfo";

export interface IDataSaveObject{
    LeagueInfo: ILeagueInfo;
    TeamInfos: ITeamInfo[];
    PlayerInfos: IPlayerInfo[];
    AutoNumber: IAutoNum;
    MirgrationInfo: IMigrationInfo;
}