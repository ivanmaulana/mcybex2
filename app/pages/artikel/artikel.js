import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ArtikelPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/artikel/artikel.html',
})
export class ArtikelPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
