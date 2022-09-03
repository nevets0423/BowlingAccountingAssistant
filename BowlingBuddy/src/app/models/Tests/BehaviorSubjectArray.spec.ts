import { skip, take } from "rxjs";
import { BehaviorSubjectArray } from "../BehaviorSubjectArray";

describe('BehavoidSubjectArray', () => {
    let behaviorSubjectArray: BehaviorSubjectArray<number>;

    beforeEach(() => {
        behaviorSubjectArray = new BehaviorSubjectArray<number>([1,2,3,4,5,6,7]);
    });

    it('should return array when calling value', () => {
        let array = behaviorSubjectArray.value;

        expect(array.length).toBe(7);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });

    it('should return array length when calling length', () => {
        expect(behaviorSubjectArray.length).toBe(7);
    });

    it('should return observable of array', () => {
        behaviorSubjectArray.asObservable().subscribe(array => {
            expect(array.length).toBe(7);
            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
            expect(array[2]).toBe(3);
        });
    });

    it('should update observable when using next', () => {
        behaviorSubjectArray.asObservable().pipe(take(1)).subscribe(array => {
            expect(array.length).toBe(7);
        });

        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array.length).toBe(8);
        });

        behaviorSubjectArray.next([1,2,3,4,5,6,7,8]);
    });

    it('should return correct index', () => {
        expect(behaviorSubjectArray.indexOf((value: number) => {
            return value == 3;
        })).toBe(2);
    });

    it('should return correct value for index', () => {
        expect(behaviorSubjectArray.get(5)).toBe(6);
    });

    it('should update array at index', () => {
        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array[5]).toBe(22);
        });

        behaviorSubjectArray.replace(22, (value: number) => {
            return value == 6;
        });
    });

    it('should push new value to array', () => {
        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array.length).toBe(8);
            expect(array[array.length - 1]).toBe(22);
        });

        behaviorSubjectArray.push(22);
    });

    it('should pop value from array', () => {
        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array.length).toBe(6);
        });

        expect(behaviorSubjectArray.pop()).toBe(7);
    });

    it('should pop value from specific index', () => {
        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array.length).toBe(6);
        });

        expect(behaviorSubjectArray.popAt(0)).toBe(1);
    });

    it('should remove matching item', () => {
        behaviorSubjectArray.asObservable().pipe(skip(1), take(1)).subscribe(array => {
            expect(array.length).toBe(6);
            expect(array[2]).toBe(4);
        });

        behaviorSubjectArray.remove((value: number) => {
            return value == 3;
        });
    });
})