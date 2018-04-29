import { Place } from "../models/place";
import { Location } from "../models/location";
import {Storage} from '@ionic/storage';
import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";

declare var cordova:any;

@Injectable()
export class PlacesService {
    private places:Place[]=[];
    constructor(private storage:Storage,private file:File){}
    addPlace(title:string,description:string,location:Location,imgUrl:string){
        this.places.push(new Place(title,description,location,imgUrl));
        this.storage.set('places',this.places).then(success=>{

        }).catch(error=>{
            this.places.splice(this.places.length-1,1);
        })
    }
    loadPlaces(){
        return this.places.slice();
    }
    fetchPlaces(){
        this.storage.get('places').then((places:Place[])=>{
            this.places= places !=null ? places : [];
            return this.places;
        }).catch(error=>{

        })
    }
    onDelete(index:number){
        const place = this.places[index];
        this.places.splice(index,1);
        this.storage.set('places',this.places).then(data=>{
            this.removeFile(place);
        }).catch(error=>{

        });
    }
    private removeFile(place){
        const currentName = place.replace(/^.*[\\\/]/,'');
      const path = place.replace(/[^\/]*$/,'');
      this.file.moveFile(path, currentName, cordova.file.dataDirectory,currentName).then(response=>{

      }).catch(error=>{
          this.addPlace(place.title,place.description,place.location,place.imagePath);
      })
    }
}