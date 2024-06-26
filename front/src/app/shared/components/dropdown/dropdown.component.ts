import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TOption } from '../../types/util.types';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass, NgFor, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
  }]
})
export class DropdownComponent<T extends TOption> implements ControlValueAccessor {
  @Input() options: Observable<T[]> = new BehaviorSubject([]);

  private onTouched!: Function;
  private onChanged!: Function;

  localOptions:T[] = [];

  ngOnInit() {
    this.options.subscribe((data) => {
      this.localOptions = data;
    });
  }

  isDropdowActive = false;
  selectedOption: T | undefined;

  writeValue(data: string): void {
    const selectedData = data ? JSON.parse(data) : {};
    this.selectedOption = this.localOptions.find((opt) => opt._id == selectedData?._id);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelect(event: any, option: T) {
    this.selectedOption = option;
    this.onTouched();
    this.onChanged(JSON.stringify(option));
    this.toggleDropdown();
    event.preventDefault();
    event.stopPropagation();
  }

  toggleDropdown() {
    this.isDropdowActive = !this.isDropdowActive;
  }
}