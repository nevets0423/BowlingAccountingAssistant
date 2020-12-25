using LeagueManager;
using LeagueManager.Interfaces;
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace BowlingAccountingAssistant {
    public partial class EditPage_EditeAllTeams : UserControl {
        private ITeamManager _teamManager;
        private LeagueInfo _currentLeague;
        private List<EditPage_TeamInfo> _currentTeams;

        public EditPage_EditeAllTeams() {
            InitializeComponent();
            _teamManager = new TeamManager();
            _currentTeams = new List<EditPage_TeamInfo>();
        }

        private void Add_button_Click(object sender, EventArgs e) {
            var id = _teamManager.CreateNewTeam(_currentLeague.Id);
            AddTeam(_teamManager.GetTeam(id));
        }

        private void delete_button_Click(object sender, EventArgs e) {
            var teamsToDelete = new List<EditPage_TeamInfo>();
            foreach (var team in _currentTeams) {
                if (team.MarkedForDelete) {
                    teamsToDelete.Add(team);
                }
            }
            foreach (var team in teamsToDelete) {
                _teamManager.RemoveTeam(team.TeamInfo);
                Team_flowLayoutPanel.Controls.Remove(team);
                _currentTeams.Remove(team);
            }
        }

        internal void LeagueChanged(object sender, EventArgs e) {
            if(sender.GetType() != typeof(ComboBox)) {
                return;
            }

            var sender_ComboBox = (ComboBox)sender;
            
            if(sender_ComboBox.SelectedItem.GetType() != typeof(LeagueInfo)) {
                return;
            }

            _currentLeague = (LeagueInfo)sender_ComboBox.SelectedItem;
            ShowCurrentTeams();

            Add_button.Enabled = true;
            delete_button.Enabled = true;
        }

        private void ShowCurrentTeams() {
            RemoveTeamsFromControl();
            _currentTeams.Clear();

            var teams = _teamManager.GetAllTeams(_currentLeague.Id);

            foreach(var team in teams) {
                AddTeam(team);
            }
        }

        private void RemoveTeamsFromControl() {
            _currentTeams.ForEach(t => Team_flowLayoutPanel.Controls.Remove(t));
        }

        private void AddTeam(TeamInfo team) {
            var editTeamPage = new EditPage_TeamInfo(team);
            _currentTeams.Add(editTeamPage);
            Team_flowLayoutPanel.Controls.Add(editTeamPage);
        }
    }
}
