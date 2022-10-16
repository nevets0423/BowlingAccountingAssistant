import { Version } from "../../../models/Version";
import { v1_0_0_IVersion } from "./v1.0.0-IVersion";

export interface v1_0_0_IMigrationInfo{
    LastRunOnVersionInterface: v1_0_0_IVersion;
    LastRunOnVersion: Version;
    LastMigrationRun: number;
}