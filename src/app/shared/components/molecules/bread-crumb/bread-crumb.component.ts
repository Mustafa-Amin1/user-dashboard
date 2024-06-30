import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { breadCrumbArr } from 'src/app/shared/types/breadcrumbArr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent {

  @Input() links:breadCrumbArr[]=[]
  trackByFn(index: number): number {
    return index;
  }
}
