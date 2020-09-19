using LeagueManager;
using LeagueManager.DataControl;
using LeagueManagerTests.Test_Helpers;
using NUnit.Framework;
using Rhino.Mocks;
using System.Collections.Generic;

namespace LeagueManagerTests {
    [TestFixture]
    public class PlayerManagerTests {
        private IDataAccessor _dataAccessor;
        private PlayerManager _playerManager;
        private TeamInfo _teamInfo;

        [SetUp]
        public void Setup() {
            _dataAccessor = MockRepository.GenerateMock<IDataAccessor>();
            _playerManager = new PlayerManager(_dataAccessor);

            _teamInfo = GenerateObjects.GenerateTeamInfo();
            _teamInfo.Players = new List<PlayerInfo>();
            var player = GenerateObjects.GeneratePlayer();
            player.Id = 1;
            player.Name = "autumn";
            player.AmountPaidEachWeek = new List<decimal>();
            _teamInfo.Players.Add(player);
        }

        [TestCase(2, 1, 30)]
        [TestCase(2, 2, 20)]
        [TestCase(2, 3, 10)]
        public void Total_Owed_Amount_Sums_Correctly(int week, int startWeek, int expectedAmount) {
            _teamInfo.Players[0].WeekStarted = startWeek;
            _dataAccessor.Expect(m => m.GetPlayer(Arg<int>.Is.Anything, Arg<int>.Is.Anything))
                .Repeat.Once()
                .Return(_teamInfo.Players[0]);
            _dataAccessor.Expect(m => m.GetCostPerWeek(Arg<int>.Is.Anything))
                .Repeat.Once()
                .Return(10);

            var results = _playerManager.GetTotalCostToDate(1, 1, week);

            Assert.AreEqual(expectedAmount, results);
            _dataAccessor.VerifyAllExpectations();
        }

        [TestCase(0)]
        [TestCase(10)]
        public void Update_Player_Amount_Paid(int week) {
            _dataAccessor.Expect(m => m.GetPlayer(Arg<int>.Is.Anything, Arg<int>.Is.Anything))
                .Repeat.Once()
                .Return(_teamInfo.Players[0]);
            _dataAccessor.Expect(m => m.UpdatePlayerInfo(_teamInfo.Players[0]))
                .Repeat.Once();

            var results = _playerManager.UpdatePlayerAmountPaid(_teamInfo.Players[0], week, 5);

            Assert.AreEqual(results.AmountPaidEachWeek.Count, week + 1);
            Assert.AreEqual(results.AmountPaidEachWeek[week], 5);

            for(int i = 0; i < results.AmountPaidEachWeek.Count -1; i++) {
                if(i == week) {
                    continue;
                }
                Assert.AreEqual(results.AmountPaidEachWeek[i], 0);
            }

            _dataAccessor.VerifyAllExpectations();
        }
    }
}
