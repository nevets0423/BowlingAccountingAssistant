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
            this.SuspendLayout();
            // 
            // Name_textBox
            // 
            this.Name_textBox.Location = new System.Drawing.Point(3, 3);
            this.Name_textBox.Name = "Name_textBox";
            this.Name_textBox.Size = new System.Drawing.Size(173, 22);
            this.Name_textBox.TabIndex = 0;
            this.Name_textBox.TextChanged += new System.EventHandler(this.Name_textBox_TextChanged);
            // 
            // Remove_checkBox
            // 
            this.Remove_checkBox.AutoSize = true;
            this.Remove_checkBox.Location = new System.Drawing.Point(204, 5);
            this.Remove_checkBox.Name = "Remove_checkBox";
            this.Remove_checkBox.Size = new System.Drawing.Size(18, 17);
            this.Remove_checkBox.TabIndex = 1;
            this.Remove_checkBox.UseVisualStyleBackColor = true;
            // 
            // EditPage_PlayerInfo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.Remove_checkBox);
            this.Controls.Add(this.Name_textBox);
            this.Name = "EditPage_PlayerInfo";
            this.Size = new System.Drawing.Size(225, 29);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox Name_textBox;
        private System.Windows.Forms.CheckBox Remove_checkBox;
    }
}
