import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";


/*
  Generated class for the NotificationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/notification/notification.html',
})
export class NotificationPage {
  
  
  constructor(public nav: NavController, private platform: Platform) {
    this.nav = nav;
    this.platform = platform;
  }
  
    
  
}
