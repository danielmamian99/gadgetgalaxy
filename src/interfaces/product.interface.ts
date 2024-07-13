export interface IGadgetgalaxyComponents {
  count: number
  next: string
  previous: null
  results: IComponent[]
}

export interface IComponent {
  id: number
  proveedor: IProveedor
  url: string
  referencia: string
  precio: string
  nombre: EResultName
  imageUrl: string
  datasheetUrl: string
}

export enum EResultName {
  Resistor = 'Resistor'
}

export interface IProveedor {
  id: number
  nombre: EProveedorNombre
  url: string
  direccion: string
  country: ECountry
  city: ECity
}

export enum ECity {
  Cali = 'cali'
}

export enum ECountry {
  Colombia = 'Colombia'
}

export enum EProveedorNombre {
  Mouser = 'Mouser'
}
