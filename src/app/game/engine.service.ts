import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export enum GameStatus {
  START,
  STARTED,
  END,
  ENDED
}

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  _gameStatus:ReplaySubject<GameStatus> = new ReplaySubject(1);

  get gameStatusObservable(): Observable<GameStatus> {
    return this._gameStatus.asObservable();
  }

  constructor() { }

  public startGame() {
    this._gameStatus.next(GameStatus.START);
  }

  public endGame() {
    this._gameStatus.next(GameStatus.END);
  }
}
