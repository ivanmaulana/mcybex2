import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import {bootstrap} from "angular2/platform/browser";
import {NotificationPage} from '../notification/notification';
import {DiskusiPage} from '../diskusi/diskusi';
import {TulisArtikelPage} from '../tulis-artikel/tulis-artikel';
import {TulisDiskusiPage} from '../tulis-diskusi/tulis-diskusi';

@Page({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  actionSheet: ActionSheet;
  posts: any;
  
  onPageLoaded() {
    this.http.get('http://210.16.120.17/api/all_diskusi.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
  }

  onPageWillEnter(){
    this.http.get('http://210.16.120.17/api/all_diskusi.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
  }
  
  constructor(public http: Http, public platform: Platform, private nav: NavController) {
    
    http.get('http://210.16.120.17/api/all_diskusi.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
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
  
}

