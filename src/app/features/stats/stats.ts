import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PERMISSIONS} from '../../core/models/permission.model';

@Component({
  selector: 'app-stats',
  imports: [
    RouterLink
  ],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {

  protected readonly PERMISSIONS = PERMISSIONS;

  @Input() totalElements!: number;
  @Input() title!: string;

}
