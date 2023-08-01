import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPosts } from 'src/app/core/models/posts.model';
import { UtilService } from 'src/app/core/services/util.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { ApiPlaceholderService } from 'src/app/core/services/api-placeholder.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() post : IPosts = {};



  constructor(private util : UtilService,private modalCtrl: ModalController,private apiPlaceholder : ApiPlaceholderService ) { 
  }
  

  ngOnInit() {}
  async options() {
    const actionSheet = await this.util.showActionSheet();
    switch (actionSheet.action) {
      case "edit":
        this.editPost();
        break;
     case "delete":
        this.deletePost();
        break;
      default:

        break;
    }
  }

  async editPost(){
    const modal = await this.modalCtrl.create({
      component: AddPostComponent,
      componentProps: { 
        post: this.post,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //  debugger
    // }
  }

  deletePost(){
    this.apiPlaceholder.deletePosts(this.post).subscribe(c=>{
      this.util.showMessage("Operacion Exitosa","Se elimino el post")
    })
  }

}
