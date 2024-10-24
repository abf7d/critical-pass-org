import { Component } from '@angular/core';
import { environment } from '../../../../config/environment';

@Component({
  selector: 'cpo-about-banner',
  standalone: true,
  imports: [],
  templateUrl: './about-banner.component.html',
  styleUrl: './about-banner.component.scss'
})
export class AboutBannerComponent {
  public appUrl = environment.appUrl;
}
