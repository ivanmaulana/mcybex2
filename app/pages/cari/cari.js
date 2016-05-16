import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the CariPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/cari/cari.html',
})
export class CariPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
