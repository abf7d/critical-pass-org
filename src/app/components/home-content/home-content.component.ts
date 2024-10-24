import { Component } from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomeHowItWorksComponent } from './home-how-it-works/home-how-it-works.component';
import { HomeTestimonialComponent } from './home-testimonial/home-testimonial.component';
import { HomeCounterComponent } from './home-counter/home-counter.component';
import { HomeFaqsComponent } from './home-faqs/home-faqs.component';
import { HomeCallToActionComponent } from './home-call-to-action/home-call-to-action.component';
import { HomeNewsletterComponent } from './home-newsletter/home-newsletter.component';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [HomeBannerComponent, HomeFeaturesComponent, HomeHowItWorksComponent, HomeTestimonialComponent, HomeCounterComponent, HomeFaqsComponent, HomeCallToActionComponent, HomeNewsletterComponent],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss'
})
export class HomeContentComponent {

}
