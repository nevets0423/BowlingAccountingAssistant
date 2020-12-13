namespace BowlingAccountingAssistant {
    partial class EditPage_PlayerInfo {
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
            this.Name_textBox = new System.Windows.Forms.TextBox();
            this.Remove_checkBox = new System.Windows.Forms.CheckBox();
            this.WeekStarted_numericUpDown = new System.Windows.Forms.NumericUpDown();
            this.EndWeek_numericUpDown = new System.Windows.Forms.NumericUpDown();
            ((System.ComponentModel.ISupportInitialize)(this.WeekStarted_numericUpDown)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.EndWeek_numericUpDown)).BeginInit();
            this.SuspendLayout();
            // 
            // Name_textBox
            // 
            this.Name_textBox.Location = new System.Drawing.Point(2, 2);
            this.Name_textBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name_textBox.Name = "Name_textBox";
            this.Name_textBox.Size = new System.Drawing.Size(153, 20);
            this.Name_textBox.TabIndex = 0;
            this.Name_textBox.TextChanged += new System.EventHandler(this.Name_textBox_TextChanged);
            // 
            // Remove_checkBox
            // 
            this.Remove_checkBox.AutoSize = true;
            this.Remove_checkBox.Location = new System.Drawing.Point(250, 5);
            this.Remove_checkBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Remove_checkBox.Name = "Remove_checkBox";
            this.Remove_checkBox.Size = new System.Drawing.Size(15, 14);
            this.Remove_checkBox.TabIndex = 1;
            this.Remove_checkBox.UseVisualStyleBackColor = true;
            // 
            // WeekStarted_numericUpDown
            // 
            this.WeekStarted_numericUpDown.Location = new System.Drawing.Point(174, 3);
            this.WeekStarted_numericUpDown.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.WeekStarted_numericUpDown.Name = "WeekStarted_numericUpDown";
            this.WeekStarted_numericUpDown.Size = new System.Drawing.Size(33, 20);
            this.WeekStarted_numericUpDown.TabIndex = 2;
            this.WeekStarted_numericUpDown.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.WeekStarted_numericUpDown.ValueChanged += new System.EventHandler(this.numericUpDown_ValueChanged);
            // 
            // EndWeek_numericUpDown
            // 
            this.EndWeek_numericUpDown.Location = new System.Drawing.Point(212, 2);
            this.EndWeek_numericUpDown.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.EndWeek_numericUpDown.Name = "EndWeek_numericUpDown";
            this.EndWeek_numericUpDown.Size = new System.Drawing.Size(33, 20);
            this.EndWeek_numericUpDown.TabIndex = 3;
            this.EndWeek_numericUpDown.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.EndWeek_numericUpDown.ValueChanged += new System.EventHandler(this.numericUpDown_ValueChanged);
            // 
            // EditPage_PlayerInfo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.EndWeek_numericUpDown);
            this.Controls.Add(this.WeekStarted_numericUpDown);
            this.Controls.Add(this.Remove_checkBox);
            this.Controls.Add(this.Name_textBox);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "EditPage_PlayerInfo";
            this.Size = new System.Drawing.Size(266, 24);
            ((System.ComponentModel.ISupportInitialize)(this.WeekStarted_numericUpDown)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.EndWeek_numericUpDown)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox Name_textBox;
        private System.Windows.Forms.CheckBox Remove_checkBox;
        private System.Windows.Forms.NumericUpDown WeekStarted_numericUpDown;
        private System.Windows.Forms.NumericUpDown EndWeek_numericUpDown;
    }
}
