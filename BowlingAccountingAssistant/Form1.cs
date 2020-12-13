using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Windows.Forms;
using LeagueManager;
using LeagueManager.DataControl;
using LeagueManager.Interfaces;

namespace BowlingAccountingAssistant {
    public partial class Form1 : Form {
        private ILeagueManager _leagueManager;
        private LeagueInfoForm _leagueForm;
        private List<TabPage> _tabPages;
        private bool _refreshOnTabChange = false;
        private Timer _saveTimer;
        private int _timerInterval = 300000;//5 min
        private Version _version;

        public Form1() {
            _version = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version;
            new DataMigration().Execute(_version);
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

            DateTime buildDate = new DateTime(2000, 1, 1)
                                    .AddDays(_version.Build).AddSeconds(_version.Revision * 2);
            string displayableVersion = $"{_version} ({buildDate.ToString("MM/dd/yyyy")})";

            version_label.Text = $"Version {displayableVersion}";
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
            newViewAllTeams.RequestRefresh += NewViewAllTeams_RequestRefresh;
            newViewAllTeams.Size = ExampleTab.Size;

            var newTab = new TabPage();
            newTab.Location = ExampleTab.Location;
            newTab.Name = text;
            newTab.Text = text;
            newTab.Padding = ExampleTab.Padding;
            newTab.Size = ExampleTab.Size;
            newTab.UseVisualStyleBackColor = true;
            newTab.AutoScroll = true;
            newTab.BorderStyle = BorderStyle.Fixed3D;
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
                UpdateLastSave();
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
                var path = GetSaveFilePath("Export To Excel", "Excel Files (*.xlsx)|*.xlsx");
                if(path == null) {
                    return;
                }

                excelExporter.Export(league.Id, path);

                Process.Start(Directory.GetParent(path).FullName);
            } catch {
                MessageBox.Show("An Error Occurred While Exporting.");
            }
        }

        private string GetSaveFilePath(string title, string filter) {
            var saveFileDialog = new SaveFileDialog();
            saveFileDialog.InitialDirectory = @"C:\";
            saveFileDialog.Title = title;
            saveFileDialog.CheckFileExists = false;
            saveFileDialog.Filter = filter;
            saveFileDialog.SupportMultiDottedExtensions = false;
            
            if (saveFileDialog.ShowDialog() == DialogResult.OK) {
                return saveFileDialog.FileName;
            }

            return null;
        }

        private string GetLoadFilePath(string title, string filter) {
            var loadFileDialog = new OpenFileDialog();
            loadFileDialog.InitialDirectory = @"C:\";
            loadFileDialog.Title = title;
            loadFileDialog.CheckFileExists = false;
            loadFileDialog.Filter = filter;
            loadFileDialog.SupportMultiDottedExtensions = false;

            if (loadFileDialog.ShowDialog() == DialogResult.OK) {
                return loadFileDialog.FileName;
            }

            return null;
        }

        private void DownLoadInstallerToolStripMenuItem_Click(object sender, EventArgs e) {
            Process.Start("https://drive.google.com/file/d/1tjbKhGSRluXk6oF9qKBEbckW6Ac1kjFi/view?usp=sharing");
            Process.Start("https://docs.google.com/document/d/1dLQssLsoRAdScB5nkyStJpeurp6D4aeL1caWJ4hQpYM/edit?usp=sharing");
        }

        private void SaveBackupToolStripMenuItem_Click(object sender, EventArgs e) {
            try {
                var path = GetSaveFilePath("Create Backup", "Backup File (*.sav)|*.sav");
                if (path == null) {
                    return;
                }

                _leagueManager.Save(path);
            } catch {
                MessageBox.Show("An Error occured while saving.\n Data may be lost if program is not restarted.");
            }
        }

        private void RestoreFromBackupToolStripMenuItem_Click(object sender, EventArgs e) {
            var message = $"Restoring from backup will replace the current save. {Environment.NewLine}" +
                "Do you wish to continue?.";
            try {
                if (MessageBox.Show(message, "Restore Backup", MessageBoxButtons.OKCancel) == DialogResult.OK) {
                    var path = GetLoadFilePath("Load Backup", "Backup File (*.sav)|*.sav");
                    if (path == null) {
                        return;
                    }
                    var errorMessage = _leagueManager.LoadBackup(path);

                    if (!string.IsNullOrWhiteSpace(errorMessage)) {
                        MessageBox.Show(errorMessage, "Error while loading.");
                    }

                    new DataMigration().Execute(_version);
                }
            } catch {
                MessageBox.Show("An Error occured while saving.\n Data may be lost if program is not restarted.");
            }
        }

        private void UpdateLastSave() {
            lastSave_label.Text = $"LastSave: {DateTime.Now.ToString("G", CultureInfo.CreateSpecificCulture("en-us"))}";
        }
    }
}
