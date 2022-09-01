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

      City: string;
      newCity: string;
      Units: string;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private Storage: Storage
    ) {
  }

// lifecycle hooks For persistent storage
  
  ionViewWillEnter(){ 
      this.Storage.get("newCity")
        .then((data) => {
        if (data == null) {
        this.newCity = "";
      } else {
        this.newCity = data;
      }
    })
          .catch((error) => alert("Problem accessing local storage"));
          this.Storage.get("units")
          .then((data) => {
          this.units = data;
    })
          .catch((error) => alert("Problem accessing local storage"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  //sets the default info persistantly save units
  save() {
        this.Storage.set("newCity", this.newCity);
        this.Storage.get("newCity")
        this.Storage.set("Units", this.Units = "C");

        this.navCtrl.pop(); 

  }
}

//alert("Please enter city name or press back to exit");