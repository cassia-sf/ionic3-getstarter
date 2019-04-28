import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MoovieProvider
  ]
})
export class FeedPage {
  
  public objeto_feed = {
    titulo : "Cássia Freitas",
    data : "November 5, 1955",
    descricao : "Estou criando um app incrível em Ionic v3",
    qntd_likes : 12,
    qntd_comments : 4,
    time_comment : "11h ago"
  }

  public lista_filmes = new Array<any>();
  public loader: any;
  public refresher: any;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."      
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FeedPage'); //roda cada vez que entra
    this.carregarFilmes();
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad FeedPage'); //roda uma vez
  }

  carregarFilmes(){
    this.abreCarregando();
    this.movieProvider.getLatestMoovies().subscribe(
      data=>{
          const response = (data as any) // casting de data para acessar _body;
          console.log (response); 
          this.lista_filmes = response.results;
          this.fechaCarregando();

          if (this.isRefreshing){
            this.refresher.complete();
            this.isRefreshing =false;
          }
      }, error => {
          console.log (error);
          this.fechaCarregando();

          if (this.isRefreshing){
            this.refresher.complete();
            this.isRefreshing =false;
          }
      }      
    )    
  }
}
