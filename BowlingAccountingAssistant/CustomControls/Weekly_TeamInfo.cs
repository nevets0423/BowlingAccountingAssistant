using LeagueManager;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class Weekly_TeamInfo : UserControl {
        private TeamInfo _teamInfo;
        private int _week;

        public event EventHandler AmountUpdated;

        public Weekly_TeamInfo() : this(new TeamInfo(), 0) { }

        public Weekly_TeamInfo(TeamInfo teaminfo, int week) {
            InitializeComponent();
            _teamInfo = teaminfo;
            _week = week;
            AddPlayers();
        }

        private void AddPlayers() {
            player_flowLayoutPanel.Controls.Clear();

            foreach(var player in _teamInfo.Players) {
                var playerView = new Weekly_PlayerInfo(player, _week);
                playerView.AmountUpdated += PlayerView_AmountUpdated;
                player_flowLayoutPanel.Controls.Add(playerView);
            }
        }

        private void PlayerView_AmountUpdated(object sender, EventArgs e) {
            OnAmountUpdated();
        }

        private void OnAmountUpdated() {
            AmountUpdated?.Invoke(this, EventArgs.Empty);
        }
    }
}
