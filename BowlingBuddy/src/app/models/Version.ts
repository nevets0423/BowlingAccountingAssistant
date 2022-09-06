import packageJson from '../../../package.json';
import { IVersion } from './interfaces/IVersion';

export class Version {
    private _major: number = -1;
    private _minor: number = -1;
    private _revision: number = -1;

    constructor(version: IVersion){
        this._major = version.Major;
        this._minor = version.Minor;
        this._revision = version.Revision;
    }

    public static GetCurrentVersion(): string {
        return packageJson.version;
    }

    public get Major() {
        return this._major;
    }

    public get Minor() {
        return this._minor;
    }

    public get Revision() {
        return this._revision;
    }

    public get Full(){
        return this._major + "." + this._minor + "." + this._revision;
    }

    public set Full(value: string){
        if (value == null || value.length == 0){
            throw new Error("Version can not be empty.");
        }

        let parts = value.split('.');
        if(parts.length != 3){
            throw new Error(`Failed to parse ${value} to version.`);
        }

        this._major = Number.parseInt(parts[0]);
        this._minor = Number.parseInt(parts[1]);
        this._revision = Number.parseInt(parts[2]);

        if(isNaN(this._major) || isNaN(this._minor) || isNaN(this._revision)){
            this._major = 0;
            this._minor = 0;
            this._revision = 0;
            throw new Error(`Failed to parse ${value} to version.`);
        }
    }

    public Compare(otherVersion: Version) : number {
        if(this._major > otherVersion._major){
            return 1;
        }

        if(this._major < otherVersion._major){
            return -1;
        }

        if(this._minor > otherVersion._minor){
            return 1;
        }

        if(this._minor < otherVersion._minor){
            return -1;
        }

        if(this._revision > otherVersion._revision){
            return 1;
        }

        if(this._revision < otherVersion._revision){
            return -1;
        }

        return 0;
    }

    toInterface(): IVersion{
        return {
            Major: this._major,
            Minor: this._minor,
            Revision: this._revision
        } as IVersion;
    }
}