using LeagueManager.DataControl;
using LeagueManager.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace LeagueManager {
    public class TeamManager : ITeamManager {
        private IDataAccessor _dataAccessor;

        public TeamManager() : this(new DataAccessor()) { }

        public TeamManager(IDataAccessor dataAccessor) {
            _dataAccessor = dataAccessor;
        }

        public int CreateNewTeam(int leagueId) {
            return _dataAccessor.CreateNewTeam(leagueId);
        }

        public void RemoveTeam(TeamInfo team) {
            _dataAccessor.RemoveTeam(team);
        }

        public TeamInfo GetTeam(int teamId) {
            return _dataAccessor.GetTeam(teamId);
        }

        public List<TeamInfo> GetAllTeams(int leagueId) {
            return _dataAccessor.GetAllTeams(leagueId);
        }
    }
}
