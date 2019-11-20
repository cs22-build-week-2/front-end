import { axiosWithAuth } from './axiosWithAuth';

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
  return axiosWithAuth().post('/adv/fly/', direction);
};

// {"direction":"n", "num_rooms":"5", "next_room_ids":"10,19,20,63,72"}
export const dashToRoom = path => {
  let dashPath = { next_room_ids: path.room_path, direction: path.direction };
  dashPath['num_rooms'] = path.room_path.split(',').length;
  return axiosWithAuth().post('/adv/dash/', dashPath);
};

// {"name":"[ITEM_NAME]"}
export const giveGhostItem = nameOfItem => {
  return axiosWithAuth().post('/adv/carry/', { name: nameOfItem });
};

export const takeGhostItem = () => {
  return axiosWithAuth().post('/adv/receive');
};

export const seeLambdaCoinBalance = () => {
  return axiosWithAuth().get('/bc/get_balance/');
};

// {"name":"[NAME OF ITEM]"}
export const transmogrifyLambdaCoins = nameOfItem => {
  return axiosWithAuth().post('/adv/transmogrify', { name: nameOfItem });
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
  return axiosWithAuth().post('/adv/change_name/', name);
};

export const pray = () => {
  return axiosWithAuth().post('/adv/pray/');
};

// {"proof":new_proof}
export const mineCoin = proof => {
  axiosWithAuth()
    .post('/bc/mine/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const getLastProof = () => {
  return axiosWithAuth().get('/bc/last_proof');
};
