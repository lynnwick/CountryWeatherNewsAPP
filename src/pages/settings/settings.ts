import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

      newCity: string;
      units: string;
     


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad SettingsPage');
  }



  save() {//sets the default info
    this.storage.set("newCity", this.newCity);
      this.storage.get("newCity")
        .then((data) => { 
            if(this.newCity == null){
            alert("Please enter city name or press back to exit");  
            
             if(this.unit == null){
             this.unit = "metric"; 
           }}else{this.navCtrl.pop(); }

        })

          
  }
}


 