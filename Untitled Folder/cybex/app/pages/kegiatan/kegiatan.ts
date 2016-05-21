import {Page, NavController} from 'ionic-angular';
import {KegiatanDetailPage} from '../kegiatan-detail/kegiatan-detail';

@Page({
  templateUrl: 'build/pages/kegiatan/kegiatan.html',
})
export class KegiatanPage {
  constructor(public nav: NavController) {
    
    
  }
  
  detail(){
    this.nav.push(KegiatanDetailPage);
  }
}
