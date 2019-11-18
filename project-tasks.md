Initialization Endpoint
- curl -X GET -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/
Movement Endpoint
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"direction":"n"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/move/
Pickup Treasure:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/take/
Drop Treasure Endpoint:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" -d '{"name":"treasure"}' https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/
Check Status/Inventory:
- curl -X POST -H 'Authorization: Token 7a375b52bdc410eebbc878ed3e58b2e94a8cb607' -H "Content-Type: application/json" https://lambda-treasure-hunt.herokuapp.com/api/adv/status/
Examine players/items:
- 

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