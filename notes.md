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
<Part position={this.props.position} />
```

# Actions:
- Move
- Change direction
- Die (Collide?)
- Grow