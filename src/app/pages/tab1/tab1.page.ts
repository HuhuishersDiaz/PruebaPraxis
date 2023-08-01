import { Component, OnInit } from '@angular/core';
import { IPosts } from 'src/app/core/models/posts.model';
import { ApiPlaceholderService } from 'src/app/core/services/api-placeholder.service';
import { from, } from 'rxjs'
import { ModalController } from '@ionic/angular';
import { AddPostComponent } from 'src/app/shared/add-post/add-post.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  data : IPosts[] = [];
  currentPage : number = 1;
  postsPerPage : number  = 10;
  loading: boolean = true;

  constructor(private apiPlaceholcer : ApiPlaceholderService,private modalCtrl: ModalController) {}


  ngOnInit(): void {
    this.loadData();
  }

  loadMoreData(event: any){
    this.loadData();

    event.target.complete();
  }
  loadData(){
    this.loading = true;
    console.log(this.currentPage,this.postsPerPage);
    this.apiPlaceholcer.getPosts(this.currentPage,this.postsPerPage).subscribe(c=>{
      this.data.push(...c)
      console.log(this.data);
      this.loading = false;
    })
    this.currentPage++;
  }

 async add(){
      const modal = await this.modalCtrl.create({
        component: AddPostComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
  
      // if (role === 'confirm') {
      //  debugger
      // }
  }
}


