import { Version } from "./Version";

export interface MigrationInfo{
    LastRunOnVersion: Version;
    LastMigrationRun: number;
}