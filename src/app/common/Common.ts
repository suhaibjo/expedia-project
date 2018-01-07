import { Http, Response, Headers } from '@angular/http';

/**
 * This class contains common methods for project.
 */
export class Common  {

  /** Common Class fields. */

  /** Base URL */
  public BASE_URL: string = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";

  /**
  * Constructor
  */
  constructor( ) {}

  /**
   * Get Base Url
   * @return BASE_URL : string
   */
  public getBaseURL(): string{
    return this.BASE_URL;
  }
}
