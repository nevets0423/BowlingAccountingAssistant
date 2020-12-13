using System;

namespace LeagueManager.DataControl {
    public class DataMigration {
        public DataMigration() {
            if (!DataManager.Loaded) {
                DataManager.LoadData();
            }
        }

        public void Execute(Version currentVersion) {
            if (currentVersion.CompareTo(DataManager.MigrationInfo.LastRunOnVersion) <= 0) {
                BL_Logger.Logger.NoMigrationNeeded();
                return;
            }
            var lastRunMigration = DataManager.MigrationInfo.LastMigrationRun;
            var migrationsRun = 0;

            BL_Logger.Logger.StartingDataMigration(currentVersion, DataManager.MigrationInfo.LastRunOnVersion, lastRunMigration);

            /* Pattern for Migrations:
             *  - compare last run migration to designation for migration
             *    if last migration is less than designation the migration has not 
             *    been run and we need run it.
             *  - after running the migration incrament the number of migrations run this round
             *  
             * When all migrations are finished we will update the migration Info then save all the
             * new data
             */
            try {
                if (lastRunMigration < 1) {
                    BL_Logger.Logger.RunningMigration("Update EndDate For Players");
                    UpdateEndDateForPlayers();
                    migrationsRun++;
                }

                DataManager.MigrationInfo.LastMigrationRun += migrationsRun;
                DataManager.MigrationInfo.LastRunOnVersion = currentVersion;
                DataManager.SaveData();
                BL_Logger.Logger.DataMigrationCompleted();
            }
            catch (Exception e){
                BL_Logger.Logger.ErrorDuringMigration(e);
            }
        }

        private void UpdateEndDateForPlayers() {
            foreach(var team in DataManager.Teams) {
                var leagueLength = DataManager.Leagues.Find(l => l.Id == team.LeagueId).NumberOfWeeks;
                foreach(var player in team.Players) {
                    player.WeekEnded = (int)leagueLength;
                }
            }
        }
    }
}
