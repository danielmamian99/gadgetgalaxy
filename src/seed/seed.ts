import { ITable } from '@/interfaces/table.interface'

export enum ERoles {
  CLIENT = 'cliente',
  SELLER = 'vendedor'
}

export interface IAllTablesData {
  results: ITable[]
  count: number
}
export interface IComment {
  id: string
  date: string
  userOwner: IUser
  comment: string
}

export interface ITableInfo {
  id: string
  name: string
  description: string
  date: string
}
export interface IUser {
  rol: ERoles
  date: string
  email: string
  id: string
  name: string
  photo?: string
  tables?: ITableInfo[]
  displayName?: string
}
export interface IOwnerInfo {
  id: string
  name: string
  photo?: string
}

export interface ITableData {
  tableInfo: ITableInfo
  ownerInfo: IUser
  comments: IComment[]
}
export const allTablesData: IAllTablesData = {
  results: [
    {
      id: '1',
      name: 'Compra de Resistor CDMVAF5M36F3150DET para la ciudad de Cali',
      description:
        'Abro este tablero para comprar resistores CDMVAF5M36F3150DET para la ciudad de Cali. Cuando lleguemos a 100 unidades, haremos el pedido.',
      date: '2021-10-10'
    },
    {
      id: '2',
      name: 'Compra de Resistor D2TO035C15R00JRE3 para la ciudad de Bogotá',
      description:
        'Abro este tablero para comprar resistores D2TO035C15R00JRE3 para la ciudad de Bogotá. Cuando lleguemos a 100 unidades, haremos el pedido.',
      date: '2021-10-10'
    },
    {
      id: '3',
      name: 'Compra de Resistor en Mouser para la ciudad de Medellin',
      description:
        'Abro este tablero para comprar resistores con mouser para la ciudad de Medellin. Cuando lleguemos a 500 unidades, la reducción del costo son 30% por pieza.',
      date: '2021-10-10'
    }
  ],
  count: 10000
}
export const tablesPerIdData: ITableData[] = [
  {
    tableInfo: {
      id: '1',
      date: '2021-10-10',
      name: 'Compra de Resistor CDMVAF5M36F3150DET para la ciudad de Cali',
      description:
        'Abro este tablero para comprar resistores CDMVAF5M36F3150DET para la ciudad de Cali. Cuando lleguemos a 100 unidades, haremos el pedido.'
    },
    ownerInfo: {
      id: '4',
      name: 'Daniel Mamian',
      date: '2021-10-10',
      rol: ERoles.CLIENT,
      email: 'danimaster99@gmail.com',
      photo:
        'https://lh3.googleusercontent.com/ogw/AF2bZyjvVApXcx-bMgQBSWCjmWfkoIyYkzigKOY73mxk5M4p5w=s32-c-mo'
    },
    comments: [
      {
        id: '1',
        date: '2021-10-10',
        userOwner: {
          id: '1',
          name: 'Juan Perez',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'juanperez@gmail.com'
        },
        comment:
          'Hola, me gustaría participar en la compra de los resistores. ¿Cómo puedo hacerlo?'
      },
      {
        id: '2',
        date: '2021-10-10',

        userOwner: {
          id: '2',
          name: 'Carlos Rodriguez',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'carlosrodriguez@gmail.com'
        },
        comment:
          'Yo también quiero participar en la compra de los resistores. ¿Cuál es el precio por unidad?'
      },
      {
        id: '3',
        date: '2021-10-10',

        userOwner: {
          id: '3',
          name: 'Maria Perez',
          photo: 'https://media.wiggot.mx/atu3MZC-s.jpg',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'mariaPerez@gmail.com'
        },

        comment: 'Me gustaría saber si el pedido se puede hacer a domicilio.'
      }
    ]
  },
  {
    ownerInfo: {
      id: '4',
      name: 'Daniel Mamian',
      date: '2021-10-10',
      rol: ERoles.CLIENT,
      email: 'danimaster99@gmail.com',
      photo:
        'https://lh3.googleusercontent.com/ogw/AF2bZyjvVApXcx-bMgQBSWCjmWfkoIyYkzigKOY73mxk5M4p5w=s32-c-mo'
    },
    tableInfo: {
      id: '2',
      date: '2021-10-10',
      name: 'Compra de Resistor D2TO035C15R00JRE3 para la ciudad de Bogotá',
      description:
        'Abro este tablero para comprar resistores D2TO035C15R00JRE3 para la ciudad de Bogotá. Cuando lleguemos a 100 unidades, haremos el pedido.'
    },
    comments: [
      {
        id: '4',
        date: '2021-10-10',
        userOwner: {
          id: '1',
          name: 'Juan Perez',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'juanperez@gmail.com'
        },
        comment:
          'Hola, me gustaría participar en la compra de los resistores. ¿Cómo puedo hacerlo?'
      },
      {
        id: '5',
        date: '2021-10-10',
        userOwner: {
          id: '2',
          name: 'Carlos Rodriguez',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'carlosrodriguez@gmail.com'
        },
        comment:
          'Yo también quiero participar en la compra de los resistores. ¿Cuál es el precio por unidad?'
      },
      {
        id: '6',
        date: '2021-10-10',
        userOwner: {
          id: '3',
          name: 'Maria Perez',
          photo: 'https://media.wiggot.mx/atu3MZC-s.jpg',
          date: '2021-10-10',
          rol: ERoles.CLIENT,
          email: 'mariaPerez@gmail.com'
        },

        comment: 'Me gustaría saber si el pedido se puede hacer a domicilio.'
      }
    ]
  }
]
export const usersProfile: IUser[] = [
  {
    id: '4',
    name: 'Daniel Mamian',
    date: '2021-10-10',
    rol: ERoles.CLIENT,
    email: 'danimaster99@gmail.com',
    photo:
      'https://lh3.googleusercontent.com/ogw/AF2bZyjvVApXcx-bMgQBSWCjmWfkoIyYkzigKOY73mxk5M4p5w=s32-c-mo',
    tables: [
      {
        id: '1',
        date: '2021-10-10',
        name: 'Compra de Resistor CDMVAF5M36F3150DET para la ciudad de Cali',
        description:
          'Abro este tablero para comprar resistores CDMVAF5M36F3150DET para la ciudad de Cali. Cuando lleguemos a 100 unidades, haremos el pedido.'
      },
      {
        id: '2',
        date: '2021-10-10',
        name: 'Compra de Resistor D2TO035C15R00JRE3 para la ciudad de Bogotá',
        description:
          'Abro este tablero para comprar resistores D2TO035C15R00JRE3 para la ciudad de Bogotá. Cuando lleguemos a 100 unidades, haremos el pedido.'
      }
    ]
  },
  {
    id: '1',
    name: 'Juan Perez',
    date: '2021-10-10',
    rol: ERoles.CLIENT,
    email: 'juanperez@gmail.com'
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    date: '2021-10-10',
    rol: ERoles.CLIENT,
    email: 'carlosrodriguez@gmail.com'
  },
  {
    id: '3',
    name: 'Maria Perez',
    photo: 'https://media.wiggot.mx/atu3MZC-s.jpg',
    date: '2021-10-10',
    rol: ERoles.CLIENT,
    email: 'mariaPerez@gmail.com'
  }
]
