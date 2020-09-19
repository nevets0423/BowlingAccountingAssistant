using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;
using LeagueManager;
using LeagueManager.Interfaces;

namespace BowlingAccountingAssistant {
    public partial class Form1 : Form {
        private ILeagueManager _leagueManager;
        private LeagueInfoForm _leagueForm;
        private List<TabPage> _tabPages;
        private bool _refreshOnTabChange = false;
        private Timer _saveTimer;
        private int _timerInterval = 300000;//5 min

        public Form1() {
            InitializeComponent();
            _leagueManager = new LeagueManager.LeagueManager();
            _tabPages = new List<TabPage>();
            League_comboBox.SelectedValueChanged += editPage_EditeAllTeams1.LeagueChanged;
            League_comboBox.SelectedValueChanged += League_comboBox_SelectedValueChanged;
            UpdateLeagueDropDown();

            _saveTimer = new Timer {
                Interval = _timerInterval
            };
            _saveTimer.Tick += SaveData;
            _saveTimer.Enabled = true;
        }
        
        private void League_comboBox_SelectedValueChanged(object sender, EventArgs e) {
            newLeague_label.Hide();
            CreateTabForEachWeek();
        }

        public LeagueInfo GetCurrentLeague() {
            return (LeagueInfo)League_comboBox.SelectedItem;
        }

        private void newLeagueToolStripMenuItem_Click(object sender, EventArgs e) {
            var leagueId = _leagueManager.CreateLeague();
            _leagueForm = new LeagueInfoForm(_leagueManager.GetLeague(leagueId));
            _leagueForm.FormClosing += _leagueForm_FormClosing;
            _leagueForm.Show();
        }

        private void _leagueForm_FormClosing(object sender, FormClosingEventArgs e) {
            _leagueManager.UpdateLeague(_leagueForm.GetLeagueInfo());
            UpdateLeagueDropDown();
        }

        private void UpdateLeagueDropDown() {
            League_comboBox.Items.Clear();
            League_comboBox.Items.AddRange(_leagueManager.GetLeagues().ToArray());

            if (League_comboBox.Items.Count > 0) {
                League_comboBox.SelectedItem = League_comboBox.Items[League_comboBox.Items.Count - 1];
            }
        }

        private void CreateTabForEachWeek() {
            week_tabControl.Hide();

            RemoveCurrentTabs();
            var league = GetCurrentLeague();

            if(league == null) {
                return;
            }

            for(int i = 0; i < league.NumberOfWeeks; i++) {
                var tab = CreateTab($"Week {i+1}", i, league);
                _tabPages.Add(tab);
                week_tabControl.Controls.Add(tab);
            }

            week_tabControl.Show();
        }

        private TabPage CreateTab(string text, int index, LeagueInfo leagueInfo) {
            var newViewAllTeams = new Weekly_ViewAllTeams(leagueInfo, index);
            newViewAllTeams.Location = new System.Drawing.Point(3, 3);
            newViewAllTeams.Name = $"{text}_viewAllTeams";
            newViewAllTeams.Size = new System.Drawing.Size(1624, 647);
            newViewAllTeams.RequestRefresh += NewViewAllTeams_RequestRefresh;

            var newTab = new TabPage();
            newTab.Location = ExampleTab.Location;
            newTab.Name = text;
            newTab.Text = text;
            newTab.Padding = ExampleTab.Padding;
            newTab.Size = ExampleTab.Size;
            newTab.UseVisualStyleBackColor = true;
            newTab.Controls.Add(newViewAllTeams);

            return newTab;
        }

        private void NewViewAllTeams_RequestRefresh(object sender, EventArgs e) {
            _refreshOnTabChange = true;
        }

        private void RemoveCurrentTabs() {
            week_tabControl.Controls.Clear();
            _tabPages.Clear();
        }

        private void tabControl1_Selected(object sender, TabControlEventArgs e) {
            if (tabControl1.SelectedTab.Name == "week_tabPage") {
                CreateTabForEachWeek();
            }
        }

        private void week_tabControl_Selected(object sender, TabControlEventArgs e) {
            if (_refreshOnTabChange) {
                var selectedIndex = week_tabControl.SelectedIndex;
                _refreshOnTabChange = false;
                week_tabControl.Hide();
                CreateTabForEachWeek();
                week_tabControl.SelectedIndex = selectedIndex;
                week_tabControl.Show();
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e) {
            SaveData();
        }

        private void SaveData(object sender, EventArgs e) {
            SaveData();
        }

        private void SaveData() {
            try {
                _leagueManager.Save();
            } catch {
                MessageBox.Show("An Error occured while saving.\n Data may be lost if program is not restarted.");
            }
        }

        private void exportToolStripMenuItem_Click(object sender, EventArgs e) {
            var league = GetCurrentLeague();
            if(league == null) {
                MessageBox.Show("No League selected.");
                return;
            }
            try {
                var excelExporter = new ExcelDocumentExporter();
                var path = GetFilePath();
                if(path == null) {
                    return;
                }

                excelExporter.Export(league.Id, path);

                Process.Start(Directory.GetParent(path).FullName);
            } catch {
                MessageBox.Show("An Error Occurred While Exporting.");
            }
        }

        private string GetFilePath() {
            var saveFileDialog = new SaveFileDialog();
            saveFileDialog.InitialDirectory = @"C:\";
            saveFileDialog.Title = "Export To Excel";
            saveFileDialog.CheckFileExists = false;
            saveFileDialog.Filter = "Excel Files (*.xlsx)|*.xlsx";
            saveFileDialog.SupportMultiDottedExtensions = false;
            
            if (saveFileDialog.ShowDialog() == DialogResult.OK) {
                return saveFileDialog.FileName;
            }

            return null;
        }

        private void DownLoadInstallerToolStripMenuItem_Click(object sender, EventArgs e) {
            Process.Start("https://drive.google.com/file/d/1tjbKhGSRluXk6oF9qKBEbckW6Ac1kjFi/view?usp=sharing");
        }
    }
}
