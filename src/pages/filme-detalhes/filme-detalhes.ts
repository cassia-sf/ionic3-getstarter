import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
})
export class FilmeDetalhesPage {

  public filme;
  public filme_id;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmeDetalhesPage');
  }

  /**
   * Ao entrar na página recebe os parâmetros enviados
   * via NavParams
   */
  ionViewDidEnter(){
    console.log('ionViewDidEnter FilmeDetalhesPage');
    this.filme_id = this.navParams.get("id");
    console.log("filme id recebido:" + this.filme_id);
    this.movieProvider.getMovieDetails(this.filme_id).subscribe(
      data=>{
        this.filme = data;
    }, error =>{
        console.log(error);
    })
  }

}
