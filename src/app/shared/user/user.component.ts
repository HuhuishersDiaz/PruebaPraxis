import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUsers } from 'src/app/core/models/users.model';
import { Directory, Filesystem } from "@capacitor/filesystem";
import { UtilService } from 'src/app/core/services/util.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {
  
  @Input("user") user  : IUsers;
  constructor(private modalCtrl : ModalController,private util : UtilService) {
    this.user = { apellidos : "",edad : 0 , foto : "",genero : "",nombre : "",pasatiempos : [],ubicacion :{lat : 0,long : 0 }};
   }

  ngOnInit() {

  }

  Close(){
    return  this.modalCtrl.dismiss(null,'cancel');
   }

   async savePicture(item : IUsers) {
    if (item.foto) {
      const fotoBase64 = await this.convertImagetoBase64(item.foto);
      const nombreArchivo = `${item.nombre}.jpeg`; // Cambia el nombre del archivo según tus necesidades



      await Filesystem.writeFile({
        path: nombreArchivo,
        data: fotoBase64,
        directory: Directory.ExternalStorage, // Cambia el directorio si deseas almacenar en otro lugar
      });

     this.util.showMessage("Atencion",'Foto guardada en el dispositivo.');
    } else {
      this.util.showMessage("Atencion",'No hay foto para guardar.');
    }
  }

  async convertImagetoBase64(webPath : string): Promise<string> {
    const file = await fetch(webPath);
    const blob = await file.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
