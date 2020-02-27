import { Injectable, Inject } from '@angular/core';
import { GtagPageview, GtagEvent, GtagConfig } from './interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { tap, filter } from 'rxjs/operators';
declare var gtag: any;

@Injectable()
export class Gtag {
  private mergedConfig: GtagConfig;
  private userId: string;

  constructor(@Inject('config') gaConfig: GtagConfig, private router: Router) {
    this.mergedConfig = { trackPageviews: true, ...gaConfig };
    if (this.mergedConfig.trackPageviews) {
      router.events
        .pipe(
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
      this.debug('event', this.mergedConfig.trackingId, action, params);
    } catch (err) {
      console.error('Google Analytics event error', err);
    }
  }

  pageview(params?: GtagPageview) {
    try {
      const defaults = {
        page_path: this.router.url,
        page_title: 'Angular App',
        page_location: window.location.href,
        user_id: this.userId
      };

      params = { ...defaults, ...params };
      gtag('config', this.mergedConfig.trackingId, params);
      this.debug('pageview', this.mergedConfig.trackingId, params);
    } catch (err) {
      console.error('Google Analytics pageview error', err);
    }
  }

  config(params: any = {}) {
    try {
      gtag('config', this.mergedConfig.trackingId, params);
    } catch (err) {
      console.error('Google Analytics config error', err);
    }
  }

  set(params: any = {}) {
    try {
      gtag('set', params);
    } catch (err) {
      console.error('Google Analytics set error', err);
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.config({user_id: userId});
  }

  private debug(...msg) {
    if (this.mergedConfig.debug) {
      console.log('angular-gtag:', ...msg);
    }
  }
}
