namespace BowlingAccountingAssistant {
    partial class Weekly_PlayerInfo {
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
            this.difference_textBox = new System.Windows.Forms.TextBox();
            this.oweToDate_textBox = new System.Windows.Forms.TextBox();
            this.paid_textBox = new System.Windows.Forms.TextBox();
            this.name_textBox = new System.Windows.Forms.TextBox();
            this.paidToDate_textBox = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // difference_textBox
            // 
            this.difference_textBox.Enabled = false;
            this.difference_textBox.Location = new System.Drawing.Point(446, 3);
            this.difference_textBox.Name = "difference_textBox";
            this.difference_textBox.Size = new System.Drawing.Size(92, 22);
            this.difference_textBox.TabIndex = 7;
            // 
            // oweToDate_textBox
            // 
            this.oweToDate_textBox.Enabled = false;
            this.oweToDate_textBox.Location = new System.Drawing.Point(348, 3);
            this.oweToDate_textBox.Name = "oweToDate_textBox";
            this.oweToDate_textBox.Size = new System.Drawing.Size(92, 22);
            this.oweToDate_textBox.TabIndex = 6;
            // 
            // paid_textBox
            // 
            this.paid_textBox.Location = new System.Drawing.Point(152, 3);
            this.paid_textBox.Name = "paid_textBox";
            this.paid_textBox.Size = new System.Drawing.Size(92, 22);
            this.paid_textBox.TabIndex = 5;
            this.paid_textBox.TextChanged += new System.EventHandler(this.paid_textBox_TextChanged);
            // 
            // name_textBox
            // 
            this.name_textBox.BackColor = System.Drawing.SystemColors.Window;
            this.name_textBox.Enabled = false;
            this.name_textBox.Location = new System.Drawing.Point(3, 3);
            this.name_textBox.Name = "name_textBox";
            this.name_textBox.Size = new System.Drawing.Size(143, 22);
            this.name_textBox.TabIndex = 4;
            // 
            // paidToDate_textBox
            // 
            this.paidToDate_textBox.Enabled = false;
            this.paidToDate_textBox.Location = new System.Drawing.Point(250, 3);
            this.paidToDate_textBox.Name = "paidToDate_textBox";
            this.paidToDate_textBox.Size = new System.Drawing.Size(92, 22);
            this.paidToDate_textBox.TabIndex = 8;
            // 
            // Weekly_PlayerInfo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.paidToDate_textBox);
            this.Controls.Add(this.difference_textBox);
            this.Controls.Add(this.oweToDate_textBox);
            this.Controls.Add(this.paid_textBox);
            this.Controls.Add(this.name_textBox);
            this.Name = "Weekly_PlayerInfo";
            this.Size = new System.Drawing.Size(547, 30);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox difference_textBox;
        private System.Windows.Forms.TextBox oweToDate_textBox;
        private System.Windows.Forms.TextBox paid_textBox;
        private System.Windows.Forms.TextBox name_textBox;
        private System.Windows.Forms.TextBox paidToDate_textBox;
    }
}
