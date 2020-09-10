namespace LeagueManager {
    internal class AutoNum {
        private int _playerId;
        private int _teamId;
        private int _leagueId;

        public int PlayerId {
            get { return _playerId++; }
            set { _playerId = value; }
        }

        public int TeamId {
            get { return _teamId++; }
            set { _teamId = value; }
        }

        public int LeageId {
            get { return _leagueId++; }
            set { _leagueId = value; }
        }
    }
}
