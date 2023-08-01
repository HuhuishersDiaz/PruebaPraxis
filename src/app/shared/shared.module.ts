import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [AddPostComponent,CardComponent,UserComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports : [AddPostComponent,CardComponent,UserComponent]
})
export class SharedModule { }
