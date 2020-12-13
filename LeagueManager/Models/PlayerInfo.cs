using System;
using System.Collections.Generic;

namespace LeagueManager {
    public class PlayerInfo : ICloneable {
        public int Id;
        public int TeamId;
        public string Name;
        public decimal PaidToDate;
        public int WeekStarted;
        public int WeekEnded;
        public List<decimal> AmountPaidEachWeek;
        public bool ActiveForWeek(int week) { 
            return (WeekStarted - 1 <= week) && (WeekEnded > week);
        }

        public object Clone() {
            return new PlayerInfo()
            {
                Id = this.Id,
                TeamId = this.TeamId,
                Name = (string)this.Name.Clone(),
                PaidToDate = this.PaidToDate,
                WeekStarted = this.WeekStarted,
                WeekEnded = this.WeekEnded,
                AmountPaidEachWeek = (List<decimal>)this.AmountPaidEachWeek.Copy()
            };
        }
    }
}
