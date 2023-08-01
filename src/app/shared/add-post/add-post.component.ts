import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IPosts } from 'src/app/core/models/posts.model';
import { ApiPlaceholderService } from 'src/app/core/services/api-placeholder.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent  implements OnInit {

  @Input("post") post  : IPosts;
  
  frmAdd = new FormGroup({
    title : new FormControl("",[Validators.required]),
    body : new FormControl("",[Validators.required]),
    userId : new FormControl(1),
    id : new FormControl(0)
  })
  titleModal : string = "Agregar Post";

  constructor(private apiPlaceholder : ApiPlaceholderService,private modalCtrl: ModalController,private utilServ : UtilService ) {
    this.post = {};
   }

  ngOnInit() {

    console.log(this.post);
    if(this.post.id){
      this.titleModal = "Editar Post";
    }

    this.frmAdd.patchValue(this.post)

  }

  submitForm(){

    if(this.frmAdd.valid){
      if(this.frmAdd.value.id == 0){

        this.apiPlaceholder.savePosts(this.frmAdd.value as IPosts).subscribe(c=>{
          console.log(c);
          this.utilServ.showMessage("Operación Exitosa","Post Agregado")
          return this.modalCtrl.dismiss(null, 'confirm');
        });
      }else{
        this.apiPlaceholder.editPosts(this.frmAdd.value as IPosts).subscribe(c=>{
          console.log(c);
          this.utilServ.showMessage("Operación Exitosa","Post Actualizado")
          return this.modalCtrl.dismiss(null, 'confirm');
        });
      }
    }else{
      this.utilServ.showMessage("Atención","Completa todos los campos")
    }
  }

  Close(){
   return  this.modalCtrl.dismiss(null,'cancel');
  }

}
