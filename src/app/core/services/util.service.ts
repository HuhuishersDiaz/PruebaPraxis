import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private alertCtrl : AlertController,private actionSheetCtrl : ActionSheetController) { }


  async showMessage(title: string , message : string ){

    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
async showActionSheet(){
 const actionSheet =  await this.actionSheetCtrl.create({
    header: 'Actions',
    buttons: [
      {
        text: 'Eliminar',
        data: {
          action: 'delete',
        },
      },
      {
        text: 'Editar',
        data: {
          action: 'edit',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  });

   await actionSheet.present();
return (await actionSheet.onDidDismiss()).data
}



}
