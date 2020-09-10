using LeagueManager;
using LeagueManager.Interfaces;
using System.Collections.Generic;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class EditPage_TeamInfo : UserControl {
        private TeamInfo _teamInfo;
        private List<EditPage_PlayerInfo> _players;
        private IPlayerManager _playerManager;

        public EditPage_TeamInfo() : this(new TeamInfo()) { }

        public EditPage_TeamInfo(TeamInfo teamInfo) {
            InitializeComponent();
            _players = new List<EditPage_PlayerInfo>();
            _playerManager = new PlayerManager();

            _teamInfo = teamInfo;
            UpdatePlayers();
        }

        private void UpdatePlayers() {
            ClearPlayers();
            _teamInfo.Players = _playerManager.GetPlayers(_teamInfo.Id);

            foreach(var player in _teamInfo.Players) {
                CreatePlayerEditPage(player);
            }
        }

        public bool MarkedForDelete{
            get { return delete_checkBox.Checked; }
        }

        public TeamInfo TeamInfo {
            get { return _teamInfo; }
        }

        private void Add_button_Click(object sender, System.EventArgs e) {
            _playerManager.AddNewPlayer(_teamInfo.Id);

            UpdatePlayers();
        }

        private void CreatePlayerEditPage(PlayerInfo playerinfo) {
            var playerEditPage = new EditPage_PlayerInfo(playerinfo);
            _players.Add(playerEditPage);
            player_flowLayoutPanel.Controls.Add(playerEditPage);
        }

        private void ClearPlayers() {
            _players.ForEach(p => player_flowLayoutPanel.Controls.Remove(p));
            _players.Clear();
        }

        private void Remove_button_Click(object sender, System.EventArgs e) {
            foreach(var player in _players) {
                if (player.MarkedForDeletion) {
                    _playerManager.RemovePlayer(player.PlayerInfo);
                }
            }

            UpdatePlayers();
        }
    }
}
