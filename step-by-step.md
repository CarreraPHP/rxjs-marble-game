## wat to do next?
1. create another grid array for color.
2. bind the color to the grid array ngFor.
3. use EndWith for static cells, for which the tetrics has reached.
4. create Tetris Structure for each RXJS operator.
5. figure out collision & physics to place the structure one on top of another.
6. when the static cells with the structure reaches the top. End Game.

## Commands
```ng new rxjs-marble-game --style scss```

```ng add @angular/material``` (Provides question to add "Hammerjs" & "@angular/animations")

```ng g m game --module app --routing --routing-scope --flat false```

```ng g c game/canvas --flat false --module game --prefix rmg --export --change-detection OnPush```

```ng g c game/grid --flat false --module game --prefix rmg --export --change-detection OnPush```

```ng g c game/pad --flat false --module game --prefix rmg --export --change-detection OnPush```

```ng g s app```

```ng g s game/engine```

```ng g s game/canvas/canvas```

```ng g s game/color```


