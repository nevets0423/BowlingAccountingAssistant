import { IAutoNum } from "./IAutoNum";
import { ILeagueInfo } from "./ILeagueInfo";
import { IMigrationInfo } from "./IMigrationInfo";
import { IPlayerInfo } from "./IPlayerInfo";
import { ITeamInfoDTO } from "./ITeamInfoDTO";

export interface IDataSaveObject{
    LeagueInfo: ILeagueInfo;
    TeamInfos: ITeamInfoDTO[];
    PlayerInfos: IPlayerInfo[];
    AutoNumber: IAutoNum;
    MirgrationInfo: IMigrationInfo;
}