import { IVersion } from "../interfaces/IVersion";
import { Version } from "../Version";

describe('Version', () => {
    let version: Version;

    beforeEach(() => {
        version = new Version({Major: 1, Minor: 1, Revision: 1} as IVersion);
    });

    it('it throws an error Major version is not a number', () => {
        expect(function(){version.Full = "BadVersion.1.1";}).toThrow();
    });

    it('it throws an error when Minor version is not a number', () => {
        expect(function(){version.Full = "1.Bad.1";}).toThrow();
    });

    it('it throws an error when Revision version is not a number', () => {
        expect(function(){version.Full = "1.1.BAD";}).toThrow();
    });

    it('it throws an error when there are not three parts to the version', () => {
        expect(function(){version.Full = "1.1.1.1";}).toThrow();
        expect(function(){version.Full = "1.1";}).toThrow();
    });

    it('does not throw an error when version is formated correctly', () =>{
        expect(function(){version.Full = "1.1.1";}).not.toThrow();
    });

    it('return 0 when versions are equal', () =>{
        version.Full = "1.1.1";

        let versionTwo = new Version({Major: 1, Minor: 1, Revision: 1} as IVersion);

        expect(version.Compare(versionTwo)).toBe(0);
    });

    it('return 1 when major version is larger', () =>{
        version.Full = "2.10.10";

        let versionTwo = new Version({Major: 1, Minor: 10, Revision: 10} as IVersion);

        expect(version.Compare(versionTwo)).toBe(1);
    });

    it('return -1 when major version is smaller', () =>{
        version.Full = "1.10.10";

        let versionTwo = new Version({Major: 3, Minor: 1, Revision: 1} as IVersion);

        expect(version.Compare(versionTwo)).toBe(-1);
    });

    it('return 1 when minor version is larger', () =>{
        version.Full = "1.10.10";

        let versionTwo = new Version({Major: 1, Minor: 1, Revision: 1} as IVersion);

        expect(version.Compare(versionTwo)).toBe(1);
    });

    it('return -1 when minor version is smaller', () =>{
        version.Full = "1.1.10";

        let versionTwo = new Version({Major: 1, Minor: 10, Revision: 10} as IVersion);

        expect(version.Compare(versionTwo)).toBe(-1);
    });

    it('return 1 when revision version is larger', () =>{
        version.Full = "1.1.10";

        let versionTwo = new Version({Major: 1, Minor: 1, Revision: 1} as IVersion);

        expect(version.Compare(versionTwo)).toBe(1);
    });

    it('return -1 when revision version is smaller', () =>{
        version.Full = "1.1.1";

        let versionTwo = new Version({Major: 1, Minor: 1, Revision: 10} as IVersion);

        expect(version.Compare(versionTwo)).toBe(-1);
    });
});