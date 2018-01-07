import { Response, RequestOptions, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Common } from './../Common';

/**
 * Super class for all services.
 * This class contains common methods may I use.
 */
@Injectable()
export class CommonServices extends Common {
    /**
     * Constructor
     */
    constructor() {
      super();
    }

    /**
     * Fix Date Format
     */
    public fixDate(dateObject) : Date{
      if(dateObject == null || dateObject == 'undefined')
        return null;

       let year = dateObject[0];
       let month = dateObject[1];
       let day = dateObject[2];

       return new Date(year+"-"+ month+"-"+ day);
    }

   /**
    * Redirect To External URL
    */
   public redirectToURL(url : string){
      let decodedURL = this.decodeURL(url);
      window.open(decodedURL, "_blank");
   }

   /**
    * Decode Encoded URL
    */
  private decodeURL(encodedURL){
    let dec = null;
    if(encodedURL == null || encodedURL == 'undefined'){
        return;
    }

    dec = decodeURIComponent(encodedURL.replace(/\+/g,  " "));
    return dec;
  }
}
