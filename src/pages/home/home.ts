import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { CityProvider } from '../../providers/city/city';
import { WeatherProvider} from '../../providers/weather/weather';
import { NewsProvider } from '../../providers/news/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: any[];
  country: string;

  initialMessage: string;
  initialMessageHidden: boolean = true;
  newsDisabled = true;
  newsHidden: boolean = false; 
   
  
  // <-------Weather data------->

  weather: any[]; // Taken from weather API
  weatherTitle: string;
  weatherImageUrl: string;
  weatherTemp: number;
  displayTempUnit: string; //displaying k, c, f

  // <-------News data------->
  category:string;
  newsCountry: string = "";
  newsTitle: any[];
  newsDescription: string;
  newsurlToImage: string;
  pageSize: number ;
  newsArticleInfo: any [];



  constructor(public navCtrl: NavController, private storage: Storage, private cityprovider:CityProvider, 
    private weatherprovider:WeatherProvider, private newsprovider:NewsProvider) {
    
    console.log(this.cities)

  }
   
    ngOnInit(){ //for the first loading
    this.weatherTitle = "City not Found";
  }


  //On first loading, shows no value on Storage
  
ionViewDidLoad(){
    console.log('HomePage');
    this.storage.clear();
    
}

  ionViewDidEnter(){
    this.newsHidden = false;
     
    
    this.storage.get("pageSize")
    .then((data) => {
      if(data == null){
        console.log("null news articles");
        this.newsDisabled = true;
      }else{
        this.pageSize = data;
        this.newsDisabled = false;
      }
    })
    .catch((err) => {
      console.log("error with number of articles");
    })
  }

   ionViewWillEnter(){
 //Updates the weather to be displayed
     this.storage.get("city")
      .then((data) =>{
        if(data == null){
          console.log(data)
          console.log("city is null");
          this.weather = null;
      } else {
          this.cities = data;
          console.log(data)
      }
    }).catch((err) =>{
      console.log("error getting city");
    });

    
    this.storage.get("setWeatherInformation")
      .then((data) =>{
        if(data == null){
            console.log("Weather is null");
            this.weather =null;
            this.imageHidden = true;
          
          } else {
            this.setweather();
            this.imageHidden = false;
          }
      })
      .catch((err) => {
        console.log("error updating the weather " + err);
      });


    //Temperature unit is stored separately
    this.storage.get("temperatureUnit")
      .then((data) => {
        if(data == null){
          console.log("temperature unit display is null");
        } else {
          this.displayTempUnit = data;
          this.setDisplayUnit();
        }
      })
      .catch((err) => {
        console.log("error updating temperature unit " + err);
      });
  }

setweather(){
  this.city = this.weather.name;
  this.country = this.weather.country;
}

updateNews(){
    this.NewsProvider.getNews(this.country, this.category).subscribe((data) =>{
      this.news = data;

      this.pageSize = this.news.totalResults;
      this.newsHidden = !this.newsHidden; 
    });
}



setDisplayUnit(){ //The below are displayed on the loading
    if(this.displayTempUnit == "metric"){
        this.displayTempUnit = "C";

    }else if(this.displayTempUnit == "fahrenheit"){
        this.displayTempUnit = "F";

    }else if(this.displayTempUnit == "scientific") {
        this.displayTempUnit = "K";
    }
  }






   openSettingsPage() {
    this.navCtrl.push(SettingsPage);
}

    
 }

    
  



  

  

      

