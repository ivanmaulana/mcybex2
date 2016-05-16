import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the TulisDiskusiPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tulis-diskusi/tulis-diskusi.html',
})
export class TulisDiskusiPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
