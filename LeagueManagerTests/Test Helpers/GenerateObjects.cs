using LeagueManager;
using System.Collections.Generic;

namespace LeagueManagerTests.Test_Helpers {
    public static class GenerateObjects {
        public static LeagueInfo GenerateNewLeague() {
            return new LeagueInfo() {
                Id = 0,
                LaneFee = 10m,
                Name = "TestLeague",
                NumberOfWeeks = 20,
                PrizeAmountPerWeek = 5m
            };
        }

        public static TeamInfo GenerateTeamInfo() {
            return new TeamInfo() {
                Id = 0,
                LeagueId = 0,
                Players = new List<PlayerInfo>()
            };
        }

        public static PlayerInfo GeneratePlayer() {
            return new PlayerInfo(){
                Id = 0,
                Name = "steve",
                TeamId = 0,
                AmountPaidEachWeek = new List<decimal>(){
                    10,
                    10,
                    25,
                    15
                }
            };
        }
    }
}
