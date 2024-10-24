import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MultiLevelAnimationService } from '../../../services/multi-level-animation/multi-level-animation.service';

@Component({
  selector: 'cpo-learn-more-banner',
  standalone: true,
  imports: [],
  templateUrl: './learn-more-banner.component.html',
  styleUrl: './learn-more-banner.component.scss'
})
export class LearnMoreBannerComponent {
  @ViewChild('sphereEl', { static: true }) sphereEl!: ElementRef;
  public appUrl: string = '';
  constructor(private multiLevel: MultiLevelAnimationService) { }
  ngOnInit(): void {
    this.multiLevel.initSphereAnim(this.sphereEl.nativeElement);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    const newHeight = (event.target as Window).innerHeight;
    this.multiLevel.onWindowResize(newWidth, newHeight); // Call the resize logic from your service
  }
}
