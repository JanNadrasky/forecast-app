import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { map, Observable, of, startWith } from "rxjs";
import { Cities } from "src/app/types/weather-conf.type";

@Component({
  selector: 'weather-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class WeatherDialog implements OnInit {
  public inputControl = new FormControl();

  public filteredOptions: Observable<Cities[]> = of([]);

  public cities = this.data;

  constructor(
    public dialogRef: MatDialogRef<WeatherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Cities[],
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.cityName)),
      map(name => (name ? this._filter(name) : this.cities.slice())),
    );
  }

  public displayFn(city: Cities): string {
    return city && city.cityName ? city.cityName : '';
  }

  private _filter(name: string): Cities[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter(option => option.cityName.toLowerCase().includes(filterValue));
  }

  public closeDialogAndSaveValue(): void {
    this.dialogRef.close(this.inputControl.value);
  }
}
