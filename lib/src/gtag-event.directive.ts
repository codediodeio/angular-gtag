import {
  Directive,
  HostListener,
  Renderer2,
  Input,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Gtag } from './gtag.service';

@Directive({
  selector: '[gtagEvent]'
})
export class GtagEventDirective implements AfterViewInit {
  @Input() trackOn: string;
  @Input() action: string;
  @Input() category: string;
  @Input() params: any;

  constructor(
    private gtag: Gtag,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    try {
      this.renderer.listen(this.el.nativeElement, this.trackOn, () => {
        this.gtag.event(this.action || this.trackOn, {
          event_category: this.category,
          ...this.params
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}
