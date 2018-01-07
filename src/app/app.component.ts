import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { HttpModule } from '@angular/http';
import { CommonServices } from './common/services/common-service';
import { HotelPricingInfo } from './common/models/HotelPricingInfo';
import { HotelInfo } from './common/models/HotelInfo';
import { Common } from './common/Common';

/*  window variable to fetch javascript functions */
declare var window: any;

/**
 * Main Application Component.
 *
 * @author Suhaib Abu Naba
 * @version 1.00
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent (main class)
 *
 */
export class AppComponent implements OnInit {

/* Data that hold all offer objects */
public data: any = null;

/* User displayed in page */
public userId: string;

/* holder if user search by distination name */
public distinationName: string;

/* holder if user search by region id */
public regionId: string;

/* hotel info object */
public hotelInfo: HotelInfo = new HotelInfo();

/* hotel pricing info */
public hotelPricingInfo : HotelPricingInfo = new HotelPricingInfo();;

/* Show No Data Found Message */
public showNoDataFoundMessage : boolean = false;
/**
 * Constructor
 * @param {Http} _http - instance of Http
 */
 constructor(public _http: Http,
    public commonServices: CommonServices) {
 }

 /**
   * ngOnInit (Excuted when component is initilized)
   */
  ngOnInit() {
      this.retrieveBestOffers();
  }

 /**
  * Retrieve Best Offers
  */
  private retrieveBestOffers(){
      return this._http.get(this.commonServices.getBaseURL())
              .map((res: Response) => res.json())
               .subscribe(myData => {
                      this.userId = myData.userInfo.userId;
                      this.data = myData.offers.Hotel;
              });
  }

  /**
  * Search By Distination Name
  */
  public searchByDistinationName(){
       this.regionId = "";
       return this._http.get(this.commonServices.getBaseURL()+"&destinationCity="+this.distinationName)
             .map((res: Response) => res.json())
             .subscribe(myData => {
             this.data = myData.offers.Hotel;
       });
  }

 /**
  * Search By Region Id
  */
  public searchByRegionId() {
    this.distinationName = "";
    this.showNoDataFoundMessage = false;
    if(this.regionId == ''){
      this.retrieveBestOffers();
    }
    return this._http.get(this.commonServices.getBaseURL()+"&regionIds="+this.regionId)
          .map((res: Response) => res.json())
          .subscribe(myData => {
                  this.data = myData.offers.Hotel;
                  if(this.data == null || this.data == 'undefinde'){
                      this.showNoDataFoundMessage = true;
                  }
        });
  }

  /**
   * Get Special Offer
   * @param {offer object} obj
   */
  public getSpecialOffer(obj){
      // fill hotel information
      this.hotelInfo = new HotelInfo();
      this.hotelInfo.hotelImageUrl = obj.hotelInfo.hotelImageUrl;
      this.hotelInfo.hotelCity = obj.hotelInfo.hotelCity;
      this.hotelInfo.hotelName = obj.hotelInfo.hotelName;
      this.hotelInfo.hotelInfositeUrl =  obj.hotelUrls.hotelInfositeUrl;

      // fill pricing info
      this.hotelPricingInfo = new HotelPricingInfo();
      this.hotelPricingInfo.percentSavings = obj.hotelPricingInfo.percentSavings;
      this.hotelPricingInfo.totalPriceValue =  obj.hotelPricingInfo.totalPriceValue;
      this.hotelPricingInfo.currency =  obj.hotelPricingInfo.currency;

      // fill offer date range
      this.hotelPricingInfo.lengthOfStay = obj.offerDateRange.lengthOfStay;
      this.hotelPricingInfo.travelStartDate = this.commonServices.fixDate(obj.offerDateRange.travelStartDate);
      this.hotelPricingInfo.travelEndDate = this.commonServices.fixDate(obj.offerDateRange.travelEndDate);
  }

  /**
  * Go To Hotel Info Site Url
  */
  public gotToHotelInfositeUrl(){
    this.commonServices.redirectToURL(this.hotelInfo.hotelInfositeUrl);
    window.closeModal();
  }

  /**
  * Close Modal Message Dialogue
  */
  public closeMessage(){
    window.closeMessage();
  }
 }
