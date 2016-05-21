import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";
import {DiskusiPage} from '../diskusi/diskusi';

@Page({
  templateUrl: 'build/pages/notification/notification.html',
})
export class NotificationPage {
  
  
  constructor(public nav: NavController, private platform: Platform) {
    this.nav = nav;
    this.platform = platform;
  }
  
  diskusi(){
    this.nav.push(DiskusiPage);
  }
  
    
  
}
