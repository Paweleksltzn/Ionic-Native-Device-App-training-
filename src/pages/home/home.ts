import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacePage } from '../place/place';
import { PlacesService } from '../../services/places.service';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  addPlacePage=AddPlacePage;
  places:Place[]=[];
  constructor(public navCtrl: NavController,private placesSrv:PlacesService,private modalCtrl:ModalController,private file:File) {

  }
  ngOnInit(){
    this.placesSrv.fetchPlaces().then(places=>{
      this.places=places;
    })
  }
  ionViewWillEnter(){
    this.places=this.placesSrv.loadPlaces();
  }
  onOpenPlace(place:Place,i:number){
   const modal = this.modalCtrl.create(PlacePage,{place:place,index:i});
   modal.present();
   modal.onDidDismiss(places=>{
     this.places=places;
   });
  }
}
