import { v1_0_0_IAutoNum } from "./v1.0.0-IAutoNum";
import { v1_0_0_ILeagueInfo } from "./v1.0.0-ILeagueInfo";
import { v1_0_0_IMigrationInfo } from "./v1.0.0-IMigrationInfo";
import { v1_0_0_IPlayerInfo } from "./v1.0.0-IPlayerInfo";
import { v1_0_0_ITeamInfoDTO } from "./v1.0.0-ITeamInfoDTO";

export interface v1_0_0_IDataSaveObject{
    LeagueInfo: v1_0_0_ILeagueInfo;
    TeamInfos: v1_0_0_ITeamInfoDTO[];
    PlayerInfos: v1_0_0_IPlayerInfo[];
    AutoNumber: v1_0_0_IAutoNum;
    MirgrationInfo: v1_0_0_IMigrationInfo;
}