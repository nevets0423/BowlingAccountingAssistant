using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class Weekly_ViewAllTeams : UserControl {
        private ILeagueManager _leagueManager;
        private LeagueInfo _leagueInfo;
        private int _week;
        private bool _refreshRequested = false;

        public event EventHandler RequestRefresh;

        public Weekly_ViewAllTeams() : this(new LeagueInfo(), 0) { }

        public Weekly_ViewAllTeams(LeagueInfo leagueInfo, int week) {
            InitializeComponent();
            _leagueManager = new LeagueManager.LeagueManager();
            _leagueInfo = leagueInfo;
            _week = week;
            AddTeams();

            SetAmounts();
        }

        private void SetAmounts() {
            paidToDate_textBox.Text = _leagueManager.TotalAmountPaidToDate(_leagueInfo.Id, _week).ToString();
            paidToLanes_textBox.Text = _leagueManager.PaidToLanes(_leagueInfo.Id, _week).ToString();
            prizeMoney_textBox.Text = _leagueManager.PrizeMoney(_leagueInfo.Id, _week).ToString();
            owedToLanes_textBox.Text = _leagueManager.OwedToLanes(_leagueInfo.Id, _week).ToString();
        }

        private void AddTeams() {
            ClearTeams();
            var teams = _leagueManager.GetAllTeams(_leagueInfo.Id);

            foreach(var team in teams) {
                CreateTeam(team);
            }
        }

        private void CreateTeam(TeamInfo team) {
            var teamView = new Weekly_TeamInfo(team, _week);
            teamView.Show();
            teamView.AmountUpdated += TeamView_AmountUpdated;

            team_flowLayoutPanel.Controls.Add(teamView);
        }

        private void TeamView_AmountUpdated(object sender, System.EventArgs e) {
            SetAmounts();
            OnRefreshRequested();
        }

        private void ClearTeams() {
            team_flowLayoutPanel.Controls.Clear();
        }

        private void OnRefreshRequested() {
            if (_refreshRequested) {
                return;
            }
            RequestRefresh?.Invoke(this, EventArgs.Empty);
            _refreshRequested = true;
        }
    }
}
