import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage implements OnInit{
  location:Location;
  chosen:boolean=false;
  constructor(private modalCtrl:ModalController) {
  }
  ngOnInit(){
    this.location={
      lat:50.221136,
      lng:19.064416
   }
  }
  onOpenMap(){
    const modal = this.modalCtrl.create(LocationPage,{location:this.location});
    modal.present();
    modal.onDidDismiss((marker:Location)=>{
      if(marker){
      this.location=marker;
      this.chosen=true;
      }
    });
  }
}
