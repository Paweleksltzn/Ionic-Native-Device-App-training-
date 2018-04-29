import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage implements OnInit{
  location:Location;
  chosen:boolean=false;
  constructor(private modalCtrl:ModalController,private geolocation:Geolocation,
    private loadingCtrl:LoadingController,private toastCtrl:ToastController,
  private camera:Camera
  ) {
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
  onLocate(){
    const loader = this.loadingCtrl.create({
      content:'Please, wait'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then(location=>{
      loader.dismiss();
      this.location.lat=location.coords.latitude;
      this.location.lng=location.coords.longitude;
      this.chosen=true;
    }).catch(error=>{
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message:'Geolocation failed',
        duration:2500
      });
      toast.present();
    })
  }
  onTakePhoto(){

  }
}
