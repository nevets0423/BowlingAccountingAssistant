using System;
using System.Collections.Generic;

namespace LeagueManager.DataControl {
    internal static class DataManager {
        public static bool Loaded { get; private set; } = false;
        public static List<LeagueInfo> Leagues;
        public static List<TeamInfo> Teams;
        public static AutoNum AutoNumbers;
        public static MigrationInfo MigrationInfo;

        public static void LoadData() {
            BL_Logger.Logger.AttemptingToLoad();
            try {
                Loaded = true;
                FileManager.Touch();

                var savedData = FileManager.LoadFile();

                if(savedData == null) {
                    Default();
                    BL_Logger.Logger.NoDataFoundInFile();
                    return;
                }

                Leagues = savedData.Leagues;
                Teams = savedData.Teams;
                AutoNumbers = savedData.AutoNum;
                MigrationInfo = MigrationInfoOrDefault(savedData.MigrationInfo);

            } catch (Exception e){
                Default();
                BL_Logger.Logger.ErrorDuringLoad(e);
            }
            BL_Logger.Logger.LoadSuccessful();
        }

        public static void SaveData() {
            BL_Logger.Logger.AttemptingToSave();
            try {
                var dataToSave = new SaveObject() {
                    AutoNum = AutoNumbers,
                    Leagues = Leagues,
                    Teams = Teams,
                    MigrationInfo = MigrationInfo
                };

                FileManager.SaveFile(dataToSave);
            } catch (Exception e) {
                BL_Logger.Logger.ErrorDuringSave(e);
                throw e;
            }
            BL_Logger.Logger.SaveSuccessful();
        }

        internal static string LoadFromBackup(string path) {
            BL_Logger.Logger.AttemptingToLoadFromBackup();
            try {
                Loaded = true;

                var savedData = FileManager.LoadFromBackup(path);

                if (savedData == null) {
                    BL_Logger.Logger.NoDataFoundInFile();
                    return "No data found in file.  Current Save will not be changed.";
                }

                Leagues = savedData.Leagues;
                Teams = savedData.Teams;
                AutoNumbers = savedData.AutoNum;
                MigrationInfo = MigrationInfoOrDefault(savedData.MigrationInfo);
            } catch (Exception e) {
                BL_Logger.Logger.ErrorDuringLoad(e);
                return "An error occured while loading. Current Save will not be changed.";
            }
            BL_Logger.Logger.LoadSuccessful();
            return string.Empty;
        }

        public static void SaveData(string path) {
            BL_Logger.Logger.AttemptingToSave();
            try {
                var dataToSave = new SaveObject() {
                    AutoNum = AutoNumbers,
                    Leagues = Leagues,
                    Teams = Teams,
                    MigrationInfo = MigrationInfo
                };

                FileManager.SaveFile(dataToSave, path);
            } catch (Exception e) {
                BL_Logger.Logger.ErrorDuringSave(e);
                throw e;
            }
            BL_Logger.Logger.SaveSuccessful();
        }

        public static MigrationInfo MigrationInfoOrDefault(MigrationInfo migrationInfo) {
            if (migrationInfo == null) {
                return new MigrationInfo {
                    LastMigrationRun = 0,
                    LastRunOnVersion = new Version(0, 0, 0, 0)
                };
            }
            else {
                return migrationInfo;
            }
        }

        public static void Default() {
            Leagues = new List<LeagueInfo>();
            Teams = new List<TeamInfo>();
            AutoNumbers = new AutoNum() {
                LeageId = 0,
                PlayerId = 0,
                TeamId = 0
            };
            MigrationInfo = MigrationInfoOrDefault(null);
        }
    }
}
