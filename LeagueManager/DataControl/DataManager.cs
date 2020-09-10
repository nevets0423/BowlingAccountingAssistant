using System;
using System.Collections.Generic;

namespace LeagueManager.DataControl {
    internal static class DataManager {
        public static bool Loaded { get; private set; } = false;
        public static List<LeagueInfo> Leagues;
        public static List<TeamInfo> Teams;
        public static AutoNum AutoNumbers;

        public static void LoadData() {
            BL_Logger.Logger.AttemptingToLoad();
            try {
                Loaded = true;
                FileManager.Touch();

                var savedData = FileManager.LoadFile();

                if(savedData == null) {
                    Default();
                    return;
                }

                Leagues = savedData.Leagues;
                Teams = savedData.Teams;
                AutoNumbers = savedData.AutoNum;
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
                    Teams = Teams
                };

                FileManager.SaveFile(dataToSave);
            } catch (Exception e) {
                BL_Logger.Logger.ErrorDuringSave(e);
                throw e;
            }
            BL_Logger.Logger.SaveSuccessful();
        }

        public static void Default() {
            Leagues = new List<LeagueInfo>();
            Teams = new List<TeamInfo>();
            AutoNumbers = new AutoNum() {
                LeageId = 0,
                PlayerId = 0,
                TeamId = 0
            };
        }
    }
}
