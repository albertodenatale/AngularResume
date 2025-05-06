import { Main, ISkillTree } from './../shared/skilltree';
import { Action } from '@ngrx/store';

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const INITIALSTATELOADED = "INITIALSTATELOADED";
export const MAINCONTENTLOADED = "MAINCONTENTLOADED";
export const QUERYSTRINGLOADED = "QUERYSTRINGLOADED";
export const FETCHMAINCONTENT = "FETCHMAINCONTENT";
export const FETCHINITIALSTATE = "FETCHINITIALSTATE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEND_CHAT_MESSAGE = '[Chat] Send Message';
export const CHAT_MESSAGE_SENT = '[Chat] Message Sent';
export const CHAT_MESSAGE_RECEIVED = '[Chat] Message Received';
export const CHAT_MESSAGE_ERROR = '[Chat] Message Error';
export const SEND_CONTACT_DETAILS = '[Chat] Send Contact Details';
export const CONTACT_DETAILS_RECEIVED = '[Chat] Contact Details Received';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: string) { }
}

export class FetchInitialState implements Action {
    readonly type = FETCHINITIALSTATE;
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class InitialStateLoaded implements Action {
    readonly type = INITIALSTATELOADED;

    constructor(public payload: ISkillTree) { }
}

export class FetchMainContent implements Action {
    readonly type = FETCHMAINCONTENT;
}

export class MainContentLoaded implements Action {
    readonly type = MAINCONTENTLOADED;

    constructor(public payload: Main) { }
}

export class QueryStringLoaded implements Action {
    readonly type = QUERYSTRINGLOADED;

    constructor(public payload: any) { }
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor(public payload: any) { }
}

export class SendChatMessage implements Action {
    readonly type = SEND_CHAT_MESSAGE;

    constructor(public payload: string) { }
}

export class ChatMessageSent implements Action {
    readonly type = CHAT_MESSAGE_SENT;

    constructor(public payload: string) { }
}

export class ChatMessageReceived implements Action {
    readonly type = CHAT_MESSAGE_RECEIVED;

    constructor(public payload: string) { }
}

export class ChatMessageError implements Action {
    readonly type = CHAT_MESSAGE_ERROR;

    constructor(public payload: any) { }
}

export class SendContactDetails implements Action {
    readonly type = SEND_CONTACT_DETAILS;

    constructor(public payload: string) { }
}

export class ContactDetailsReceived implements Action {
    readonly type = CONTACT_DETAILS_RECEIVED;

    constructor(public payload: string) { }
}

export type All = Add | Remove | InitialStateLoaded | FetchInitialState | MainContentLoaded | 
    FetchMainContent | QueryStringLoaded | SendChatMessage | ChatMessageSent | 
    ChatMessageReceived | ChatMessageError | SendContactDetails | ContactDetailsReceived;
export type Auth = Login | Logout;