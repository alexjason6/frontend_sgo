import PropTypes from 'prop-types';

export default function checkStatus(vehicle) {
  if (vehicle.status === 1) {
    return 'Ativo';
  } if (vehicle.status === 2) {
    return 'Inativo';
  }
  return 'Inadimplente';
}

checkStatus.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number,
    protocol: PropTypes.string,
    imei: PropTypes.string,
    command_update: PropTypes.string,
    gps: PropTypes.string,
    date_device: PropTypes.string,
    time_device: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    speed: PropTypes.string,
    heading: PropTypes.string,
    sensors: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })),
    signal_gps: PropTypes.string,
    battery: PropTypes.string,
    fuel: PropTypes.string,
    odometer: PropTypes.string,
    altitude: PropTypes.string,
    power: PropTypes.string,
    numb_satelites: PropTypes.string,
    placa: PropTypes.string,
    chassi: PropTypes.string,
    renavam: PropTypes.string,
    montadora: PropTypes.string,
    modelo: PropTypes.string,
    ano: PropTypes.string,
    cor: PropTypes.string,
    tipo: PropTypes.string,
    endereco: PropTypes.string,
    timestamp: PropTypes.string,
    tail: PropTypes.arrayOf(PropTypes.shape({ latitude: PropTypes.string, longitude: PropTypes.string })),
    id_equipamento: PropTypes.number,
  }).isRequired,
};
