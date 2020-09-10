using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class EditPage_PlayerInfo : UserControl {
        private PlayerInfo _playerinfo;
        private IPlayerManager _playerManager;

        public EditPage_PlayerInfo() : this(new PlayerInfo()) { }

        public EditPage_PlayerInfo(PlayerInfo playerInfo) {
            InitializeComponent();
            _playerManager = new PlayerManager();
            _playerinfo = playerInfo;

            Name_textBox.Text = _playerinfo.Name;
        }
        

        public PlayerInfo PlayerInfo{
            get {
                _playerinfo.Name = Name_textBox.Text;
                return _playerinfo;
            }
        }

        public bool MarkedForDeletion{
            get { return Remove_checkBox.Checked; }
        }

        private void Name_textBox_TextChanged(object sender, EventArgs e) {
            _playerinfo.Name = Name_textBox.Text;
            _playerManager.UpdatePlayerInfo(_playerinfo);
        }
    }
}
