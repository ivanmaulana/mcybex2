import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import {bootstrap} from "angular2/platform/browser";
import {ProfilePage} from '../profile/profile';

@Page({
  templateUrl: 'build/pages/pakar/pakar.html',
})
export class PakarPage {
  posts: any;

  constructor(public http: Http, public platform: Platform, private nav: NavController) {
    http.get('http://210.16.120.17/api/all_pakar.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    });

  }

  profile(userId) {
    this.nav.push(ProfilePage, userId);
  }
}
