import { Component } from '@angular/core';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private gtag: Gtag) {}
}
