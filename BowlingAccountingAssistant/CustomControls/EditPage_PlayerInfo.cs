using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class EditPage_PlayerInfo : UserControl {
        private PlayerInfo _playerinfo;
        private IPlayerManager _playerManager;
        private bool loading;

        public EditPage_PlayerInfo() : this(new PlayerInfo()) { }

        public EditPage_PlayerInfo(PlayerInfo playerInfo) {
            loading = true;
            InitializeComponent();
            _playerManager = new PlayerManager();
            _playerinfo = playerInfo;

            Name_textBox.Text = _playerinfo.Name;
            WeekStarted_numericUpDown.Value = _playerinfo.WeekStarted;
            loading = false;
        }
        

        public PlayerInfo PlayerInfo{
            get {
                _playerinfo.Name = Name_textBox.Text;
                _playerinfo.WeekStarted = (int)WeekStarted_numericUpDown.Value;
                return _playerinfo;
            }
        }

        public bool MarkedForDeletion{
            get { return Remove_checkBox.Checked; }
        }

        private void Name_textBox_TextChanged(object sender, EventArgs e) {
            UpdatePlayerInfo();
        }

        private void WeekStarted_numericUpDown_ValueChanged(object sender, EventArgs e) {
            UpdatePlayerInfo();
        }

        private void UpdatePlayerInfo() {
            if (loading) {
                return;
            }
            _playerinfo.Name = Name_textBox.Text;
            _playerinfo.WeekStarted = (int)WeekStarted_numericUpDown.Value;
            _playerManager.UpdatePlayerInfo(_playerinfo);
        }
    }
}
