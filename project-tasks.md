Initialization Endpoint
- curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/

Movement Endpoint
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"direction":"n"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/move/

Pickup Treasure:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/take/

Drop Treasure Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/

Check Status/Inventory Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/status/

Examine players/items Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[NAME OF ITEM OR PLAYER]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/

Wear Equipment Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[NAME OF WEARABLE]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/

Unequip Equipment Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[NAME OF WEARABLE]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/undress/

If you have flight Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"direction":"n"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/

If you master dash Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"direction":"n", "num_rooms":"5", "next_room_ids":"10,19,20,63,72"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/dash/

If you find a ghostly companion endpoint, let ghost hold heaviest item:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[ITEM_NAME]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/carry/

If you find a ghostly companion endpoint, take heaviest item from ghost:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/receive/

Get lambda coin balance endpoint:
- curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/

Transmogrify endpoint with Lambda Coins:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[NAME OF ITEM]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/transmogrify/

Task:
1. Build map
- Cooldown 15.0s when moving
- If we know direction/id of room we're moving to, can use wise explorer endpoint
    - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"direction":"s", "next_room_id": "0"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/move/

2. Sell treasure
- Endpoint
    - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/
- Confirm sell
    - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure", "confirm":"yes"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/

3. Find name changer (requires 1000 coins)
- Endpoint
    - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"[NEW NAME]"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/

4. Find a shrine
- Pray
    - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/

5. Seek out wishing well
- Find wishing well
- Get clue to location of Lambda Coin
    - Mine with valid proof
    - Mine endpoint:
        - curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"proof":new_proof}' https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/

6. Find valid proof
- To get last proof
    - curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/
- Use current difficulty level to find # of leading zeros needed