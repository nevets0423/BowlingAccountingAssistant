import { preAutoNum } from "./pre_autoNum";
import { pre_League } from "./pre_league";
import { pre_Team } from "./pre_team";

export interface preDataSaveObject{
    Leagues: pre_League[];
    Teams: pre_Team[];
    AutoNum: preAutoNum;
}