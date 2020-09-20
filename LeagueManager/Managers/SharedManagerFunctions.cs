using LeagueManager.DataControl;
using System.Linq;

namespace LeagueManager {
    public abstract class SharedManagerFunctions {
        protected IDataAccessor _dataAccessor;

        public SharedManagerFunctions() : this(new DataAccessor()) { }

        public SharedManagerFunctions(IDataAccessor dataAccessor) {
            _dataAccessor = dataAccessor;
        }

        public decimal AmountPaidByPlayerToDate(int playerId, int teamId, int week) {
            var player = _dataAccessor.GetPlayer(playerId, teamId);
            if (player.WeekStarted <= week + 1) {
                return player.AmountPaidEachWeek.Take(week + 1).Sum();
            }

            return 0;
        }
    }
}
