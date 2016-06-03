import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet, NavParams} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";

@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  id : any;
  posts: any;
  comments: any;
  status: boolean;

  onPageWillEnter(){
    this.http.get('http://210.16.120.17/api/pakar.php?idpakar='+this.id).map(res => res.json()).subscribe(data => {
        this.posts = data;
    });
  }

  constructor(public http: Http, public nav: NavController, private navParams: NavParams) {
    this.id = navParams.data;
    this.status = false;

    http.get('http://210.16.120.17/api/pakar.php?idpakar='+this.id).map(res => res.json()).subscribe(data => {
        this.posts = data;
    });

  }
}
