import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EditService {

  private newPositionSource = new Subject<string[]>();

  newPosition$ = this.newPositionSource.asObservable();

  setNewPosition(x: string, y: string) {
    this.newPositionSource.next([x, y]);
  }

  hide() {
    this.newPositionSource.next(null);
  }

}
