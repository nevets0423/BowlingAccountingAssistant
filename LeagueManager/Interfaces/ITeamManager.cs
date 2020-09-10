using System.Collections.Generic;

namespace LeagueManager.Interfaces {
    public interface ITeamManager {
        int CreateNewTeam(int leagueId);
        TeamInfo GetTeam(int teamId);
        void RemoveTeam(TeamInfo team);
        List<TeamInfo> GetAllTeams(int leagueId);
    }
}