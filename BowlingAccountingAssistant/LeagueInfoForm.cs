using LeagueManager;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class LeagueInfoForm : Form {
        private LeagueInfoPage _leagueInfoPage;

        public LeagueInfoForm() : this(new LeagueInfo()) { }

        public LeagueInfoForm(LeagueInfo leagueInfo) {
            InitializeComponent();

            _leagueInfoPage = new LeagueInfoPage(leagueInfo);
            _leagueInfoPage.Location = new System.Drawing.Point(12, 12);
            _leagueInfoPage.Name = "leagueInfoPage";
            _leagueInfoPage.Size = new System.Drawing.Size(203, 360);
            _leagueInfoPage.TabIndex = 0;
            this.Controls.Add(_leagueInfoPage);
            _leagueInfoPage.Show();
            _leagueInfoPage.Save_Clicked += _leagueInfoPage_Save_Clicked;
        }

        public LeagueInfo GetLeagueInfo() {
            return _leagueInfoPage.GetLeagueInfo();
        }

        private void _leagueInfoPage_Save_Clicked(object sender, System.EventArgs e) {
            this.Close();
        }
    }
}
