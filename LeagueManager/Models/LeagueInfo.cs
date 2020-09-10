using System;

namespace LeagueManager {
    public class LeagueInfo : ICloneable{
        public int Id;
        public string Name;
        public decimal LaneFee;
        public decimal PrizeAmountPerWeek;
        public decimal NumberOfWeeks;

        public object Clone() {
            return new LeagueInfo() {
                Id = this.Id,
                Name = (string)this.Name.Clone(),
                LaneFee = this.LaneFee,
                PrizeAmountPerWeek = this.PrizeAmountPerWeek,
                NumberOfWeeks = this.NumberOfWeeks
            };
        }

        public override string ToString() {
            return Name;
        }
    }
}
