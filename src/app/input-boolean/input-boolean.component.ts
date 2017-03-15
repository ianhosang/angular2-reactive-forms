import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-boolean',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-boolean.component.html',
  styleUrls: ['./input-boolean.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBooleanComponent),
      multi: true
    }
  ]
})
export class InputBooleanComponent implements ControlValueAccessor {
  @Input('value') value: boolean = false;

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  public toggle() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  public writeValue(value) { }
}
