import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/reducers';
import * as Actions from '../reducers/actions';
import { first } from 'rxjs/operators';

interface ChatMessage {
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  template: `
    <div class="chat-container" [style.width.px]="asideWidth">
      <div class="messages-counter">
        {{ messagesUsed$ | async }}/{{ maxMessagesPerDay }} messages today
      </div>
      <div class="messages-container" #scrollContainer>
        <div *ngFor="let message of messages$ | async" 
             [ngClass]="{'message': true, 'user-message': message.sender === 'user', 'agent-message': message.sender === 'agent'}">
          <div class="message-content">
            <pre>{{ message.text }}</pre>
            <small class="timestamp">{{ message.timestamp | date:'shortTime' }}</small>
          </div>
        </div>
        
        <div *ngIf="loading$ | async" class="message agent-message">
          <div class="message-content">
            <p>...</p>
          </div>
        </div>
      </div>
      
      <div class="input-container">
        <div class="resize-handle"></div>
        <div class="textarea-wrapper">
          <div class="character-counter" [class.exceeded]="isLengthExceeded">
            {{ newMessage.length }}/{{ maxQuestionLength }}
          </div>
          <textarea 
            [(ngModel)]="newMessage" 
            (keyup.enter)="sendMessage()"
            (ngModelChange)="onMessageChange($event)"
            placeholder="Type your message..."
            class="message-input"
            [class.exceeded]="isLengthExceeded"
            [disabled]="(loading$ | async) || (isCompleted$ | async)"
            rows="3"></textarea>
          <button (click)="sendMessage()" 
                  class="send-button"
                  [disabled]="(loading$ | async) || isLengthExceeded || (isCompleted$ | async)"
                  [class.disabled]="(loading$ | async) || isLengthExceeded || (isCompleted$ | async)">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: white;
      border-radius: 8px;
      position: fixed;
      overflow: auto;
    }

    :host-context(.darkModeOn) .chat-container {
      background-color: #333;
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
      -ms-overflow-style: auto;
    }

    :host-context(.darkModeOn) .messages-container {
      scrollbar-color: #90caf9 #333;
    }

    .message {
      display: flex;
      margin-bottom: 0.5rem;
    }

    .message-content {
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      max-width: 70%;
      word-wrap: break-word;
    }

    .user-message {
      justify-content: flex-end;
    }

    .user-message .message-content {
      background-color: #0056b3;
      color: white !important;
      
      pre {
        color: white !important;
      }
    }

    :host-context(.darkModeOn) .user-message .message-content {
      background-color: #4590ce;
    }

    .agent-message .message-content {
      background-color: #e9ecef;
      color: #212529 !important;
    }

    :host-context(.darkModeOn) .agent-message .message-content {
      background-color: #444;
      color: #bbe0ff !important;
    }

    .timestamp {
      display: block;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      opacity: 0.7;
    }

    :host-context(.darkModeOn) .timestamp {
      color: #90caf9;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      padding: 0;
      background-color: white;
      border-top: 1px solid #dee2e6;
      overflow: hidden;
    }

    :host-context(.darkModeOn) .input-container {
      background-color: #333;
      border-top-color: #4590ce;
    }

    .resize-handle {
      height: 25px;
      width: 100%;
      cursor: row-resize;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .resize-handle::before {
      content: '';
      width: 30px;
      height: 4px;
      background-color: #dee2e6;
      border-radius: 2px;
      transition: background-color 0.2s;
    }

    :host-context(.darkModeOn) .resize-handle::before {
      background-color: #4590ce;
    }

    .resize-handle:hover::before {
      background-color: #0056b3;
    }

    :host-context(.darkModeOn) .resize-handle:hover::before {
      background-color: #90caf9;
    }

    .textarea-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      padding: 0 1rem 1rem 1rem;
    }

    .message-input {
      flex: 1;
      padding: 1rem 3.5rem 1rem 1rem;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      outline: none;
      font-size: 1rem;
      resize: none;
      min-height: 60px;
      line-height: 1.5;
      background-color: white;
      color: #212529;
    }

    :host-context(.darkModeOn) .message-input {
      background-color: #444;
      border-color: #4590ce;
      color: white;
    }

    .message-input:focus {
      border-color: #0056b3;
    }

    :host-context(.darkModeOn) .message-input:focus {
      border-color: #90caf9;
    }

    .message-input::placeholder {
      color: #6c757d;
    }

    :host-context(.darkModeOn) .message-input::placeholder {
      color: #90caf9;
    }

    .send-button {
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      width: 32px;
      height: 32px;
      background-color: #0056b3;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    :host-context(.darkModeOn) .send-button {
      background-color: #4590ce;
    }

    .send-button:hover {
      background-color: #004494;
    }

    :host-context(.darkModeOn) .send-button:hover {
      background-color: #90caf9;
    }

    .send-button i {
      margin-top: -1px;
      transition: transform 0.2s ease;
    }

    .send-button:hover i {
      transform: translateY(-2px);
    }

    .send-button:active i {
      transform: translateY(1px);
    }

    .send-button.disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    :host-context(.darkModeOn) .send-button.disabled {
      background-color: #666;
    }

    .send-button.disabled:hover {
      background-color: #6c757d;
    }

    :host-context(.darkModeOn) .send-button.disabled:hover {
      background-color: #666;
    }

    .message-input:disabled {
      background-color: #e9ecef;
      cursor: not-allowed;
    }

    :host-context(.darkModeOn) .message-input:disabled {
      background-color: #555;
    }

    /* Scrollbar styles */
    .messages-container::-webkit-scrollbar {
      width: 6px;
    }

    .messages-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    :host-context(.darkModeOn) .messages-container::-webkit-scrollbar-track {
      background: #333;
    }

    .messages-container::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }

    :host-context(.darkModeOn) .messages-container::-webkit-scrollbar-thumb {
      background: #90caf9;
    }

    .messages-container::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    :host-context(.darkModeOn) .messages-container::-webkit-scrollbar-thumb:hover {
      background: #bbe0ff;
    }

    .messages-counter {
      padding: 0.5rem 1rem;
      text-align: right;
      font-size: 0.875rem;
      color: #6c757d;
      border-bottom: 1px solid #dee2e6;
    }

    :host-context(.darkModeOn) .messages-counter {
      color: #90caf9;
      border-bottom-color: #4590ce;
    }

    .character-counter {
      position: absolute;
      top: -20px;
      right: 1rem;
      font-size: 0.75rem;
      color: #6c757d;
    }

    :host-context(.darkModeOn) .character-counter {
      color: #90caf9;
    }

    .character-counter.exceeded {
      color: #dc3545;
    }

    :host-context(.darkModeOn) .character-counter.exceeded {
      color: #ff6b6b;
    }

    .message-input.exceeded {
      border-color: #dc3545;
    }

    :host-context(.darkModeOn) .message-input.exceeded {
      border-color: #ff6b6b;
    }
  `],
  standalone: false
})
export class ChatComponent implements AfterViewInit {
  @Input() asideWidth: number;
  
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  
  messages$ = this.store.select(state => state.chat.messages);
  loading$ = this.store.select(state => state.chat.loading);
  error$ = this.store.select(state => state.chat.error);
  messagesUsed$ = this.store.select(state => 
    Math.min(3, state.chat.messages.filter(msg => msg.sender === 'user').length)
  );
  maxMessagesPerDay: number = 3;
  maxQuestionLength: number = 1000; // This should match the backend configuration
  
  newMessage: string = '';
  private isResizing = false;
  private startY: number;
  private startHeight: number;
  isLengthExceeded: boolean = false;
  isCompleted$ = this.store.select(state => state.chat.isCompleted);

  constructor(private store: Store<AppState>) {}

  ngAfterViewInit() {
    const resizeHandle = document.querySelector('.resize-handle');
    const textarea = document.querySelector('.message-input') as HTMLTextAreaElement;

    if (resizeHandle && textarea) {
      resizeHandle.addEventListener('mousedown', (e: MouseEvent) => {
        this.isResizing = true;
        this.startY = e.clientY;
        this.startHeight = textarea.offsetHeight;

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
      });
    }
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isResizing) return;
    
    const textarea = document.querySelector('.message-input') as HTMLTextAreaElement;
    if (textarea) {
      const newHeight = this.startHeight + (this.startY - e.clientY);
      textarea.style.height = Math.max(60, newHeight) + 'px';
    }
  };

  private handleMouseUp = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  onMessageChange(message: string) {
    this.isLengthExceeded = message.length > this.maxQuestionLength;
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.isLengthExceeded) return;

    this.store.select(state => state.chat.isContactPromptShown)
      .pipe(first())
      .subscribe(isContactPromptShown => {
        if (isContactPromptShown) {
          this.store.dispatch(new Actions.SendContactDetails(this.newMessage.trim()));
        } else {
          this.store.dispatch(new Actions.SendChatMessage(this.newMessage.trim()));
        }

        this.newMessage = '';
        this.isLengthExceeded = false;
      });
  }

  getCurrentTime(): Date {
    return new Date();
  }
}