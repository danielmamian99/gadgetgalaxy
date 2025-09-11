export interface IGadgetgalaxyComponents {
  count: number
  next: string
  previous: null
  results: IComponent[]
}

export interface IComponent {
  id: number
  proveedor: IProveedor
  proveedor_name: string
  price_breaks: string
  url: string
  referencia: string
  precio: string
  nombre: EResultName
  imageUrl: string
  image_url: string
  datasheetUrl: string
  datasheet_url: string
  priceBreaks: string
  stockNumber: number
  stock_number: number
  quantity: number
}

export enum EResultName {
  Resistor = 'Resistor',
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
  Cali = 'cali',
}

export enum ECountry {
  Colombia = 'Colombia',
}

export enum EProveedorNombre {
  Mouser = 'Mouser',
}
