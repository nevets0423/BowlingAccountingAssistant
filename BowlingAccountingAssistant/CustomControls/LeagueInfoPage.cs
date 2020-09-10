using LeagueManager;
using System;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class LeagueInfoPage : UserControl {
        private LeagueInfo _leagueInfo;
        private bool _laneFeeValid = false;
        private bool _prizeMoneyValid = false;
        private bool _pageLoaded = false;

        public LeagueInfoPage(LeagueInfo leagueInfo = null) {
            InitializeComponent();

            if(leagueInfo == null) {
                _leagueInfo = new LeagueInfo();
            } else {
                _leagueInfo = leagueInfo;
                Name_textBox.Text = _leagueInfo.Name;
                prizeMoney_textBox.Text = _leagueInfo.PrizeAmountPerWeek.ToString();
                numberOfWeeks_numericUpDown.Value = _leagueInfo.NumberOfWeeks;
                LaneFee_textBox.Text = _leagueInfo.LaneFee.ToString();
            }

            _pageLoaded = true;
        }

        public LeagueInfo GetLeagueInfo() {
            _leagueInfo.Name = Name_textBox.Text;
            _leagueInfo.LaneFee = decimal.Parse(LaneFee_textBox.Text);
            _leagueInfo.NumberOfWeeks = numberOfWeeks_numericUpDown.Value;
            _leagueInfo.PrizeAmountPerWeek = decimal.Parse(prizeMoney_textBox.Text);

            return _leagueInfo;
        }

        public event EventHandler Save_Clicked {
            add { save_button.Click += value; }
            remove { save_button.Click -= value; }
        }

        private void LaneFee_textBox_TextChanged(object sender, EventArgs e) {
            if(_pageLoaded && !decimal.TryParse(LaneFee_textBox.Text, out _)) {
                if (!string.IsNullOrWhiteSpace(LaneFee_textBox.Text)) {
                    MessageBox.Show("The Lane Fee must be a number.");
                }
                _laneFeeValid = false;
            } else {
                _laneFeeValid = true;
            }

            EnableSave();
            CalculateCostPerWeek();
        }

        private void prizeMoney_textBox_TextChanged(object sender, EventArgs e) {
            if (_pageLoaded && !decimal.TryParse(prizeMoney_textBox.Text, out _)) {
                if (!string.IsNullOrWhiteSpace(prizeMoney_textBox.Text)) {
                    MessageBox.Show("The Prize Money must be a number.");
                }
                _prizeMoneyValid = false;
            } else {
                _prizeMoneyValid = true;
            }

            EnableSave();
            CalculateCostPerWeek();
        }

        private void EnableSave() {
            save_button.Enabled = _prizeMoneyValid && _laneFeeValid && !string.IsNullOrWhiteSpace(Name_textBox.Text) && numberOfWeeks_numericUpDown.Value > 0;
        }

        private void CalculateCostPerWeek() {
            if (_prizeMoneyValid && _laneFeeValid) {
                var prizeMoney = 0m;
                var laneFee = 0m;

                decimal.TryParse(prizeMoney_textBox.Text, out prizeMoney);
                decimal.TryParse(LaneFee_textBox.Text, out laneFee);

                totalCost_textBox.Text = (prizeMoney + laneFee).ToString();
            }
        }

        private void Name_textBox_TextChanged(object sender, EventArgs e) {
            EnableSave();
        }

        private void numberOfWeeks_numericUpDown_ValueChanged(object sender, EventArgs e) {
            EnableSave();
        }
    }
}
