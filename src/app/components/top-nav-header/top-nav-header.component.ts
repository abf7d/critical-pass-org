import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../config/environment';

@Component({
  selector: 'cpo-top-nav-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-nav-header.component.html',
  styleUrl: './top-nav-header.component.scss'
})
export class TopNavHeaderComponent {
  public appUrl: string = environment.appUrl;
}
