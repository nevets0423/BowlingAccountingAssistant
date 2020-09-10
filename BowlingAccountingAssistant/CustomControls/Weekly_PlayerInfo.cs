using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class Weekly_PlayerInfo : UserControl {
        private PlayerInfo _playerInfo;
        private IPlayerManager _playerManager;
        private int _week;
        private bool _updatingPaidAmount = false;

        public event EventHandler AmountUpdated;

        public Weekly_PlayerInfo() : this(new PlayerInfo(), 0) { }

        public Weekly_PlayerInfo(PlayerInfo playerInfo, int week) {
            InitializeComponent();
            _playerManager = new PlayerManager();

            _playerInfo = playerInfo;
            _week = week;

            name_textBox.Text = _playerInfo.Name;
            UpdateAmounts();
        }

        private void UpdateAmounts() {
            _updatingPaidAmount = true;
            if (!paid_textBox.Focused) {
                paid_textBox.Text = (_playerInfo.AmountPaidEachWeek.Count > _week) ? _playerInfo.AmountPaidEachWeek[_week].ToString() : string.Empty;
            }
            paidToDate_textBox.Text = _playerManager.AmountPaidToDate(_playerInfo.Id, _playerInfo.TeamId, _week).ToString();
            oweToDate_textBox.Text = _playerManager.GetTotalCostToDate(_playerInfo.TeamId, _week).ToString();
            var difference = _playerManager.AmountStillOwedToDate(_playerInfo.Id, _playerInfo.TeamId, _week);
            difference_textBox.Text = difference.ToString();

            if(difference < 0) {
                name_textBox.BackColor = Color.LightSalmon;
            } else {
                name_textBox.BackColor = paidToDate_textBox.BackColor;
            }

            _updatingPaidAmount = false;
        }

        private void paid_textBox_TextChanged(object sender, System.EventArgs e) {
            if (_updatingPaidAmount) {
                return;
            }
            var amountPaid = 0m;

            if (!string.IsNullOrWhiteSpace(paid_textBox.Text)) {
                if (!decimal.TryParse(paid_textBox.Text, out amountPaid)) {
                    MessageBox.Show("Amount paid must be a valid number.");
                    return;
                }
            }

            _playerInfo = _playerManager.UpdatePlayerAmountPaid(_playerInfo, _week, amountPaid);

            UpdateAmounts();

            OnAmountUpdated();
        }

        private void OnAmountUpdated() {
            AmountUpdated?.Invoke(this, EventArgs.Empty);
        }
    }
}
