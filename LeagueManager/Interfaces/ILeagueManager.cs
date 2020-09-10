using System.Collections.Generic;

namespace LeagueManager.Interfaces {
    public interface ILeagueManager {
        int CreateLeague();
        LeagueInfo GetLeague(int leagueId);
        List<LeagueInfo> GetLeagues();
        void RemoveLeague(LeagueInfo league);
        void Save();
        void UpdateLeague(LeagueInfo league);
        List<TeamInfo> GetAllTeams(int leagueId);
        decimal TotalAmountPaidToDate(int leagueId, int week);
        decimal OwedToLanes(int leagueId, int week);
        decimal PaidToLanes(int leagueId, int week);
        decimal PrizeMoney(int leagueId, int week);
        int TotalPlayers(int leagueId);
        decimal AmountPaidToday(int leagueId, int week);
    }
}