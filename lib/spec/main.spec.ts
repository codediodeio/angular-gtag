import { Gtag } from '../src/gtag.service';
import { Router } from '@angular/router';

describe('Gtag', () => {
  let gtag;

  beforeEach(() => {
    gtag = new Gtag({ trackingId: 'testId' }, {} as Router);
  });

  it('should be defined', () => {
    expect(gtag).toBeDefined();
  });
});
