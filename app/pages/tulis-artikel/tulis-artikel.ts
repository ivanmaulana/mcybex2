import {Page, NavController, Loading, Storage, SqlStorage, Toast} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from 'angular2/common';


@Page({
  templateUrl: 'build/pages/tulis-artikel/tulis-artikel.html',
})
export class TulisArtikelPage {
  isi_artikel: string;
  judul_artikel: string;
  response: any;
  creds: string;
  
  constructor(public http: Http, public nav: NavController) {
    this.response = 'test';
    
  }
  
  kirim(http: Http){
      this.creds = JSON.stringify({isi_artikel: this.isi_artikel, judul_artikel: this.judul_artikel});
      this.http.post("http://210.16.120.17/api/tulis_artikel.php", this.creds)
          .subscribe(data => {          
                  this.response = data._body;
      });
  }
  
}
