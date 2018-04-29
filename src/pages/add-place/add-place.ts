import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { PlacesService } from '../../services/places.service';
import { File } from '@ionic-native/file';

declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage implements OnInit{
  location:Location;
  chosen:boolean=false;
  imageUrl:string='';
  constructor(private modalCtrl:ModalController,private geolocation:Geolocation,
    private loadingCtrl:LoadingController,private toastCtrl:ToastController,
  private camera:Camera,private placesSrv:PlacesService,private file:File
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
    this.camera.getPicture({
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true
    }).then(picture=>{
      const currentName = picture.replace(/^.*[\\\/]/,'');
      const path = picture.replace(/[^\/]*$/,'');
      const newFileName = new Date().getUTCMilliseconds()+'.jpg';
      this.file.moveFile(path, currentName, cordova.file.dataDirectory,newFileName).then(data=>{
        this.imageUrl = data.nativeURL;
        this.camera.cleanup();
      }).catch(error=>{
        this.imageUrl='';
        const toast = this.toastCtrl.create({
          message:'Couldnt save the image, please try again',
          duration:2500
        });
        toast.present();
        this.camera.cleanup();
      });
      });
      this.imageUrl=picture;
    }
  onSubmit(form:NgForm){
    this.placesSrv.addPlace(form.value.title,form.value.description,this.location,this.imageUrl);
    this.imageUrl='';
    this.chosen=false;
    form.reset();
  }
}
