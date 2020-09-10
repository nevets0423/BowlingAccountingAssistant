using System;
using System.Collections.Generic;

namespace LeagueManager {
    public class TeamInfo : ICloneable{
        public int Id;
        public int LeagueId;
        public List<PlayerInfo> Players;

        public object Clone() {
            return new TeamInfo() {
                Id = this.Id,
                LeagueId = this.LeagueId,
                Players = (List<PlayerInfo>)this.Players.Clone()
            };
        }
    }
}
