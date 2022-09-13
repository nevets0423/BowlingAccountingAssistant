import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class GridComponentDebounceTime{
    private static _seconds: number = 10;

    get Seconds(): number{
        return GridComponentDebounceTime._seconds;
    }

    get MilliSeconds(): number{
        return GridComponentDebounceTime._seconds * 1000;
    }
}