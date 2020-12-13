using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;

namespace LeagueManager {
    public class ExcelDocumentExporter {
        private LeagueManager _leagueManager;
        private PlayerManager _playerManager;
        private string[] _teamHeaders;
        private string _laneFee = "B2";
        private string _prizeAmount = "B3";
        private string _costPerWeek = "B4";
        private string _numberOfWeeks = "B5";
        private string _totalPlayersOnLeague = "B6";
        private string _leagueInfoPage = "League Info";
        private int _teamHorizontalSpacer = 1;
        private int _teamVerticalSpacer = 4;
        private int _teamRowStart = 4;

        public ExcelDocumentExporter() {
            _leagueManager = new LeagueManager();
            _playerManager = new PlayerManager();
            _teamHeaders = new string[] { "Name", "Paid", "Paid To Date", "Owed To Date", "Difference" };
        }

        public void Export(int leagueId, string filePath) {
            BL_Logger.Logger.AttemptingToExportToExcel();
            try {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                File.Delete(filePath);

                using (var package = new ExcelPackage(new FileInfo(filePath))) {
                    CreateExcelFile(package, leagueId);
                    package.Save();
                }
            }catch (Exception e) {
                BL_Logger.Logger.ErrorDuringExport(e);
                throw e;
            }

            BL_Logger.Logger.ExportSuccessful();
        }

        private void CreateExcelFile(ExcelPackage package, int leagueId) {
            var league = _leagueManager.GetLeague(leagueId);
            var teams = _leagueManager.GetAllTeams(leagueId);
            var playersPerTeam = 0;

            teams.ForEach(t => playersPerTeam = (t.Players.Count > playersPerTeam) ? t.Players.Count : playersPerTeam);

            var leagueSheet = package.Workbook.Worksheets.Add(_leagueInfoPage);
            LeagueInfoPage(leagueSheet, league);

            for (int week = 0; week < league.NumberOfWeeks; week++) {
                var workSheet = package.Workbook.Worksheets.Add($"Week {week + 1}");
                var headerRow = _teamRowStart;
                var headerColumn = 1;
                var activePlayersForWeek = 0;
                teams.ForEach(t => t.Players.ForEach(p => activePlayersForWeek += (p.ActiveForWeek(week)) ? 1:0));

                WeekHeader(workSheet, week, teams.Count, playersPerTeam, activePlayersForWeek);

                for (int i = 0; i < teams.Count; i++) {
                    if (i != 0 && i % 3 == 0) {
                        headerRow += _teamVerticalSpacer + playersPerTeam;
                        headerColumn = 1;
                    }

                    TeamHeader(workSheet, headerRow, headerColumn);

                    var playerNames = new List<string[]>();
                    var playerValues = new List<decimal>();
                    var weekActive = new List<int>();
                    var lastWeekActive = new List<int>();
                    for (int j = 0; j < teams[i].Players.Count; j++) {
                        var player = teams[i].Players[j];
                        playerNames.Add(new string[] {
                                (player.ActiveForWeek(week)) ? player.Name : string.Empty
                            });
                        weekActive.Add(player.WeekStarted);
                        lastWeekActive.Add(player.WeekEnded);
                        playerValues.Add((player.AmountPaidEachWeek.Count > week) ? player.AmountPaidEachWeek[week] : 0m);
                    }

                    PlayerLines(workSheet, headerRow + 1, headerColumn, playerNames, playerValues, weekActive, lastWeekActive, week);

                    headerColumn += _teamHeaders.Length + _teamHorizontalSpacer;
                }
                workSheet.Cells.AutoFitColumns();
            }
        }

        private void LeagueInfoPage(ExcelWorksheet workSheet, LeagueInfo league) {
            workSheet.Cells["A1"].Value = "League Name";
            workSheet.Cells["A2"].Value = "Lane Fee";
            workSheet.Cells["A3"].Value = "Prize Amount Per Week";
            workSheet.Cells["A4"].Value = "Total Cost Per Week";
            workSheet.Cells["A5"].Value = "Total Weeks";
            workSheet.Cells["A6"].Value = "Total Players On League";
            HeaderStyle(workSheet.Cells["A1:A6"]);

            workSheet.Cells["B1"].Value = league.Name;
            workSheet.Cells[_laneFee].Value = league.LaneFee;
            workSheet.Cells[_prizeAmount].Value = league.PrizeAmountPerWeek;
            workSheet.Cells[_costPerWeek].Formula = "SUM(B2:B3)";
            workSheet.Cells[_numberOfWeeks].Value = league.NumberOfWeeks;
            workSheet.Cells[_totalPlayersOnLeague].Value = _leagueManager.TotalPlayers(league.Id);

            workSheet.Cells[$"B1,{_laneFee},{_prizeAmount},{_costPerWeek},{_numberOfWeeks},{_totalPlayersOnLeague}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;

            workSheet.Cells.AutoFitColumns();
        }

        private void WeekHeader(ExcelWorksheet workSheet, int week, int teamCount, int playerPerTeam, int totalPlayers) {
            workSheet.Cells["A1"].Value = "Paid Today";
            workSheet.Cells["B1"].Value = "Paid To Date";
            workSheet.Cells["C1"].Value = "Paid To Lanes";
            workSheet.Cells["D1"].Value = "Owed To Lanes";
            workSheet.Cells["E1"].Value = "Prize Money";
            workSheet.Cells["F1"].Value = "Players For Week";
            HeaderStyle(workSheet.Cells["A1:F1"]);

            var locationsOfPaidAmounts = new List<string>();
            var row = _teamRowStart + 2;
            var column = 2;

            //Collects locations for where amount paid will be for each player
            for(int team = 0; team < teamCount; team++) {
                if (team != 0 && team % 3 == 0) {
                    column = 2;
                    row += playerPerTeam + _teamVerticalSpacer;
                }

                for (int player = 0; player < playerPerTeam; player++) {
                    locationsOfPaidAmounts.Add(workSheet.Cells[row + player, column].Address);
                }
                column += _teamHorizontalSpacer + _teamHeaders.Length;
            }

            var currentLaneFee = $"(('{_leagueInfoPage}'!{_laneFee}) * F2)";

            workSheet.Cells["A2"].Formula = $"{locationsOfPaidAmounts.Aggregate((i, j) => i + " + " + j)}";
            if (week == 0) {
                workSheet.Cells["B2"].Formula = "A2";
            } else {
                workSheet.Cells["B2"].Formula = $"A2 + 'Week {week}'!B2";
                currentLaneFee += $" + 'Week {week}'!D2";
            }
            workSheet.Cells["C2"].Formula = $"IF( D2 > B2, B2, D2)";
            workSheet.Cells["D2"].Formula = currentLaneFee;
            workSheet.Cells["E2"].Formula = "IF(B2-C2 > 0, B2-C2,0)";
            workSheet.Cells["F2"].Value = totalPlayers;
        }

        private void TeamHeader(ExcelWorksheet workSheet, int row, int column) {
            var headerRows = new List<string[]>() { _teamHeaders };
            var numberOfHeaders = _teamHeaders.Length - 1;

            workSheet.Cells[row, column].LoadFromArrays(headerRows);
            HeaderStyle(workSheet.Cells[row, column, row, column + numberOfHeaders]);
        }

        private void HeaderStyle(ExcelRange cells) {
            cells.Style.Font.Bold = true;
            cells.Style.Fill.PatternType = ExcelFillStyle.Solid;
            cells.Style.Fill.BackgroundColor.SetColor(Color.Gray);
            cells.Style.Font.Size = 10;
            cells.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            cells.Style.Border.Bottom.Color.SetColor(Color.Black);
        }

        private void PlayerLines(ExcelWorksheet workSheet, int row, int column, List<string[]> playerNames, List<decimal> PaidAmounts, List<int> weekActive, List<int> lastWeekActive, int week) {
            var numberOfRows = _teamHeaders.Length;
            var numberOfPlayers = playerNames.Count;

            /*
             * Adds the player names to the spread sheet. 
             * Each List is a row and each array item a column
            */
            workSheet.Cells[row, column].LoadFromArrays(playerNames);

            //formats the cells with money.
            workSheet.Cells[row, column, row + numberOfPlayers, column + numberOfRows].Style.Font.Size = 11;
            workSheet.Cells[row, column + 1, row + numberOfPlayers, column + numberOfRows].Style.Numberformat.Format = "0.00";

            /*
             * For each player we add the relevant info to the page.
             * - First cell after the name is the amount paid today.
             * - Second cell after the name is the amount paid to date
             * - Third cell after the name is the amount owed to date
             * - Fourth Cell after the name is the difference
             */
            for (int i = 0; i < PaidAmounts.Count; i++) {
                if (weekActive[i] > week+1 || lastWeekActive[i] <= week) {
                    continue;
                }
                workSheet.Cells[row + i, column + 1].Value = PaidAmounts[i];

                if (week == 0 || weekActive[i] == week+1) {
                    workSheet.Cells[row + i, column + 2].Formula = $"{workSheet.Cells[row + i, column + 1].Address}";
                    workSheet.Cells[row + i, column + 3].Formula = $"'{_leagueInfoPage}'!{_costPerWeek}";
                } else {
                    workSheet.Cells[row + i, column + 2].Formula = $"{workSheet.Cells[row + i, column + 1].Address} + 'Week {week}'!{workSheet.Cells[row + i, column + 2].Address}";
                    workSheet.Cells[row + i, column + 3].Formula = $"'{_leagueInfoPage}'!{_costPerWeek} + 'Week {week}'!{workSheet.Cells[row + i, column + 3].Address}";
                }
                
                workSheet.Cells[row + i, column + 4].Formula = $"{workSheet.Cells[row + i, column + 2].Address} - {workSheet.Cells[row + i, column + 3].Address}";
            }
        }
    }
}
