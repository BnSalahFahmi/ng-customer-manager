declare var module: NodeModule;
declare var $: any;

interface NodeModule {
  id: string;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  state: State;
  orders?: Order[];
  orderTotal?: number;
  latitude?: number;
  longitude?: number;
}

interface State {
  abbreviation: string;
  name: string;
}

interface Order {
  productName: string;
  itemCost: number;
}

type DisplayMode = 'CARD' | 'GRID';

interface DataInfo {
  customersCount: number;
  ordersCount: number;
}

interface MapDataPoint {
  longitude: number;
  latitutde: number;
  markerText?: string;
}
