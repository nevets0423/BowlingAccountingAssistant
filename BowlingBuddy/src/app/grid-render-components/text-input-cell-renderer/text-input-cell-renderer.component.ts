import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BehaviorSubject, debounceTime, skip, Subscription } from 'rxjs';
import { GridComponentDebounceTime } from '../grid-component-debounce-time';

@Component({
  selector: 'app-text-input-cell-renderer',
  template: `
    <form [formGroup]="nameForm">
        <input formControlName="name" placeholder="League Name" (ngModelChange)="onChange(name?.value, name?.invalid || false)"> 
        <div *ngIf="name?.invalid" class="alert">
            <div *ngIf="name?.errors?.['required']">Name is required.</div>
            <div *ngIf="name?.errors?.['minlength']">Name must be at least 4 characters long.</div>
            <div *ngIf="name?.errors?.['maxlength']">Name must be at less than 100 characters long.</div>
            <div *ngIf="name?.errors?.['specialCharactors']">Name can not contain special charactors.</div>
        </div>
    </form>
  `,
  styles: [
  ]
})
export class TextInputCellRendererComponent implements ICellRendererAngularComp {
  private _params: any;
  private _isResized: boolean = false;
  private _debounceAbleValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _subscribtion: Subscription|undefined = undefined;
  nameForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _debounceTime: GridComponentDebounceTime) { }

  get name(){
    return this.nameForm.get('name');
  }

  agInit(params: ICellRendererParams<any, any>): void {
    this._params = params;

    this.nameForm = this._formBuilder.group({
      name: [this._params.data[this._params.column.colId] || '', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(30),
        this._validationSpecialCharactors
      ]]
    });

    this.ResizeRow(this.name?.invalid || false);

    if(this._subscribtion){
      this._subscribtion.unsubscribe();
    }

    this._subscribtion = this._debounceAbleValue.pipe(skip(1), debounceTime(this._debounceTime.MilliSeconds)).subscribe((value: string) => { 
      this.CallOnChanged(value);
    });
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  onChange(value: string, invalid: boolean){
    this.ResizeRow(invalid);

    this._params.node.data[this._params.column.colId] = value;
    if(!invalid){
      this._debounceAbleValue.next(value);
    }
  }

  private ResizeRow(invalid: boolean){
    if(invalid && !this._isResized){
      this._isResized = true;
      this._params.node.setRowHeight(60);
      this._params.api.onRowHeightChanged();
    }

    if(!invalid && this._isResized){
      this._isResized = false;
      this._params.node.setRowHeight(null);
      this._params.api.onRowHeightChanged();
    }
  }

  private CallOnChanged(value: string){
    if (this._params.onChange instanceof Function) {
      const params = {
        value: value,
        rowData: this._params.node.data
      }

      if(this._params['onChange']){
        this._params.onChange(params);
      }
    }
  }

  private _validationSpecialCharactors = (control: AbstractControl) => {
    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
    const result = specialChars.split('').some(specialChar => {
      if (control.value?.includes(specialChar)) {
        return true;
      }
  
      return false;
    });

    if(result){
      return {specialCharactors: true};
    }
    return null;
  };
}
