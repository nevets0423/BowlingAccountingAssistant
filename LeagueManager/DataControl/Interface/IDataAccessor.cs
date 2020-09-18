using System.Collections.Generic;

namespace LeagueManager.DataControl {
    public interface IDataAccessor {
        int AddNewPlayer(int teamId);
        int CreateNewLeague();
        int CreateNewTeam(int leagueId);
        List<LeagueInfo> GetAllLeagues();
        List<PlayerInfo> GetAllPlayers(int teamId);
        List<TeamInfo> GetAllTeams(int leagueId);
        decimal GetCostPerWeek(int teamId);
        LeagueInfo GetLeague(int leagueId);
        PlayerInfo GetPlayer(int playerId, int teamId);
        TeamInfo GetTeam(int teamId);
        void RemoveLeague(LeagueInfo league);
        void RemovePlayer(PlayerInfo player);
        void RemoveTeam(TeamInfo team);
        void Save();
        void UpdateLeagueInfo(LeagueInfo updatedLeague);
        void UpdatePlayerInfo(PlayerInfo updatedPlayer);
        int PlayersOnLeague(int leagueId);
        int ActivePlayersForWeek(int leagueId, int week);
        bool PlayerActiveForWeek(int Week, int playerId, int teamId);
    }
}