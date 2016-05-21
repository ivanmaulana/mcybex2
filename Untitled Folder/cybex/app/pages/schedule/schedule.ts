import {Platform, IonicApp, Page, Modal, Alert, NavController, ItemSliding, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";
import {NotificationPage} from '../notification/notification';
import {ArtikelPage} from '../artikel/artikel';
import {TulisArtikelPage} from '../tulis-artikel/tulis-artikel';
import {TulisDiskusiPage} from '../tulis-diskusi/tulis-diskusi';

@Page({
  templateUrl: 'build/pages/schedule/schedule.html'
})
export class SchedulePage {
  actionSheet: ActionSheet;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions = [];
  groups = [];
  posts: any;

  onPageLoaded() {
    this.http.get('http://210.16.120.17/api/all_artikel.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
  }

  onPageWillEnter(){
    this.http.get('http://210.16.120.17/api/all_artikel.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
  }

  constructor(
    public http: Http,
    public platform: Platform,
    private app: IonicApp,
    private nav: NavController,
    private confData: ConferenceData,
    private user: UserData
  ) {
    this.updateSchedule();
    
    this.onPageLoaded();
    this.onPageWillEnter();
    
    http.get('http://210.16.120.17/api/all_artikel.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
    }); 
  }

  notif(){
    this.nav.push(NotificationPage);
  }
  
  artikel(artikelId){
    this.nav.push(ArtikelPage, artikelId);
  }
  
  onPageDidEnter() {
    this.app.setTitle('Schedule');
  }

  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData) {
    this.nav.push(ArtikelPage, sessionData);
  }

  addFavorite(slidingItem: ItemSliding, sessionData) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite already added',
        message: 'Would you like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              // they clicked the cancel button, do not remove the session
              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          },
          {
            text: 'Remove',
            handler: () => {
              // they want to remove this session from their favorites
              this.user.removeFavorite(sessionData.name);

              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);

    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);
    }

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
