using System.Collections.Generic;

namespace LeagueManager.Interfaces {
    public interface IPlayerManager {
        int AddNewPlayer(int teamId);
        decimal GetTotalCostToDate(int teamId, int playerId, int week);
        PlayerInfo GetPlayer(int playerId, int teamId);
        List<PlayerInfo> GetPlayers(int teamId);
        void RemovePlayer(PlayerInfo player);
        PlayerInfo UpdatePlayerAmountPaid(PlayerInfo playerInfo, int week, decimal amount);
        void UpdatePlayerInfo(PlayerInfo player);
        decimal AmountPaidToDate(int playerId, int teamId, int week);
        decimal AmountStillOwedToDate(int playerId, int teamId, int week);
    }
}