import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { CityProvider } from '../../providers/city/city';
import { WeatherProvider} from '../../providers/weather/weather';
import { NewsProvider} from '../../providers/news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //initialMessageHidden: string;
  newsDisabled = true;

  
  newCity: string;
  units: string;

  weather: string[];
  temp: string;
  country: string;
  totalNews: string;
  articles: string[];
  newsButton = true;


  constructor(public navCtrl: NavController, 
    private storage:Storage, 
    private cp:CityProvider, 
    private wp:WeatherProvider,  
    private np:NewsProvider) {

  }

ionViewDidLoad(){ // Clearing stoarge from previous userinput
    this.storage.clear();
  }

 ngOnInit() { //Fired once initialisatly
    this.initialMessage = 'No city selected';
  }

  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

ionViewDidEnter(){
   //this.initialMessageHidden = true;
    }


  ionViewWillEnter(){
       this.storage.get("newCity")
        .then((val) => { 
            this.newCity = val;
        })
        .catch((err) => {
              alert("Error accessing Storage");
        })
  
       this.storage.get("units")
        .then((data) => { 
            this.Units = data;
        })
        .catch((err) => {
              alert("Error accessing Storage");
              this.newsButton = true;
        });

     }
    
  getCity() {//Function to get the city information based on user input (countries)
      this.cp.getCity().subscribe(data => {
      this.storage = data.newCity;
      this.name = data.common;
      this.flags = data.flags;
    });
  }

  getWeather() {//Function to get the weather information based on user input (countries)
      this.wp.getWeather(this.newCity, this.Units).subscribe((data) => {
      this.temp = data.temp;
      this.description = data.description;
      this.weatherIcon = data.weather.icon;
      this.wind = data.wind_cdir_full ;
    });
  }

  getNews() {//Function to get the news information based country identified 
      this.newsButton = false;
      this.np.getNews(this.country, 5).subscribe(data => {
      this.totalNews = data.totalResults;
      this.articles = data.articles;
   });
  }

  getSettingsPage() {
      this.navCtrl.push(SettingsPage);
  }

  setUnit(){ //setting units
    if(this.Unit == "metric"){
      this.Unit = "C";

    }else if(this.Unit == "fahrenheit"){
          this.Unit = "F";

    }else if(this.Unit == "scientific") {
          this.Unit = "K";
    }
  }
}
