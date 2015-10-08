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
        - Initializes new player
        - Receives player's state
        - Broadcasts all player states to everyone
    - Frontend
        - Sends state parts to server with own generated GUID
        - Receives all player states from server
        - Filters out own state from received messages
        - Displays multiple other player states received from server









