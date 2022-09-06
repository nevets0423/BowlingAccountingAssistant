import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, skip, take } from 'rxjs';
import { LeagueFile } from 'src/app/models/LeagueFile';
import { LeagueInfo } from '../../models/LeagueInfo';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent implements OnInit {
  league: LeagueInfo = {
    ID: 0,
    LaneFee: 0,
    Name: '',
    NumberOfWeeks: 0,
    PrizeAmountPerWeek: 0
  };

  leagueForm!: FormGroup;
  loading: boolean = false;

  private _existingFiles: LeagueFile[] = [];

  constructor(private _dataManager: DataManagerService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading = true;
    this.leagueForm = this._formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(30),
        this._validateMustBeUnique,
        this._validationSpecialCharactors
      ]],
      fee: [0, [
        Validators.required, 
        Validators.maxLength(10),
        this._validateIsNumber,
        this._validateTwoDecimalPlaces,
        this._validateGreaterThanZero
      ]],
      prize: [0, [
        Validators.required, 
        Validators.maxLength(10), 
        this._validateIsNumber,
        this._validateTwoDecimalPlaces,
        this._validateGreaterThanZero
      ]],
      weeks: [0, [
        Validators.required, 
        Validators.maxLength(8), 
        this._validateIsNumber,
        this._validateGreaterThanZero,
        this._validateWholeNumber
      ]],
    });

    this._dataManager.OnReady.pipe(filter(value => value), take(1)).subscribe(() => {
      this._dataManager.Leagues.pipe(filter(value => value != null), skip(1)).subscribe(leagueFiles => {
        this._existingFiles = leagueFiles;
        this.loading = false;
      });
      this._dataManager.LoadLeagues();
    });
  }

  get name(){
    return this.leagueForm.get('name');
  }

  get fee(){
    return this.leagueForm.get('fee');
  }

  get prize(){
    return this.leagueForm.get('prize');
  }

  get weeks(){
    return this.leagueForm.get('weeks');
  }

  get CostPerWeek(){
    return Number(this.fee?.value)+ Number(this.prize?.value);
  }

  get TotalCost(){
    return (Number(this.fee?.value) + Number(this.prize?.value)) * Number(this.weeks?.value);
  }

  CreateLeague(){
    this.league.LaneFee = Number(this.league.LaneFee);
    this.league.NumberOfWeeks = Number(this.league.NumberOfWeeks);
    this.league.PrizeAmountPerWeek = Number(this.league.PrizeAmountPerWeek);
    
    this._dataManager.CreateLeague(this.league);
  }

  //#region Validation

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

  private _validateMustBeUnique = (control: AbstractControl) => {
    if(this._existingFiles.findIndex(file => file.DisplayName.trim().toLowerCase() == control.value?.trim().toLowerCase()) == -1){
      return null;
    }
    return {notUnique: true};
  };

  private _validateWholeNumber = (control: AbstractControl) => {
    let value = Number(control.value);
    if (isNaN(value) || Math.floor(value) === value) {
      return null;
    }

    return {notWholeNumber: true};
  };

  private _validateGreaterThanZero = (control: AbstractControl) => {
    let value = Number(control.value);

    if(isNaN(value) || value > 0){
      return null;
    }

    return {greaterThanZero: true};
  };

  private _validateIsNumber = (control: AbstractControl) => {
    if(isNaN(Number(control.value))){
      return {isNotNumber: true};
    }

    return null;
  };

  private _validateTwoDecimalPlaces = (control: AbstractControl) => {
    let value = Number(control.value);
    let decimalCount = this.CountDecimals(value);

    if(decimalCount > 2){
      return {toManyDecimal: true};
    }

    return null;
  };

  //#endregion

  private CountDecimals(value: number) {
    if (isNaN(value) || Math.floor(value) === value) {
      return 0;
    }

    var str = value.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } 
    if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
  }
}
