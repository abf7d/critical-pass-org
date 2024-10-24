import { Component } from '@angular/core';
import { HomeCallToActionComponent } from '../home-content/home-call-to-action/home-call-to-action.component';
import { HomeNewsletterComponent } from '../home-content/home-newsletter/home-newsletter.component';
import { AboutBannerComponent } from './about-banner/about-banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HomeCallToActionComponent, HomeNewsletterComponent, AboutBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
