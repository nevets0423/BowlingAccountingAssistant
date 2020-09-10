using System;
using System.IO;

namespace BL_Logger {
    public static class Logger{
        public enum Severity { Critical, Error, Info };

        private static void LogMessage(string message, Severity severity) {
            var path = $"{ Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}\\BowlerBuddy\\Logs";
            Directory.CreateDirectory(path);
            File.AppendAllText($"{path}\\{ DateTime.Now.ToString("yyyy-MM-dd") }_log.txt", $"{DateTime.Now} -- {severity} // {message} {Environment.NewLine}");
        }

        public static void AttemptingToSave() {
            LogMessage("Attempting To Save", Severity.Info);
        }

        public static void SaveSuccessful() {
            LogMessage("Save Successful", Severity.Info);
        }

        public static void ErrorDuringSave(Exception e) {
            LogMessage($"Error During Save. {e.Message}", Severity.Error);
        }

        public static void AttemptingToLoad() {
            LogMessage("Attempting To load saved leagues", Severity.Info);
        }

        public static void ErrorDuringLoad(Exception e) {
            LogMessage($"Error Loading Save Data.{e.Message}", Severity.Critical);
        }

        public static void LoadSuccessful() {
            LogMessage("Loading successful", Severity.Info);
        }

        public static void AttemptingToExportToExcel() {
            LogMessage("Attempting to Export To excel.", Severity.Info);
        }

        public static void ErrorDuringExport(Exception e) {
            LogMessage($"Error Occured During Export. {e.Message}", Severity.Error);
        }

        public static void ExportSuccessful() {
            LogMessage("Export successful.", Severity.Info);
        }
    }
}
