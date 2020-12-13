using System;

namespace LeagueManager {
    public class MigrationInfo {
        public Version LastRunOnVersion { get; set; }
        public int LastMigrationRun { get; set; }
    }
}
