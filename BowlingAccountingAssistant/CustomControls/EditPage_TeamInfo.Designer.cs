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
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // player_flowLayoutPanel
            // 
            this.player_flowLayoutPanel.AutoScroll = true;
            this.player_flowLayoutPanel.Location = new System.Drawing.Point(2, 26);
            this.player_flowLayoutPanel.Margin = new System.Windows.Forms.Padding(2);
            this.player_flowLayoutPanel.Name = "player_flowLayoutPanel";
            this.player_flowLayoutPanel.Size = new System.Drawing.Size(229, 112);
            this.player_flowLayoutPanel.TabIndex = 0;
            // 
            // Add_button
            // 
            this.Add_button.Location = new System.Drawing.Point(2, 2);
            this.Add_button.Margin = new System.Windows.Forms.Padding(2);
            this.Add_button.Name = "Add_button";
            this.Add_button.Size = new System.Drawing.Size(66, 19);
            this.Add_button.TabIndex = 1;
            this.Add_button.Text = "Add Player";
            this.Add_button.UseVisualStyleBackColor = true;
            this.Add_button.Click += new System.EventHandler(this.Add_button_Click);
            // 
            // Remove_button
            // 
            this.Remove_button.Location = new System.Drawing.Point(73, 2);
            this.Remove_button.Margin = new System.Windows.Forms.Padding(2);
            this.Remove_button.Name = "Remove_button";
            this.Remove_button.Size = new System.Drawing.Size(94, 19);
            this.Remove_button.TabIndex = 2;
            this.Remove_button.Text = "Remove Player";
            this.Remove_button.UseVisualStyleBackColor = true;
            this.Remove_button.Click += new System.EventHandler(this.Remove_button_Click);
            // 
            // delete_checkBox
            // 
            this.delete_checkBox.AutoSize = true;
            this.delete_checkBox.Location = new System.Drawing.Point(216, 5);
            this.delete_checkBox.Margin = new System.Windows.Forms.Padding(2);
            this.delete_checkBox.Name = "delete_checkBox";
            this.delete_checkBox.Size = new System.Drawing.Size(15, 14);
            this.delete_checkBox.TabIndex = 3;
            this.delete_checkBox.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(182, 5);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(29, 13);
            this.label1.TabIndex = 4;
            this.label1.Text = "Start";
            // 
            // EditPage_TeamInfo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.Controls.Add(this.label1);
            this.Controls.Add(this.delete_checkBox);
            this.Controls.Add(this.Remove_button);
            this.Controls.Add(this.Add_button);
            this.Controls.Add(this.player_flowLayoutPanel);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "EditPage_TeamInfo";
            this.Size = new System.Drawing.Size(233, 142);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.FlowLayoutPanel player_flowLayoutPanel;
        private System.Windows.Forms.Button Add_button;
        private System.Windows.Forms.Button Remove_button;
        private System.Windows.Forms.CheckBox delete_checkBox;
        private System.Windows.Forms.Label label1;
    }
}
