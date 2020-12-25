namespace BowlingAccountingAssistant {
    partial class Form1 {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing) {
            if (disposing && (components != null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.newLeagueToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exportToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.downLoadInstallerToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveBackupToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.restoreFromBackupToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.League_comboBox = new System.Windows.Forms.ComboBox();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.week_tabPage = new System.Windows.Forms.TabPage();
            this.week_tabControl = new System.Windows.Forms.TabControl();
            this.ExampleTab = new System.Windows.Forms.TabPage();
            this.team_tabPage = new System.Windows.Forms.TabPage();
            this.editPage_EditeAllTeams1 = new BowlingAccountingAssistant.EditPage_EditeAllTeams();
            this.newLeague_label = new System.Windows.Forms.Label();
            this.lastSave_label = new System.Windows.Forms.Label();
            this.version_label = new System.Windows.Forms.Label();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.menuStrip1.SuspendLayout();
            this.tabControl1.SuspendLayout();
            this.week_tabPage.SuspendLayout();
            this.week_tabControl.SuspendLayout();
            this.team_tabPage.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Padding = new System.Windows.Forms.Padding(5, 2, 0, 2);
            this.menuStrip1.Size = new System.Drawing.Size(1857, 28);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newLeagueToolStripMenuItem,
            this.saveToolStripMenuItem,
            this.exportToolStripMenuItem,
            this.downLoadInstallerToolStripMenuItem,
            this.saveBackupToolStripMenuItem,
            this.restoreFromBackupToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(46, 24);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // newLeagueToolStripMenuItem
            // 
            this.newLeagueToolStripMenuItem.Name = "newLeagueToolStripMenuItem";
            this.newLeagueToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.newLeagueToolStripMenuItem.Text = "New League";
            this.newLeagueToolStripMenuItem.Click += new System.EventHandler(this.newLeagueToolStripMenuItem_Click);
            // 
            // saveToolStripMenuItem
            // 
            this.saveToolStripMenuItem.Name = "saveToolStripMenuItem";
            this.saveToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.saveToolStripMenuItem.Text = "Save";
            this.saveToolStripMenuItem.Click += new System.EventHandler(this.SaveData);
            // 
            // exportToolStripMenuItem
            // 
            this.exportToolStripMenuItem.Name = "exportToolStripMenuItem";
            this.exportToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.exportToolStripMenuItem.Text = "Export";
            this.exportToolStripMenuItem.Click += new System.EventHandler(this.exportToolStripMenuItem_Click);
            // 
            // downLoadInstallerToolStripMenuItem
            // 
            this.downLoadInstallerToolStripMenuItem.Name = "downLoadInstallerToolStripMenuItem";
            this.downLoadInstallerToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.downLoadInstallerToolStripMenuItem.Text = "DownLoad Installer";
            this.downLoadInstallerToolStripMenuItem.Click += new System.EventHandler(this.DownLoadInstallerToolStripMenuItem_Click);
            // 
            // saveBackupToolStripMenuItem
            // 
            this.saveBackupToolStripMenuItem.Name = "saveBackupToolStripMenuItem";
            this.saveBackupToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.saveBackupToolStripMenuItem.Text = "Save Backup";
            this.saveBackupToolStripMenuItem.Click += new System.EventHandler(this.SaveBackupToolStripMenuItem_Click);
            // 
            // restoreFromBackupToolStripMenuItem
            // 
            this.restoreFromBackupToolStripMenuItem.Name = "restoreFromBackupToolStripMenuItem";
            this.restoreFromBackupToolStripMenuItem.Size = new System.Drawing.Size(232, 26);
            this.restoreFromBackupToolStripMenuItem.Text = "Restore From Backup";
            this.restoreFromBackupToolStripMenuItem.Click += new System.EventHandler(this.RestoreFromBackupToolStripMenuItem_Click);
            // 
            // League_comboBox
            // 
            this.League_comboBox.FormattingEnabled = true;
            this.League_comboBox.Location = new System.Drawing.Point(3, 2);
            this.League_comboBox.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.League_comboBox.Name = "League_comboBox";
            this.League_comboBox.Size = new System.Drawing.Size(257, 24);
            this.League_comboBox.TabIndex = 1;
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.week_tabPage);
            this.tabControl1.Controls.Add(this.team_tabPage);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 0);
            this.tabControl1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(1857, 825);
            this.tabControl1.TabIndex = 2;
            this.tabControl1.Selected += new System.Windows.Forms.TabControlEventHandler(this.tabControl1_Selected);
            // 
            // week_tabPage
            // 
            this.week_tabPage.AutoScroll = true;
            this.week_tabPage.Controls.Add(this.week_tabControl);
            this.week_tabPage.Location = new System.Drawing.Point(4, 25);
            this.week_tabPage.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.week_tabPage.Name = "week_tabPage";
            this.week_tabPage.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.week_tabPage.Size = new System.Drawing.Size(1849, 796);
            this.week_tabPage.TabIndex = 0;
            this.week_tabPage.Text = "Weeks";
            this.week_tabPage.UseVisualStyleBackColor = true;
            // 
            // week_tabControl
            // 
            this.week_tabControl.Controls.Add(this.ExampleTab);
            this.week_tabControl.Dock = System.Windows.Forms.DockStyle.Fill;
            this.week_tabControl.Location = new System.Drawing.Point(3, 2);
            this.week_tabControl.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.week_tabControl.Multiline = true;
            this.week_tabControl.Name = "week_tabControl";
            this.week_tabControl.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.week_tabControl.SelectedIndex = 0;
            this.week_tabControl.Size = new System.Drawing.Size(1843, 792);
            this.week_tabControl.TabIndex = 0;
            this.week_tabControl.Selected += new System.Windows.Forms.TabControlEventHandler(this.week_tabControl_Selected);
            // 
            // ExampleTab
            // 
            this.ExampleTab.Location = new System.Drawing.Point(4, 25);
            this.ExampleTab.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.ExampleTab.Name = "ExampleTab";
            this.ExampleTab.Size = new System.Drawing.Size(1835, 763);
            this.ExampleTab.TabIndex = 0;
            this.ExampleTab.Text = "Week 1";
            this.ExampleTab.UseVisualStyleBackColor = true;
            // 
            // team_tabPage
            // 
            this.team_tabPage.AutoScroll = true;
            this.team_tabPage.Controls.Add(this.editPage_EditeAllTeams1);
            this.team_tabPage.Location = new System.Drawing.Point(4, 25);
            this.team_tabPage.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.team_tabPage.Name = "team_tabPage";
            this.team_tabPage.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.team_tabPage.Size = new System.Drawing.Size(1849, 794);
            this.team_tabPage.TabIndex = 1;
            this.team_tabPage.Text = "Teams";
            this.team_tabPage.UseVisualStyleBackColor = true;
            // 
            // editPage_EditeAllTeams1
            // 
            this.editPage_EditeAllTeams1.AutoScroll = true;
            this.editPage_EditeAllTeams1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.editPage_EditeAllTeams1.Location = new System.Drawing.Point(3, 2);
            this.editPage_EditeAllTeams1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.editPage_EditeAllTeams1.Name = "editPage_EditeAllTeams1";
            this.editPage_EditeAllTeams1.Size = new System.Drawing.Size(1843, 790);
            this.editPage_EditeAllTeams1.TabIndex = 0;
            // 
            // newLeague_label
            // 
            this.newLeague_label.AutoSize = true;
            this.newLeague_label.Location = new System.Drawing.Point(284, 9);
            this.newLeague_label.Name = "newLeague_label";
            this.newLeague_label.Size = new System.Drawing.Size(371, 17);
            this.newLeague_label.TabIndex = 3;
            this.newLeague_label.Text = "Please Create a leauge by clicking File Then New League";
            // 
            // lastSave_label
            // 
            this.lastSave_label.AutoSize = true;
            this.lastSave_label.Font = new System.Drawing.Font("Microsoft Sans Serif", 7.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lastSave_label.Location = new System.Drawing.Point(715, 9);
            this.lastSave_label.Name = "lastSave_label";
            this.lastSave_label.Size = new System.Drawing.Size(111, 17);
            this.lastSave_label.TabIndex = 4;
            this.lastSave_label.Text = "LastSave: N/A";
            // 
            // version_label
            // 
            this.version_label.AutoSize = true;
            this.version_label.Dock = System.Windows.Forms.DockStyle.Right;
            this.version_label.Location = new System.Drawing.Point(1837, 0);
            this.version_label.Name = "version_label";
            this.version_label.Padding = new System.Windows.Forms.Padding(0, 7, 3, 0);
            this.version_label.Size = new System.Drawing.Size(20, 24);
            this.version_label.TabIndex = 5;
            this.version_label.Text = "V";
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = new System.Drawing.Point(0, 28);
            this.splitContainer1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.splitContainer1.Name = "splitContainer1";
            this.splitContainer1.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.version_label);
            this.splitContainer1.Panel1.Controls.Add(this.League_comboBox);
            this.splitContainer1.Panel1.Controls.Add(this.newLeague_label);
            this.splitContainer1.Panel1.Controls.Add(this.lastSave_label);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tabControl1);
            this.splitContainer1.Size = new System.Drawing.Size(1857, 864);
            this.splitContainer1.SplitterDistance = 38;
            this.splitContainer1.SplitterWidth = 1;
            this.splitContainer1.TabIndex = 6;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1857, 892);
            this.Controls.Add(this.splitContainer1);
            this.Controls.Add(this.menuStrip1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.Text = "Bowler Buddy";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.tabControl1.ResumeLayout(false);
            this.week_tabPage.ResumeLayout(false);
            this.week_tabControl.ResumeLayout(false);
            this.team_tabPage.ResumeLayout(false);
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel1.PerformLayout();
            this.splitContainer1.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem newLeagueToolStripMenuItem;
        private System.Windows.Forms.ComboBox League_comboBox;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage week_tabPage;
        private System.Windows.Forms.TabPage team_tabPage;
        private EditPage_EditeAllTeams editPage_EditeAllTeams1;
        private System.Windows.Forms.TabControl week_tabControl;
        private System.Windows.Forms.TabPage ExampleTab;
        private System.Windows.Forms.ToolStripMenuItem saveToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exportToolStripMenuItem;
        private System.Windows.Forms.Label newLeague_label;
        private System.Windows.Forms.ToolStripMenuItem downLoadInstallerToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem saveBackupToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem restoreFromBackupToolStripMenuItem;
        private System.Windows.Forms.Label lastSave_label;
        private System.Windows.Forms.Label version_label;
        private System.Windows.Forms.SplitContainer splitContainer1;
    }
}

