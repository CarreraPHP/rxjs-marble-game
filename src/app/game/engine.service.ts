import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";

export enum GameStatus {
  START,
  STARTED,
  END,
  ENDED
}

/**
 * actor is the object flows from top to bottom in the canvas.
 */
export interface SerialisedActor {
  struct: string;
  slice: number;
}

export interface Actor {
  struct: string[][];
}

export class currentActor implements Actor {
  constructor(public struct: string[][]) {}

  static importFromSerialised(sa: SerialisedActor) {
    const ret: Actor = { struct: [] };
    let row = [];
    for (let i = 0; i < sa.struct.length; i++) {
      row = [...row, sa.struct[i]];
      // it is expected to value the string length in the multiples of slice values.
      if ((i + 1) % sa.slice === 0) {
        ret.struct = [...ret.struct, [...row]];
        row = [];
      }
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class EngineService {
  _gameStatus: ReplaySubject<GameStatus> = new ReplaySubject(1);

  get gameStatusObservable(): Observable<GameStatus> {
    return this._gameStatus.asObservable();
  }

  constructor() {}

  public startGame() {
    this._gameStatus.next(GameStatus.START);
  }

  public endGame() {
    this._gameStatus.next(GameStatus.END);
  }
}
