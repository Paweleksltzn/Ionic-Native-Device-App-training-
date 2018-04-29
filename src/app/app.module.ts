import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from '../pages/add-place/add-place';
import { LocationPage } from '../pages/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesService } from '../services/places.service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    LocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey:' AIzaSyBYep8Ufdmr1boMdWsQHD3koNa5c-GemUY '
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    LocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    PlacesService,
    File,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
