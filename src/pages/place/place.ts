import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places.service';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place:Place;
  index:number;
  constructor( public navParams: NavParams,private viewCtrl:ViewController,private placeSrv:PlacesService) {
  }

  ionViewWillEnter(){
    this.place=this.navParams.get('place');
    this.index=this.navParams.get('index');
  }
  onDelete(){
    this.viewCtrl.dismiss();
  }
  onLeave(){
    this.placeSrv.onDelete(this.index);
    this.viewCtrl.dismiss(this.place);
  }
}
