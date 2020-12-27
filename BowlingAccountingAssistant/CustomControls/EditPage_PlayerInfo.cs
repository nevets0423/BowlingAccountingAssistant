using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class EditPage_PlayerInfo : UserControl {
        private PlayerInfo _playerinfo;
        private IPlayerManager _playerManager;
        private bool _loading;
        private bool _refreshRequested = false;
        public event EventHandler RequestRefresh;

        public EditPage_PlayerInfo() : this(new PlayerInfo()) { }

        public EditPage_PlayerInfo(PlayerInfo playerInfo) {
            _loading = true;
            InitializeComponent();
            _playerManager = new PlayerManager();
            _playerinfo = playerInfo;

            Name_textBox.Text = _playerinfo.Name;
            WeekStarted_numericUpDown.Value = (_playerinfo.WeekStarted == 0) ? 1 : _playerinfo.WeekStarted;
            var leagueLength = _playerManager.GetLeagueLength(_playerinfo.TeamId);
            EndWeek_numericUpDown.Value = (_playerinfo.WeekEnded == 0) ?  leagueLength : _playerinfo.WeekEnded;
            EndWeek_numericUpDown.Maximum = leagueLength;
            _loading = false;

            if(_playerinfo.WeekStarted == 0) {
                UpdatePlayerInfo();
            }
        }
        public void IsInVeiw() {
            _refreshRequested = false;
        }

        public PlayerInfo PlayerInfo{
            get {
                _playerinfo.Name = Name_textBox.Text;
                _playerinfo.WeekStarted = (int)WeekStarted_numericUpDown.Value;
                _playerinfo.WeekEnded = (int)EndWeek_numericUpDown.Value;
                return _playerinfo;
            }
        }

        public bool MarkedForDeletion{
            get { return Remove_checkBox.Checked; }
        }

        private void Name_textBox_TextChanged(object sender, EventArgs e) {
            UpdatePlayerInfo();
        }

        private void numericUpDown_ValueChanged(object sender, EventArgs e) {
            UpdatePlayerInfo();
        }

        private void UpdatePlayerInfo() {
            if (_loading) {
                return;
            }
            _playerinfo.Name = Name_textBox.Text;
            _playerinfo.WeekStarted = (int)WeekStarted_numericUpDown.Value;
            _playerinfo.WeekEnded = (int)EndWeek_numericUpDown.Value;
            _playerManager.UpdatePlayerInfo(_playerinfo);
           OnRefreshRequested();
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
