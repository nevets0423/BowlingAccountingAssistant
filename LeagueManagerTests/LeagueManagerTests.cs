using LeagueManager;
using LeagueManager.DataControl;
using LeagueManagerTests.Test_Helpers;
using NUnit.Framework;
using Rhino.Mocks;
using System.Collections.Generic;

namespace LeagueManagerTests {
    [TestFixture]
    public class LeagueManagerTests {
        private IDataAccessor _dataAccessor;
        private LeagueManager.LeagueManager _leagueManager;
        private TeamInfo _teamInfo;

        [SetUp]
        public void Setup() {
            _dataAccessor = MockRepository.GenerateMock<IDataAccessor>();
            _leagueManager = new LeagueManager.LeagueManager(_dataAccessor);

            _teamInfo = GenerateObjects.GenerateTeamInfo();
            _teamInfo.Players.Add(GenerateObjects.GeneratePlayer());
            var player2 = GenerateObjects.GeneratePlayer();
            player2.Id = 1;
            player2.Name = "autumn";
            _teamInfo.Players.Add(player2);
        }

        [TestCase(0,20)]
        [TestCase(1, 40)]
        [TestCase(2, 90)]
        [TestCase(3, 120)]
        [TestCase(4, 120)]
        public void Total_Amount_Paid_To_Date_Sums_Correctly(int week, decimal expectedResult) {
            _dataAccessor.Expect(m => m.GetAllTeams(Arg<int>.Is.Equal(0)))
                .Repeat.Once()
                .Return(new List<TeamInfo>() { _teamInfo });

            var results = _leagueManager.TotalAmountPaidToDate(0, week);

            Assert.AreEqual(expectedResult, results);
            _dataAccessor.VerifyAllExpectations();
        }

        [TestCase(0, 20)]
        [TestCase(1, 40)]
        [TestCase(2, 60)]
        [TestCase(3, 80)]
        public void Lane_Fee_Amount_Is_Correct(int week, decimal expectedResult) {
            var league = GenerateObjects.GenerateNewLeague();
            _dataAccessor.Expect(m => m.GetLeague(Arg<int>.Is.Equal(league.Id)))
                .Repeat.Once()
                .Return(league);
            _dataAccessor.Expect(m => m.PlayersOnLeague(Arg<int>.Is.Equal(0)))
               .Repeat.Once()
               .Return(2);

            var results = _leagueManager.OwedToLanes(league.Id, week);

            Assert.AreEqual(expectedResult, results);
            _dataAccessor.VerifyAllExpectations();
        }

        [TestCase(0, 20)]
        [TestCase(1, 40)]
        [TestCase(2, 60)]
        [TestCase(3, 80)]
        [TestCase(4, 100)]
        [TestCase(12, 120)]
        public void Total_Amount_Paid_To_Lanes_Sums_Correctly(int week, decimal expectedResult) {
            var league = GenerateObjects.GenerateNewLeague();
            _dataAccessor.Expect(m => m.GetLeague(Arg<int>.Is.Equal(league.Id)))
                .Repeat.Once()
                .Return(league);
            _dataAccessor.Expect(m => m.GetAllTeams(Arg<int>.Is.Equal(0)))
               .Repeat.Once()
               .Return(new List<TeamInfo>() { _teamInfo });
            _dataAccessor.Expect(m => m.PlayersOnLeague(Arg<int>.Is.Equal(0)))
               .Repeat.Once()
               .Return(2);

            var results = _leagueManager.PaidToLanes(league.Id, week);

            Assert.AreEqual(expectedResult, results);
            _dataAccessor.VerifyAllExpectations();
        }

        [TestCase(0, 0)]
        [TestCase(1, 0)]
        [TestCase(2, 30)]
        [TestCase(3, 40)]
        [TestCase(4, 20)]
        [TestCase(12, 0)]
        public void Prize_Amount_Sums_Correctly(int week, decimal expectedResult) {
            var league = GenerateObjects.GenerateNewLeague();
            _dataAccessor.Expect(m => m.GetLeague(Arg<int>.Is.Equal(league.Id)))
                .Repeat.Once()
                .Return(league);
            _dataAccessor.Expect(m => m.GetAllTeams(Arg<int>.Is.Equal(0)))
               .Repeat.Once()
               .Return(new List<TeamInfo>() { _teamInfo });
            _dataAccessor.Expect(m => m.PlayersOnLeague(Arg<int>.Is.Equal(0)))
               .Repeat.Once()
               .Return(2);

            var results = _leagueManager.PrizeMoney(league.Id, week);

            Assert.AreEqual(expectedResult, results);
            _dataAccessor.VerifyAllExpectations();
        }
    }
}
