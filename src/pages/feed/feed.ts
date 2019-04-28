import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  public page = 1;
  public infinityScroll;

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

  carregarFilmes(novaPagina: boolean = false){
    this.abreCarregando();
    this.movieProvider.getLatestMoovies(this.page).subscribe(
      data=>{
          const response = (data as any) // casting de data para acessar _body;
          console.log (response); 
          
          if (novaPagina){// nova página só adiciona filmes e fecha o infinityScroll
            this.lista_filmes = this.lista_filmes.concat(response.results);
            this.infinityScroll.complete();
            console.log("nova página:" + novaPagina);
          }else{
            this.lista_filmes = response.results;
          }

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
 
  /**
   * 
   * @param filme 
   * Recebe o filme clicado no feed e passa o seu id para a página detalhes
   */
  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.infinityScroll = infiniteScroll;
    this.carregarFilmes(true); //carrega filmes em nova página, bateu no infinity

    infiniteScroll.complete();

  }

}
