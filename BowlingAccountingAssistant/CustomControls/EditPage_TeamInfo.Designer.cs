namespace BowlingAccountingAssistant {
    partial class EditPage_TeamInfo {
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
            this.player_flowLayoutPanel = new System.Windows.Forms.FlowLayoutPanel();
            this.Add_button = new System.Windows.Forms.Button();
            this.Remove_button = new System.Windows.Forms.Button();
            this.delete_checkBox = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // player_flowLayoutPanel
            // 
            this.player_flowLayoutPanel.AutoScroll = true;
            this.player_flowLayoutPanel.Location = new System.Drawing.Point(3, 32);
            this.player_flowLayoutPanel.Name = "player_flowLayoutPanel";
            this.player_flowLayoutPanel.Size = new System.Drawing.Size(267, 138);
            this.player_flowLayoutPanel.TabIndex = 0;
            // 
            // Add_button
            // 
            this.Add_button.Location = new System.Drawing.Point(3, 3);
            this.Add_button.Name = "Add_button";
            this.Add_button.Size = new System.Drawing.Size(88, 23);
            this.Add_button.TabIndex = 1;
            this.Add_button.Text = "Add Player";
            this.Add_button.UseVisualStyleBackColor = true;
            this.Add_button.Click += new System.EventHandler(this.Add_button_Click);
            // 
            // Remove_button
            // 
            this.Remove_button.Location = new System.Drawing.Point(97, 3);
            this.Remove_button.Name = "Remove_button";
            this.Remove_button.Size = new System.Drawing.Size(125, 23);
            this.Remove_button.TabIndex = 2;
            this.Remove_button.Text = "Remove Player";
            this.Remove_button.UseVisualStyleBackColor = true;
            this.Remove_button.Click += new System.EventHandler(this.Remove_button_Click);
            // 
            // delete_checkBox
            // 
            this.delete_checkBox.AutoSize = true;
            this.delete_checkBox.Location = new System.Drawing.Point(252, 7);
            this.delete_checkBox.Name = "delete_checkBox";
            this.delete_checkBox.Size = new System.Drawing.Size(18, 17);
            this.delete_checkBox.TabIndex = 3;
            this.delete_checkBox.UseVisualStyleBackColor = true;
            // 
            // EditPage_TeamInfo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.Controls.Add(this.delete_checkBox);
            this.Controls.Add(this.Remove_button);
            this.Controls.Add(this.Add_button);
            this.Controls.Add(this.player_flowLayoutPanel);
            this.Name = "EditPage_TeamInfo";
            this.Size = new System.Drawing.Size(271, 175);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.FlowLayoutPanel player_flowLayoutPanel;
        private System.Windows.Forms.Button Add_button;
        private System.Windows.Forms.Button Remove_button;
        private System.Windows.Forms.CheckBox delete_checkBox;
    }
}
