using System;
using System.Collections.Generic;
using System.Linq;

namespace LeagueManager.DataControl {
    internal class DataAccessor : IDataAccessor {

        public DataAccessor() {
            if (!DataManager.Loaded) {
                DataManager.LoadData();
            }
        }

        public int CreateNewLeague() {
            var leagueId = DataManager.AutoNumbers.LeageId;

            DataManager.Leagues.Add(new LeagueInfo() {
                Id = leagueId,
                LaneFee = 0m,
                Name = string.Empty,
                NumberOfWeeks = 0,
                PrizeAmountPerWeek = 0
            });

            return leagueId;
        }

        public PlayerInfo GetPlayer(int playerId, int teamId) {
            return DataManager.Teams.Find(t => t.Id == teamId).Players.Find(p => p.Id == playerId);
        }

        public List<PlayerInfo> GetAllPlayers(int teamId) {
            return DataManager.Teams.Find(t => t.Id == teamId).Players;
        }

        public void Save() {
            DataManager.SaveData();
        }

        public decimal GetCostPerWeek(int teamId) {
            var leagueId = DataManager.Teams.Find(t => t.Id == teamId).LeagueId;
            var league = DataManager.Leagues.Find(l => l.Id == leagueId);

            return league.LaneFee + league.PrizeAmountPerWeek;
        }

        public void UpdateLeagueInfo(LeagueInfo updatedLeague) {
            var league = DataManager.Leagues.Find(l => l.Id == updatedLeague.Id);

            league.LaneFee = updatedLeague.LaneFee;
            league.Name = updatedLeague.Name;
            league.NumberOfWeeks = updatedLeague.NumberOfWeeks;
            league.PrizeAmountPerWeek = updatedLeague.PrizeAmountPerWeek;
        }

        public LeagueInfo GetLeague(int leagueId) {
            return DataManager.Leagues.Find(l => l.Id == leagueId);
        }

        public void RemoveLeague(LeagueInfo league) {
            DataManager.Teams.FindAll(t => t.LeagueId == league.Id).ForEach(t => RemoveTeam(t));
            DataManager.Leagues.RemoveAll(l => l.Id == league.Id);
        }

        public List<LeagueInfo> GetAllLeagues() {
            return (List<LeagueInfo>)DataManager.Leagues.Clone();
        }

        public int CreateNewTeam(int leagueId) {
            var teamId = DataManager.AutoNumbers.TeamId;
            DataManager.Teams.Add(new TeamInfo(){
                Id = teamId,
                LeagueId = leagueId,
                Players = new List<PlayerInfo>()
            });
            return teamId;
        }

        public int AddNewPlayer(int teamId) {
            var playerId = DataManager.AutoNumbers.PlayerId;
            var team = GetUpdateableTeam(teamId);

            team.Players.Add(new PlayerInfo(){
                Id = playerId,
                TeamId = teamId,
                AmountPaidEachWeek = new List<decimal>(),
                Name = string.Empty,
                PaidToDate = 0,
                WeekStarted = 1
            });
            return playerId;
        }

        public void UpdatePlayerInfo(PlayerInfo updatedPlayer) {
            var team = GetUpdateableTeam(updatedPlayer.TeamId);
            var player = team.Players.Find( p => p.Id == updatedPlayer.Id);

            player.AmountPaidEachWeek = (List<decimal>)updatedPlayer.AmountPaidEachWeek.Copy();
            player.Name = updatedPlayer.Name;
            player.PaidToDate = updatedPlayer.PaidToDate;
            player.WeekStarted = updatedPlayer.WeekStarted;
        }

        public TeamInfo GetTeam(int teamId) {
            return (TeamInfo)DataManager.Teams.Find(t => t.Id == teamId).Clone();
        }

        public void RemovePlayer(PlayerInfo player) {
            var team = DataManager.Teams.Find(t => t.Id == player.TeamId);
            team.Players.RemoveAll(p => p.Id == player.Id);
        }

        public void RemoveTeam(TeamInfo team) {
            DataManager.Teams.RemoveAll(t => t.Id == team.Id && t.LeagueId == team.LeagueId);
        }

        public List<TeamInfo> GetAllTeams(int leagueId) {
            return (List<TeamInfo>)DataManager.Teams.Where(t => t.LeagueId == leagueId).ToList().Clone();
        }

        private TeamInfo GetUpdateableTeam(int teamId) {
            var team = DataManager.Teams.Where(t => t.Id == teamId).ToList()?[0];

            if (team == null) {
                throw new Exception("Team Not Found");
            }

            return team;
        }

        public int PlayersOnLeague(int leagueId) {
            var players = 0;
            GetAllTeams(leagueId).ForEach(t => players += t.Players.Count);
            return players;
        }

        public int ActivePlayersForWeek(int leagueId, int week) {
            var players = 0;
            GetAllTeams(leagueId).ForEach(t => players += (t.Players.Where(p => p.WeekStarted-1 <= week)).Count());
            return players;
        }

        public bool PlayerActiveForWeek(int Week, int playerId, int teamId) {
            return GetPlayer(playerId, teamId).WeekStarted <= Week;
        }
    }
}
