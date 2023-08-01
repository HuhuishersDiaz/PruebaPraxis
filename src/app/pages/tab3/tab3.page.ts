import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/core/models/users.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { UtilService } from 'src/app/core/services/util.service';
import { ModalController } from '@ionic/angular';
import { UserComponent } from 'src/app/shared/user/user.component';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  listUsers: IUsers[] = [];

  constructor(private storage : StorageService,private modalCtrl :ModalController) { }
 
  ngOnInit(): void {
    
    this.LoadInfo();
  }
  ionViewDidEnter(){
    this.LoadInfo();
  }
async LoadInfo(){
  let data = await  this.storage.checkName("list")
  this.listUsers = JSON.parse(data || "[]");
}



 async  seeUser(item : IUsers){
    const modal = await this.modalCtrl.create({
      component: UserComponent,
      componentProps :{
        user : item
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }


}
