import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//*******CAPTURE POSITION TEST******/
var tid = setTimeout(loopCoords, 2000)
function loopCoords() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat + "    " + long);
  });
  setTimeout(function () {
    navigator.geolocation.watchPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(lat + "    " + long);
    });
  }, 3000)
  tid = setTimeout(loopCoords, 2000)
  var i = 0;
  /*while (i < 100) {
    (function (i) {
      setTimeout(function () {
        navigator.geolocation.wa
        tchPosition(function (position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          console.log(lat + "    " + long);
        });
      }, 3000)
    })(i++)
  }*/
};
function abortTimer() {
  clearTimeout(tid)
}
