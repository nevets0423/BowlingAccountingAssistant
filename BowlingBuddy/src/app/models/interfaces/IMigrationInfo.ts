import { Version } from "../Version";
import { IVersion } from "./IVersion";

export interface IMigrationInfo{
    LastRunOnVersionInterface: IVersion;
    LastRunOnVersion: Version;
    LastMigrationRun: number;
}