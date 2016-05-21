import {Page, NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';

@Page({
  templateUrl: 'build/pages/pakar/pakar.html',
})
export class PakarPage {
  constructor(public nav: NavController) {
    
    
  }
  
  profile() {
    this.nav.push(ProfilePage);
  }
}
