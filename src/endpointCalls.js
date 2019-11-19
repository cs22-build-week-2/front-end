import axiosWithAuth from './axiosWithAuth';

export const initialize = () => {
  return axiosWithAuth().get('/adv/init/');
};

// {"direction":"n"}
export const move = direction => {
  return axiosWithAuth().post('/adv/move/', direction);
};

// {"name":"treasure"}
export const pickupTreasure = nameOfTreasure => {
  const treasure = { name: nameOfTreasure };
  return axiosWithAuth().post('/adv/take/', treasure);
};

// {"name":"treasure"}
export const dropTreasure = nameOfTreasure => {
  const treasure = { name: nameOfTreasure };
  return axiosWithAuth().post('/adv/drop/', treasure);
};

export const checkStatus = () => {
  return axiosWithAuth().post('/adv/status/');
};

// {"name":"[NAME OF ITEM OR PLAYER]"}
export const checkItemOrPlayer = nameOfItemOrPlayer => {
  return axiosWithAuth().post('/adv/examine/', nameOfItemOrPlayer);
};

// {"name":"[NAME OF WEARABLE]"}
export const wearEquipment = nameOfEquipment => {
  return axiosWithAuth().post('/adv/wear/', nameOfEquipment);
};

// {"name":"[NAME OF WEARABLE]"}
export const unwearEquipment = nameOfEquipment => {
  return axiosWithAuth().post('/adv/undress/', nameOfEquipment);
};

// {"direction":"n"}
export const flyToDirection = direction => {
  axiosWithAuth()
    .post('/adv/fly/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"direction":"n", "num_rooms":"5", "next_room_ids":"10,19,20,63,72"}
export const dashToRoom = path => {
  axiosWithAuth()
    .post('/adv/dash/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[ITEM_NAME]"}
export const giveGhostItem = nameOfItem => {
  axiosWithAuth()
    .post('/adv/carry/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const takeGhostItem = () => {
  axiosWithAuth()
    .post('/adv/receive')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const seeLambdaCoinBalance = () => {
  axiosWithAuth()
    .get('/bc/get_balance/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NAME OF ITEM]"}
export const transmogrifyLambdaCoins = nameOfItem => {
  axiosWithAuth()
    .post('/adv/transmogrify')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"direction":"s", "next_room_id": "0"}
// export const wiseMove = directionId => {
//   axiosWithAuth()
//     .post("/adv/move/")
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };

// {"name":"treasure"}
export const sellTreasure = nameOfTreasure => {
  const treasure = { name: nameOfTreasure };
  return axiosWithAuth().post('/adv/sell/', treasure);
};

// {"name":"treasure", "confirm":"yes"}
export const confirmSellTreasure = nameOfTreasure => {
  const treasure = { name: nameOfTreasure, confirm: 'yes' };
  return axiosWithAuth().post('/adv/sell/', treasure);
};

// {"name":"[NEW NAME]"}
export const changeName = name => {
  const newName = { name: name, confirm: 'aye' };
  return axiosWithAuth().post('/adv/change_name/', newName);
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
};

export const pray = () => {
  axiosWithAuth()
    .post('/adv/pray/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"proof":new_proof}
export const mineCoin = proof => {
  axiosWithAuth()
    .post('/bc/mine/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const getLastProof = () => {
  axiosWithAuth()
    .get('/bc/last_proof')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
