import { Main } from './../shared/skilltree';
import { ISkillTree, findSkill, Skill, enumerateSkill, enumerateAncestors } from '../shared/skilltree';
import * as Actions from './actions'
import { ChatMessage } from '../shared/chat.types';

export type SelectedNodes = Array<string[]>

export function navigationReducer(state: ISkillTree = { root: null, isLoaded: false, queryString: {} }, action: Actions.All): ISkillTree {
    
    switch (action.type) {
        case Actions.ADD:
            state = JSON.parse(JSON.stringify(state));
            add(state, action.payload);

            break;
        case Actions.REMOVE:
            state = JSON.parse(JSON.stringify(state));
            remove(state, action.payload);

            break;
        case Actions.QUERYSTRINGLOADED:
            state = JSON.parse(JSON.stringify(state));
            state = { ...state, queryString: action.payload };

            loadQueryString(state);
            break;

        case Actions.INITIALSTATELOADED:

            state = { ...state, isLoaded: true, root: JSON.parse(JSON.stringify(action.payload.root)) };
            
            loadQueryString(state);
            break;

    }

    return state;
}

function loadQueryString(state) {
    if (state.queryString) {
        for (var query in state.queryString) {
            add(state, query);
        }
    }
}

function add(state, nodeId) {
    let skill: Skill = findSkill(state, nodeId);

    if (skill != null) {
        skill.isActive = true;

        addAncestors(state, skill);
    }
}

function addAncestors(state: ISkillTree, skill: Skill) {
    for (let ancestor of Array.from(enumerateAncestors(state, skill))) {
        if (!ancestor.isActive) {
            ancestor.isActive = true;
        }
    }
}

function remove(state, nodeId) {
    let skill: Skill = findSkill(state, nodeId);

    if (skill != null) {
        skill.isActive = false;

        for (let s of Array.from(enumerateSkill(skill))) {
            s.isActive = false;
        }

        if (skill.parentId) {
            let parent: Skill = findSkill(state, skill.parentId);

            if (parent.navigationBarId == null) {
                let isAnyChildActive = parent.children.some(c => c.isActive);

                if (!isAnyChildActive) {
                    parent.isActive = false;
                }
            }
        }
    }
}

export function mainReducer(state: Main = { experiences: null, isLoaded: false }, action: Actions.All): Main {
    switch (action.type) {
        case Actions.MAINCONTENTLOADED:
            return action.payload;
    }

    return JSON.parse(JSON.stringify(state));
}

export function authenticationReducer(state: any, action: Actions.Auth) {
    switch (action.type) {
        case Actions.LOGIN:
            return action.payload;
        case Actions.LOGOUT:
            return null;
    }

    return state;
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: any;
}

const initialChatState: ChatState = {
  messages: [{
    text: "Welcome, I am Alberto's AI assistant and I am here to answer any question you may have on his professional experience!\n\nHow can I help you?",
    sender: 'agent',
    timestamp: new Date()
  }],
  loading: false,
  error: null
};

export function chatReducer(state = initialChatState, action: any): ChatState {
  switch (action.type) {
    case Actions.SEND_CHAT_MESSAGE:
      return {
        ...state,
        loading: true,
        messages: [...state.messages, {
          text: action.payload,
          sender: 'user',
          timestamp: new Date()
        }]
      };
    
    case Actions.CHAT_MESSAGE_RECEIVED:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, {
          text: action.payload,
          sender: 'agent',
          timestamp: new Date()
        }]
      };
    
    case Actions.CHAT_MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
}

export interface AppState {
  // ... existing state properties ...
  chat: ChatState;
}
