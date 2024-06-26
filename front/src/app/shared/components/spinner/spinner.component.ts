import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  isLoading$ = this.spinnerService.isLoading$;

  constructor(private spinnerService: SpinnerService) {}
}
