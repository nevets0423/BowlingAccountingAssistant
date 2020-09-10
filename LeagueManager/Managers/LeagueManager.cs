using LeagueManager.DataControl;
using System.Collections.Generic;
using LeagueManager.Interfaces;
using System.Linq;

namespace LeagueManager {
    public class LeagueManager : ILeagueManager {
        private IDataAccessor _dataAccessor;

        public LeagueManager() : this(new DataAccessor()) { }

        public LeagueManager(IDataAccessor dataAccessor) {
            _dataAccessor = dataAccessor;
        }

        public int CreateLeague() {
            return _dataAccessor.CreateNewLeague();
        }

        public void UpdateLeague(LeagueInfo league) {
            _dataAccessor.UpdateLeagueInfo(league);
        }

        public void RemoveLeague(LeagueInfo league) {
            _dataAccessor.RemoveLeague(league);
        }

        public List<LeagueInfo> GetLeagues() {
            return _dataAccessor.GetAllLeagues();
        }

        public LeagueInfo GetLeague(int leagueId) {
            return _dataAccessor.GetLeague(leagueId);
        }

        public List<TeamInfo> GetAllTeams(int leagueId) {
            return _dataAccessor.GetAllTeams(leagueId);
        }

        public decimal TotalAmountPaidToDate(int leagueId, int week) {
            var teams = _dataAccessor.GetAllTeams(leagueId);
            var totalPaid = 0m;

            foreach (var team in teams) {
                foreach (var player in team.Players) {
                    totalPaid += player.AmountPaidEachWeek.Take(week + 1).Sum();
                }
            }

            return totalPaid;
        }

        public decimal OwedToLanes(int leagueId, int week) {
            return (GetLeague(leagueId).LaneFee * (week + 1)) * _dataAccessor.PlayersOnLeague(leagueId);
        }

        public decimal PaidToLanes(int leagueId, int week) {
            var oweToLanes = OwedToLanes(leagueId, week);
            var paidToDate = TotalAmountPaidToDate(leagueId, week);

            return (oweToLanes > paidToDate) ? paidToDate : oweToLanes;
        }

        public decimal PrizeMoney(int leagueId, int week) {
            var oweToLanes = OwedToLanes(leagueId, week);
            var paidToDate = TotalAmountPaidToDate(leagueId, week);
            
            return (paidToDate - oweToLanes < 0) ? 0 : (paidToDate - oweToLanes);
        }

        public int TotalPlayers(int leagueId) {
            return _dataAccessor.PlayersOnLeague(leagueId);
        }

        public void Save() {
            _dataAccessor.Save();
        }

        public decimal AmountPaidToday(int leagueId, int week) {
            var teams = _dataAccessor.GetAllTeams(leagueId);

            var totalPaidToday = 0m;

            foreach(var team in teams) {
                foreach(var player in team.Players) {
                    if(player.AmountPaidEachWeek.Count > week) {
                        totalPaidToday += player.AmountPaidEachWeek[week];
                    }
                }
            }

            return totalPaidToday;
        }
    }
}
