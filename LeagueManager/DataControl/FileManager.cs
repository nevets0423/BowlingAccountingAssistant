using Newtonsoft.Json;
using System;
using System.Diagnostics;
using System.IO;

namespace LeagueManager.DataControl {
    internal static class FileManager {
        private static string folderName = "BowlerBuddy";
        private static string FileName = "BowlerBuddy.sav";
        private static string DebbuggerFileName = "BowlerBuddy_DebuggerMode.sav";

        public static SaveObject LoadFile() {
            var path = GetPath();

            var savedInformation = File.ReadAllText(path);
            if (string.IsNullOrWhiteSpace(savedInformation)) {
                return null;
            }

            return JsonConvert.DeserializeObject<SaveObject>(savedInformation);
        }

        public static void SaveFile(SaveObject dataToSave) {
            var path = GetPath();

            var dataInJsonFormat = JsonConvert.SerializeObject(dataToSave);

            File.WriteAllText(path, dataInJsonFormat);
        }

        public static void Touch() {
            TouchFolder();
            var path = GetPath();
            if (!File.Exists(path)) {
                File.AppendAllText(path, string.Empty);
            }
        }

        private static void TouchFolder() {
            var path = GetPath(false);
            Directory.CreateDirectory(path);
        }

        private static string GetPath(bool includeFileName = true) {
            var MyDocumentsPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            var path = $"{MyDocumentsPath}\\{folderName}";
            path += (includeFileName) ? $"\\{ FileName}" : string.Empty;

            if (Debugger.IsAttached && includeFileName) {
                path = $"{MyDocumentsPath}\\{folderName}\\{DebbuggerFileName}";
            }

            return path;
        }
    }
}
