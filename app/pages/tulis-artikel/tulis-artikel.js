import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the TulisArtikelPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tulis-artikel/tulis-artikel.html',
})
export class TulisArtikelPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
