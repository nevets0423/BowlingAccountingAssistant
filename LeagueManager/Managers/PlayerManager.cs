using LeagueManager.DataControl;
using System.Collections.Generic;
using LeagueManager.Interfaces;
using System.Linq;

namespace LeagueManager {
    public class PlayerManager : IPlayerManager {
        private IDataAccessor _dataAccessor;

        public PlayerManager() : this(new DataAccessor()) { }

        public PlayerManager(IDataAccessor dataAccessor) {
            _dataAccessor = dataAccessor;
        }

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

        public decimal GetTotalCostToDate(int teamId, int week) {
            return _dataAccessor.GetCostPerWeek(teamId) * (week + 1);
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

        public decimal AmountPaidToDate(int playerId, int teamId, int week) {
            return _dataAccessor.GetPlayer(playerId, teamId).AmountPaidEachWeek.Take(week + 1).Sum();
        }

        public decimal AmountStillOwedToDate(int playerId, int teamId, int week) {
            return  AmountPaidToDate(playerId, teamId, week) - GetTotalCostToDate(teamId, week);
        }
    }
}
