import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";

@Page({
  templateUrl: 'build/pages/diskusi/diskusi.html',
})
export class DiskusiPage {
  constructor(public nav: NavController, private platform: Platform) {
    this.nav = nav;
    this.platform = platform;
  }
  
  
  diskusi(){
    
  }
}
