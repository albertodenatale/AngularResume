import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as MainActions from '../reducers/actions';
import { ChatService } from './chat.service';
import { AppState } from '../reducers/reducers';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  
  sendMessage$ = createEffect(() => 
    this.actions$.pipe(
      ofType<MainActions.SendChatMessage>(MainActions.SEND_CHAT_MESSAGE),
      mergeMap(action => 
        this.chatService.sendMessage(action.payload).pipe(
          map(response => new MainActions.ChatMessageReceived(response)),
          catchError(error => {
            console.error('Error sending message:', error);
            return of(new MainActions.ChatMessageError(error || {}));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private chatService: ChatService
  ) { }
} 