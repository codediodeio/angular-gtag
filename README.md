# Angular gtag.js

A simple Google Analytics [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs/) package for Angular. 

## Install

```
npm install angular-gtag --save
```

Add the the tracking code from GA admin dashboard to `index.html` and set *send_page_view* to false.

```html
<head>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-YOUR_TRACKING_ID', { 'send_page_view': false });
</script>

</head>
```

Add the package to to your `app.module.ts`. 

```ts
import { GtagModule } from 'angular-gtag';

@NgModule({
  imports: [
    GtagModule.forRoot({ trackingId: 'UA-YOUR_TRACKING_ID', trackPageviews: true })
  ]
})
```

## Pageviews

The package will listen to route changes by default, you just need to instantiate service in the root of the project. 

```ts
export class AppComponent {
  constructor(gtag: Gtag) { }
}
```

Gtag is a serivce that also allows you to track pageviews manually. 

```ts
gtag.pageview();

// or with custom params

gtag.pageview({ 
  page_title: 'Lesson Feed',
  page_path: '/lessons',
  page_location: 'https://angularfirebase.com/lessons'
});
```

## Events

[Events](https://developers.google.com/analytics/devguides/collection/gtagjs/events) expect an action. 

```ts
gtag.event('view_promotion')
```

You can optionally pass in addtional params.


```ts
gtag.event('login', { 
  method: 'Instagram',
  event_category: 'engagemnt',
  event_label: 'New user logged in via OAuth'
});
```


## Event Directive

Many analytics events are tracked based on user interaction, such as button clicks. Just tell it which DOM event to track.  

```html
<button gtagEvent trackOn="click">Track Me</button>
```

This will register a general event in GA based on the event name.

![](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fevent-gtag.png?alt=media&token=8f70e408-0300-472b-ab99-75893bef26fb)

You can pass optional params to the directive like so:

```html
<div gtagEvent
     trackOn="dragstart" 
     action="product_dragged"
     category="ecommerce" 
     [params]="{ event_label: 'Something cool just happened' }">

   Some Product...
   
</div>
```

The directive will produce the following event on dragstart. 
![](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fevent-gtag2.png?alt=media&token=213e2c60-6892-42a9-ac21-e828114e423a)