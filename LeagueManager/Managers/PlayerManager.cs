using LeagueManager.DataControl;
using System.Collections.Generic;
using LeagueManager.Interfaces;
using System.Linq;

namespace LeagueManager {
    public class PlayerManager : SharedManagerFunctions, IPlayerManager {

        public PlayerManager() : this(new DataAccessor()) { }

        public PlayerManager(IDataAccessor dataAccessor) : base(dataAccessor) { }

        public int AddNewPlayer(int teamId) {
            return _dataAccessor.AddNewPlayer(teamId);
        }

        public void UpdatePlayerInfo(PlayerInfo player) {
            _dataAccessor.UpdatePlayerInfo(player);
        }

        public void RemovePlayer(PlayerInfo player) {
            _dataAccessor.RemovePlayer(player);
        }

        public PlayerInfo GetPlayer(int playerId, int teamId) {
            return _dataAccessor.GetPlayer(playerId, teamId);
        }

        public List<PlayerInfo> GetPlayers(int teamId) {
            return _dataAccessor.GetAllPlayers(teamId);
        }

        public decimal GetTotalCostToDate(int teamId, int playerId, int week) {
            var startWeek = _dataAccessor.GetPlayer(playerId, teamId).WeekStarted-1;
            var weeksActive = (week+1) - startWeek;
            if(weeksActive < 0) {
                weeksActive = 0;
            }
            return _dataAccessor.GetCostPerWeek(teamId) * weeksActive;
        }

        public PlayerInfo UpdatePlayerAmountPaid(PlayerInfo playerInfo, int week, decimal amount) {
            var player = _dataAccessor.GetPlayer(playerInfo.Id, playerInfo.TeamId);

            while(player.AmountPaidEachWeek.Count <= week) {
                player.AmountPaidEachWeek.Add(0);
            }

            player.AmountPaidEachWeek[week] = amount;
            _dataAccessor.UpdatePlayerInfo(player);

            return player;
        }

        public decimal AmountStillOwedToDate(int playerId, int teamId, int week) {
            return  AmountPaidByPlayerToDate(playerId, teamId, week) - GetTotalCostToDate(teamId, playerId, week);
        }
    }
}
