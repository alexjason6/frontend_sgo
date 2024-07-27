export interface Positions {
  id: number
  protocol?: string
  imei?: string
  command_update?: string
  gps?: string
  time_device?: string
  latitude?: string
  longitude?: string
  speed?: string
  heading?: string
  sensors: [
    {
      name: string
      value: number
    },
  ]
  signal_gps?: string
  battery?: string
  fuel?: string
  odometer?: string
  altitude?: string
  power?: string
  numb_satelites?: string
  placa?: string
  chassi?: string
  renavam?: string
  montadora?: string
  modelo?: string
  ano?: string
  cor?: string
  tipo?: string
  endereco?: string
  id_equipamento?: string
  date_device?: string
  timestamp?: string
  speed_limit?: string
  tail: [
    {
      latitude: string
      longitude: string
    },
  ]
  last_motion_position: string
}
