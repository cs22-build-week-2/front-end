import { axiosWithAuth } from "./axiosWithAuth";

export const initialize = () => {
  return axiosWithAuth().get("/adv/init/");
};

// {"direction":"n"}
export const move = direction => {
  return axiosWithAuth().post("/adv/move/", direction);
};

// {"name":"treasure"}
export const pickupTreasure = nameOfTreasure => {
  axiosWithAuth()
    .post("/adv/take/", nameOfTreasure)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"treasure"}
export const dropTreasure = nameOfTreasure => {
  axiosWithAuth()
    .post("/adv/drop/", nameOfTreasure)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const checkStatus = () => {
  axiosWithAuth()
    .post("/adv/status/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NAME OF ITEM OR PLAYER]"}
export const checkItemOrPlayer = nameOfItemOrPlayer => {
  axiosWithAuth()
    .post("/adv/examine/", nameOfItemOrPlayer)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NAME OF WEARABLE]"}
export const wearEquipment = nameOfEquipment => {
  axiosWithAuth()
    .post("/adv/wear/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NAME OF WEARABLE]"}
export const unwearEquipment = nameOfEquipment => {
  axiosWithAuth()
    .post("/adv/undress/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"direction":"n"}
export const flyToDirection = direction => {
  axiosWithAuth()
    .post("/adv/fly/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"direction":"n", "num_rooms":"5", "next_room_ids":"10,19,20,63,72"}
export const dashToRoom = path => {
  axiosWithAuth()
    .post("/adv/dash/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[ITEM_NAME]"}
export const giveGhostItem = nameOfItem => {
  axiosWithAuth()
    .post("/adv/carry/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const takeGhostItem = () => {
  axiosWithAuth()
    .post("/adv/receive")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const seeLambdaCoinBalance = () => {
  axiosWithAuth()
    .get("/bc/get_balance/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NAME OF ITEM]"}
export const transmogrifyLambdaCoins = nameOfItem => {
  axiosWithAuth()
    .post("/adv/transmogrify")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"direction":"s", "next_room_id": "0"}
export const wiseMove = directionId => {
  axiosWithAuth()
    .post("/adv/move/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"treasure"}
export const sellTreasure = nameOfTreasure => {
  axiosWithAuth()
    .post("/adv/sell/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"treasure", "confirm":"yes"}
export const confirmSellTreasure = confirm => {
  axiosWithAuth()
    .post("/adv/sell/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"name":"[NEW NAME]"}
export const changeName = name => {
  axiosWithAuth()
    .post("/adv/change_name/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const pray = () => {
  axiosWithAuth()
    .post("/adv/pray/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// {"proof":new_proof}
export const mineCoin = proof => {
  axiosWithAuth()
    .post("/bc/mine/")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const getLastProof = () => {
  axiosWithAuth()
    .get("/bc/last_proof")
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
