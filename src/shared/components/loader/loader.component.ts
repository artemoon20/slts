import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderSize = 'small' | 'medium' | 'large';
export type LoaderVariant = 'spinner' | 'dots' | 'pulse' | 'bars';
export type LoaderColor = 'primary' | 'secondary' | 'white' | 'dark';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'medium';
  @Input() variant: LoaderVariant = 'spinner';
  @Input() color: LoaderColor = 'primary';
  @Input() text: string = '';
  @Input() overlay: boolean = false;
  @Input() fullScreen: boolean = false;
}
