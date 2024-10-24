import { Component } from '@angular/core';
import { environment } from '../../../../config/environment';

@Component({
  selector: 'cpo-home-banner',
  standalone: true,
  imports: [],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss'
})
export class HomeBannerComponent {
  public appUrl: string = environment.appUrl;
}
