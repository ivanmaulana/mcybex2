import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the PakarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/pakar/pakar.html',
})
export class PakarPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
