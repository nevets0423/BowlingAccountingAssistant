namespace BowlingAccountingAssistant {
    partial class LeagueInfoPage {
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
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.LaneFee_textBox = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.prizeMoney_textBox = new System.Windows.Forms.TextBox();
            this.totalCost_textBox = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.numberOfWeeks_numericUpDown = new System.Windows.Forms.NumericUpDown();
            this.save_button = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.numberOfWeeks_numericUpDown)).BeginInit();
            this.SuspendLayout();
            // 
            // Name_textBox
            // 
            this.Name_textBox.Location = new System.Drawing.Point(6, 31);
            this.Name_textBox.Name = "Name_textBox";
            this.Name_textBox.Size = new System.Drawing.Size(182, 22);
            this.Name_textBox.TabIndex = 0;
            this.Name_textBox.TextChanged += new System.EventHandler(this.Name_textBox_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(3, 11);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(45, 17);
            this.label1.TabIndex = 1;
            this.label1.Text = "Name";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(3, 78);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(68, 17);
            this.label2.TabIndex = 2;
            this.label2.Text = "Lane Fee";
            // 
            // LaneFee_textBox
            // 
            this.LaneFee_textBox.Location = new System.Drawing.Point(6, 98);
            this.LaneFee_textBox.Name = "LaneFee_textBox";
            this.LaneFee_textBox.Size = new System.Drawing.Size(100, 22);
            this.LaneFee_textBox.TabIndex = 3;
            this.LaneFee_textBox.TextChanged += new System.EventHandler(this.LaneFee_textBox_TextChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(3, 146);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(158, 17);
            this.label3.TabIndex = 4;
            this.label3.Text = "Prize Amount Per Week";
            // 
            // prizeMoney_textBox
            // 
            this.prizeMoney_textBox.Location = new System.Drawing.Point(6, 166);
            this.prizeMoney_textBox.Name = "prizeMoney_textBox";
            this.prizeMoney_textBox.Size = new System.Drawing.Size(100, 22);
            this.prizeMoney_textBox.TabIndex = 5;
            this.prizeMoney_textBox.TextChanged += new System.EventHandler(this.prizeMoney_textBox_TextChanged);
            // 
            // totalCost_textBox
            // 
            this.totalCost_textBox.Enabled = false;
            this.totalCost_textBox.Location = new System.Drawing.Point(6, 228);
            this.totalCost_textBox.Name = "totalCost_textBox";
            this.totalCost_textBox.Size = new System.Drawing.Size(100, 22);
            this.totalCost_textBox.TabIndex = 6;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(3, 208);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(102, 17);
            this.label4.TabIndex = 7;
            this.label4.Text = "Cost Per Week";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(4, 264);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(124, 17);
            this.label5.TabIndex = 8;
            this.label5.Text = "Number Of Weeks";
            // 
            // numberOfWeeks_numericUpDown
            // 
            this.numberOfWeeks_numericUpDown.Location = new System.Drawing.Point(7, 294);
            this.numberOfWeeks_numericUpDown.Name = "numberOfWeeks_numericUpDown";
            this.numberOfWeeks_numericUpDown.Size = new System.Drawing.Size(48, 22);
            this.numberOfWeeks_numericUpDown.TabIndex = 9;
            this.numberOfWeeks_numericUpDown.ValueChanged += new System.EventHandler(this.numberOfWeeks_numericUpDown_ValueChanged);
            // 
            // save_button
            // 
            this.save_button.Location = new System.Drawing.Point(53, 322);
            this.save_button.Name = "save_button";
            this.save_button.Size = new System.Drawing.Size(108, 35);
            this.save_button.TabIndex = 10;
            this.save_button.Text = "Save";
            this.save_button.UseVisualStyleBackColor = true;
            // 
            // LeagueInfoPage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.save_button);
            this.Controls.Add(this.numberOfWeeks_numericUpDown);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.totalCost_textBox);
            this.Controls.Add(this.prizeMoney_textBox);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.LaneFee_textBox);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Name_textBox);
            this.Name = "LeagueInfoPage";
            this.Size = new System.Drawing.Size(203, 360);
            ((System.ComponentModel.ISupportInitialize)(this.numberOfWeeks_numericUpDown)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox Name_textBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox LaneFee_textBox;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox prizeMoney_textBox;
        private System.Windows.Forms.TextBox totalCost_textBox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.NumericUpDown numberOfWeeks_numericUpDown;
        private System.Windows.Forms.Button save_button;
    }
}
