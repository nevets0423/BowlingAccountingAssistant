import { AutoNum } from "../AutoNum";

describe('AutoNum', () => {
    let autoNum: AutoNum;

    beforeEach(() => {
        autoNum = new AutoNum();
    });

    it('should increment team every time its called.', () => {
        expect(autoNum.TeamID).toBe(0);
        expect(autoNum.TeamID).toBe(1);
        expect(autoNum.TeamID).toBe(2);
    });

    it('should increment player every time its called.', () => {
        expect(autoNum.PlayerID).toBe(0);
        expect(autoNum.PlayerID).toBe(1);
        expect(autoNum.PlayerID).toBe(2);
    });

    it('should increment league every time its called.', () => {
        expect(autoNum.LeagueID).toBe(0);
        expect(autoNum.LeagueID).toBe(1);
        expect(autoNum.LeagueID).toBe(2);
    });
});