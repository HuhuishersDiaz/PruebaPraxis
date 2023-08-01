import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import {  IDropDownOption } from 'src/app/core/models/dropDownOption.model';
import { IUsers } from 'src/app/core/models/users.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { UtilService } from 'src/app/core/services/util.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  pasatiemposList: IDropDownOption[] = [{ checked : false, value:'Deportes'}, { checked : false, value:'Leer'},{ checked : false, value: 'Cine'}, { checked : false, value:'Viajar'}, { checked : false, value:'Pintar'}, { checked : false, value:'Cantar'}];
  listUsers : IUsers[] = [];

  frmAdd = new FormGroup({
      nombre : new FormControl("",[Validators.required]),
      apellidos : new FormControl("",[Validators.required]),
      edad : new FormControl<Number>( 0,Validators.required),
      genero : new FormControl("",[Validators.required]),
      pasatiempos: new FormControl<IDropDownOption[]>([]),
      foto : new FormControl(""),
      ubicacion : new FormGroup({
        lat : new FormControl(0,[Validators.required]),
        long  : new FormControl(0,[Validators.required]),
      }),
  })
  foto: string  = "";
  lat: number = 0;
  long: number = 0;
  constructor(private storage : StorageService,private util : UtilService) { }

   async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    this.foto = imageUrl || "";
   this.frmAdd.value.foto = this.foto;
    
  };

  pasatiempo(e :any,item : IDropDownOption){

  let index = this.pasatiemposList.findIndex(c=> c== item);
  this.pasatiemposList[index].checked = e.currentTarget.checked;
  this.frmAdd.controls.pasatiempos.setValue(this.pasatiemposList.filter(c=> c.checked == true));
     
  }

  ngOnInit(): void {
    Geolocation.requestPermissions().then(c=>{
      console.log(c);
      this.getCurrentPosition();
    })
    this.frmAdd.reset();
    this.getCurrentPosition();

  }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
  
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
  this.frmAdd.controls.ubicacion.setValue({lat : this.lat , long :  this.long})
  };

  async save(){

    if(this.frmAdd.valid){

      let data = await  this.storage.checkName("list")
      
   this.listUsers = JSON.parse(data || "[]");

   this.listUsers.push(this.frmAdd.value as IUsers);

   this.storage.setName("list",JSON.stringify(this.listUsers));
   this.util.showMessage("Operacion Exitosa","Se agrego un nuevo registro");
   this.foto = "";
   this.pasatiemposList.map(c=> c.checked = false);
   this.frmAdd.reset();
   this.getCurrentPosition();
  }else{ 
    this.util.showMessage("Atención","No se pudo agregar");
  }
  }
}
