import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  

  constructor() { }

  async setName ( key : string,value : string  ) {
    await Preferences.set({
      key: environment.prefix + key,
      value: value,
    });
  };
  
 async checkName  (key : string )  {
    const { value } = await Preferences.get({ key: environment.prefix +key });
  
    return value;
  };
  
async removeName  (key : string )  {
    await Preferences.remove({ key: environment.prefix + key });
  };

}
