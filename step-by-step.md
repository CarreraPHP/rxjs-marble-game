ng new rxjs-marble-game --style scss
ng add @angular/material (Provides question to add "Hammerjs" & "@angular/animations")
ng g m game --module app --routing --routing-scope --flat false
ng g c game/canvas --flat false --module game --prefix rmg --export --change-detection OnPush
ng g c game/grid --flat false --module game --prefix rmg --export --change-detection OnPush
ng g s app