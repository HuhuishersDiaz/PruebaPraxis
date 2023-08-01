import { IDropDownOption } from "./dropDownOption.model";

export interface IUsers{
    nombre? : string,
    apellidos? : string,
    edad? : number,
    genero? : string,
    pasatiempos?: IDropDownOption[],
    opciones?: string,
    foto? : string,
    ubicacion ?: {

        lat : number,
        long  : number,
    }
}