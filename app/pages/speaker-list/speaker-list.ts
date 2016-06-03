import {Platform, NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';
import {NotificationPage} from '../notification/notification';
import {TulisArtikelPage} from '../tulis-artikel/tulis-artikel';
import {TulisDiskusiPage} from '../tulis-diskusi/tulis-diskusi';
import {DiskusiPage} from '../diskusi/diskusi';


@Page({
  templateUrl: 'build/pages/speaker-list/speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers = [];
  searchQuery: string = '';
  items;
  posts: any;

  constructor(private nav: NavController, confData: ConferenceData, public platform: Platform, public http: Http) {
    //this.initializeItems();
  }

  notif(){
    this.nav.push(NotificationPage);
  }

  diskusi(diskusiId){
    this.nav.push(DiskusiPage, diskusiId);
  }

  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tulis Artikel',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'book' : null,
          handler: () => {
            console.log('Delete clicked');
            this.nav.push(TulisArtikelPage);
          }
        },
        {
          text: 'Tanya / Diskusi',
          icon: !this.platform.is('ios') ? 'people' : null,
          handler: () => {
            console.log('Share clicked');
            this.nav.push(TulisDiskusiPage);
          }
        },
        {
          text: 'Batal',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }

  initializeItems() {

    this.http.get('http://210.16.120.17/api/search.php?search='+this.searchQuery).map(res => res.json()).subscribe(data => {
        this.posts = data;
    });

  }

  getItems(searchbar) {
    // // Reset items back to all of the items
    this.initializeItems();
    //
    // // set q to the value of the searchbar
    // var q = searchbar.value;
    //
    // // if the value is an empty string don't filter the items
    // if (q.trim() == '') {
    //   return;
    // }
    //
    // this.items = this.items.filter((v) => {
    //   if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
    //     return true;
    //   }
    //   return false;
    // })
  }
}
