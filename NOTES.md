# Features
- Healthy amount of animation effects
- Sound Effects

# AppView Structure:
```
<App>
    <Snake body={this.props.body} />
    <Food position={this.props.foodPosition} />
</App>
```

# SnakeView Structure:
```
<Segment position={this.props.position} />
```

# Actions:
- Move
- Change direction
- Die (Collide?)
- Grow



#2
- Collision detection
- Multiplayer
    - Server
        - w Initializes new player
        - w Receives player's state
        - w Broadcasts all player states to everyone
        - Spawns food
        - Food eat detection
        - Collision detection
    - Frontend
        - w Sends state parts to server with own generated GUID
        - w Receives all player states from server
        - w Displays multiple other player states received from server









