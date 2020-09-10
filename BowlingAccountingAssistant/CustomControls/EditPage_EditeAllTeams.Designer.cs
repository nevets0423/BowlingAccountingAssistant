namespace BowlingAccountingAssistant {
    partial class EditPage_EditeAllTeams {
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
            this.Add_button = new System.Windows.Forms.Button();
            this.delete_button = new System.Windows.Forms.Button();
            this.Team_flowLayoutPanel = new System.Windows.Forms.FlowLayoutPanel();
            this.SuspendLayout();
            // 
            // Add_button
            // 
            this.Add_button.Enabled = false;
            this.Add_button.Location = new System.Drawing.Point(3, 3);
            this.Add_button.Name = "Add_button";
            this.Add_button.Size = new System.Drawing.Size(94, 32);
            this.Add_button.TabIndex = 0;
            this.Add_button.Text = "Add Team";
            this.Add_button.UseVisualStyleBackColor = true;
            this.Add_button.Click += new System.EventHandler(this.Add_button_Click);
            // 
            // delete_button
            // 
            this.delete_button.Enabled = false;
            this.delete_button.Location = new System.Drawing.Point(103, 3);
            this.delete_button.Name = "delete_button";
            this.delete_button.Size = new System.Drawing.Size(115, 32);
            this.delete_button.TabIndex = 1;
            this.delete_button.Text = "Remove Team";
            this.delete_button.UseVisualStyleBackColor = true;
            this.delete_button.Click += new System.EventHandler(this.delete_button_Click);
            // 
            // Team_flowLayoutPanel
            // 
            this.Team_flowLayoutPanel.AutoScroll = true;
            this.Team_flowLayoutPanel.Location = new System.Drawing.Point(7, 41);
            this.Team_flowLayoutPanel.Name = "Team_flowLayoutPanel";
            this.Team_flowLayoutPanel.Size = new System.Drawing.Size(1795, 646);
            this.Team_flowLayoutPanel.TabIndex = 2;
            // 
            // EditPage_EditeAllTeams
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.Team_flowLayoutPanel);
            this.Controls.Add(this.delete_button);
            this.Controls.Add(this.Add_button);
            this.Name = "EditPage_EditeAllTeams";
            this.Size = new System.Drawing.Size(1840, 690);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button Add_button;
        private System.Windows.Forms.Button delete_button;
        private System.Windows.Forms.FlowLayoutPanel Team_flowLayoutPanel;
    }
}
