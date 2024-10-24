import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MultiLevelAnimationService } from '../../../services/multi-level-animation/multi-level-animation.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'cpo-multi-level',
  standalone: true,
  imports: [],
  templateUrl: './multi-level.component.html',
  styleUrl: './multi-level.component.scss'
})
export class MultiLevelComponent implements OnInit {
  @ViewChild('mltLevelEl', { static: true }) mltLevelEl!: ElementRef;
 
  @ViewChild('swapEl', { static: true }) swapEl!: ElementRef;
  constructor(private multiLevel: MultiLevelAnimationService) { }
  ngOnInit(): void {
    this.multiLevel.initMultiLevelAnim(this.mltLevelEl.nativeElement);
    this.multiLevel.initMSwapProjAnim(this.swapEl.nativeElement);
    // this.multiLevel.initSphereAnim(this.sphereEl.nativeElement);

  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   const newWidth = (event.target as Window).innerWidth;
  //   const newHeight = (event.target as Window).innerHeight;
  //   this.multiLevel.onWindowResize(newWidth, newHeight); // Call the resize logic from your service
  // }
}
