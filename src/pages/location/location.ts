import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage implements OnInit{
  location:Location;
  marker:Location;
  constructor(private navParams:NavParams,private viewCtrl:ViewController) {
    
  }
  ngOnInit(){
    this.location=this.navParams.get('location');
  }
  onSetMarker(event:any){
    console.log(event);
    this.marker = new Location(event.coords.lat,event.coords.lng);
  }
  onConfirm(){
    this.viewCtrl.dismiss(this.marker);
  }
  onAbort(){
    this.viewCtrl.dismiss();
  }
}
