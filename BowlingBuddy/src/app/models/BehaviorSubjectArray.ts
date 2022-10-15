import { BehaviorSubject, Observable } from "rxjs";

export class BehaviorSubjectArray<T>{
    private _behaviorSubject: BehaviorSubject<T[]>;

    constructor(value: T[]){
        this._behaviorSubject = new BehaviorSubject(value);
    }

    get value() : T[]{
        return this._behaviorSubject.value;
    }

    get length() : number{
        return this._behaviorSubject.value.length;
    }

    asObservable() : Observable<T[]>{
        return this._behaviorSubject.asObservable();
    }

    next(value : T[]) {
        this._behaviorSubject.next(value);
    }

    indexOf(match: (value: T) => boolean) : number{
        let items = this._behaviorSubject.value;
        let index = -1;
        for(let i = 0; i < items.length; i++){
            if(match(items[i])){
                index = i;
                break;
            }
        }
        return index;
    }

    get(index: number): T{
        return this._behaviorSubject.value[index];
    }

    replace(value: T, match: (value: T) => boolean) : boolean {
        let items = this._behaviorSubject.value;
        for(let i = 0; i < items.length; i++){
            if(match(items[i])){
                items[i] = value;
                this._behaviorSubject.next(items);
                return true;
            }
        }
        return false;
    }

    push(value: T): void {
        let items = this._behaviorSubject.value;
        items.push(value);
        this._behaviorSubject.next(items);
    }

    pop(): T | undefined {
        let items = this._behaviorSubject.value;
        let value = items.pop();
        this._behaviorSubject.next(items);
        return value;
    }

    popAt(index: number): T | undefined {
        let items = this._behaviorSubject.value;
        if(items.length < index){
            return undefined;
        }

        let value = items[index];
        items.splice(index, 1);
        this._behaviorSubject.next(items);
        return value;
    }

    clear(): void{
        this._behaviorSubject.next([]);
    }

    remove(match: (value: T) => boolean){
        let items = this._behaviorSubject.value;
        for(let i = 0; i < items.length; i++){
            if(match(items[i])){
                items.splice(i, 1);
                this._behaviorSubject.next(items);
                return;
            }
        }
    }  

    find(match: (value: T) => boolean): T | undefined{
        let items = this._behaviorSubject.value;
        for(let i = 0; i < items.length; i++){
            if(match(items[i])){
                return items[i];
            }
        }

        return undefined;
    }

    error(error: any){
        this._behaviorSubject.error(error);
    }
}