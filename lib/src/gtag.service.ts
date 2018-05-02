import { Injectable, Inject } from '@angular/core';
import { GtagPageview, GtagEvent, GtagConfig } from './interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { tap, filter } from 'rxjs/operators';
declare var gtag: any;

@Injectable()
export class Gtag {
  constructor(
    @Inject('config') private gaConfig: GtagConfig,
    private router: Router
  ) {
    if (gaConfig.trackPageviews) {
      router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          this.pageview();
        })
      )
      .subscribe();
    }
  }

  event(action: string, params: GtagEvent = {}) {
    // try/catch to avoid cross-platform issues
    try {
      gtag('event', action, params);
    } catch (err) {
      console.error('Google Analytics event error', err);
    }
  }

  pageview(params?: GtagPageview) {
    try {
      const defaults = {
        page_path: this.router.url,
        page_title: 'Angular App',
        page_location: window.location.href
      };

      params = { ...defaults, ...params };
      gtag('config', this.gaConfig.trackingId, params);
    } catch (err) {
      console.error('Google Analytics pageview error', err);
    }
  }

  screenView(params) {

  }

  config(params: any) {
    try {
      gtag('config', this.gaConfig.trackingId, (params = {}));
    } catch (err) {
      console.error('Google Analytics config error', err);
    }
  }
}
