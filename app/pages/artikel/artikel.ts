import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet, NavParams} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";

@Page({
  templateUrl: 'build/pages/artikel/artikel.html',
})
export class ArtikelPage {
  id : any;
  posts: any;
  
  constructor(public http: Http, public nav: NavController, private navParams: NavParams) {
    this.id = navParams.data;
    
    http.get('http://210.16.120.17/api/artikel_b.php?idartikel='+this.id).map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
    
  }
  
  diskusi(){
    
  }
}
