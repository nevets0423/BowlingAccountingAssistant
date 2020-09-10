namespace BowlingAccountingAssistant {
    partial class Weekly_ViewAllTeams {
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            this.team_flowLayoutPanel = new System.Windows.Forms.FlowLayoutPanel();
            this.paidToDate_textBox = new System.Windows.Forms.TextBox();
            this.paidToLanes_textBox = new System.Windows.Forms.TextBox();
            this.prizeMoney_textBox = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.prizeMoney_label = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.owedToLanes_textBox = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // team_flowLayoutPanel
            // 
            this.team_flowLayoutPanel.AutoScroll = true;
            this.team_flowLayoutPanel.Location = new System.Drawing.Point(3, 56);
            this.team_flowLayoutPanel.Name = "team_flowLayoutPanel";
            this.team_flowLayoutPanel.Size = new System.Drawing.Size(1807, 634);
            this.team_flowLayoutPanel.TabIndex = 0;
            // 
            // paidToDate_textBox
            // 
            this.paidToDate_textBox.Enabled = false;
            this.paidToDate_textBox.Location = new System.Drawing.Point(341, 28);
            this.paidToDate_textBox.Name = "paidToDate_textBox";
            this.paidToDate_textBox.Size = new System.Drawing.Size(100, 22);
            this.paidToDate_textBox.TabIndex = 2;
            // 
            // paidToLanes_textBox
            // 
            this.paidToLanes_textBox.Enabled = false;
            this.paidToLanes_textBox.Location = new System.Drawing.Point(447, 28);
            this.paidToLanes_textBox.Name = "paidToLanes_textBox";
            this.paidToLanes_textBox.Size = new System.Drawing.Size(100, 22);
            this.paidToLanes_textBox.TabIndex = 3;
            // 
            // prizeMoney_textBox
            // 
            this.prizeMoney_textBox.Enabled = false;
            this.prizeMoney_textBox.Location = new System.Drawing.Point(659, 28);
            this.prizeMoney_textBox.Name = "prizeMoney_textBox";
            this.prizeMoney_textBox.Size = new System.Drawing.Size(100, 22);
            this.prizeMoney_textBox.TabIndex = 4;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(338, 8);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(91, 17);
            this.label1.TabIndex = 5;
            this.label1.Text = "Paid To Date";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(444, 6);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(100, 17);
            this.label2.TabIndex = 6;
            this.label2.Text = "Paid To Lanes";
            // 
            // prizeMoney_label
            // 
            this.prizeMoney_label.AutoSize = true;
            this.prizeMoney_label.Location = new System.Drawing.Point(659, 8);
            this.prizeMoney_label.Name = "prizeMoney_label";
            this.prizeMoney_label.Size = new System.Drawing.Size(86, 17);
            this.prizeMoney_label.TabIndex = 7;
            this.prizeMoney_label.Text = "Prize Money";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(550, 8);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(108, 17);
            this.label3.TabIndex = 9;
            this.label3.Text = "Owed To Lanes";
            // 
            // owedToLanes_textBox
            // 
            this.owedToLanes_textBox.Enabled = false;
            this.owedToLanes_textBox.Location = new System.Drawing.Point(553, 28);
            this.owedToLanes_textBox.Name = "owedToLanes_textBox";
            this.owedToLanes_textBox.Size = new System.Drawing.Size(100, 22);
            this.owedToLanes_textBox.TabIndex = 8;
            // 
            // Weekly_ViewAllTeams
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.label3);
            this.Controls.Add(this.owedToLanes_textBox);
            this.Controls.Add(this.prizeMoney_label);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.prizeMoney_textBox);
            this.Controls.Add(this.paidToLanes_textBox);
            this.Controls.Add(this.paidToDate_textBox);
            this.Controls.Add(this.team_flowLayoutPanel);
            this.Name = "Weekly_ViewAllTeams";
            this.Size = new System.Drawing.Size(1840, 690);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.FlowLayoutPanel team_flowLayoutPanel;
        private System.Windows.Forms.TextBox paidToDate_textBox;
        private System.Windows.Forms.TextBox paidToLanes_textBox;
        private System.Windows.Forms.TextBox prizeMoney_textBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label prizeMoney_label;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox owedToLanes_textBox;
    }
}
