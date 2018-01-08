import { Main } from './../shared/skilltree';
import { Experience } from './../experiences/experience';
import { ISkillTree, findSkill, Skill, enumerateSkill, enumerateAncestors } from '../shared/skilltree';
import * as Actions from './actions'

export type SelectedNodes = Array<string[]>

export function navigationReducer(state: ISkillTree = { root: null, isLoaded: false, queryString: {} }, action: Actions.All): ISkillTree {
    switch (action.type) {
        case Actions.ADD:
            add(state, action.payload);

            break;
        case Actions.REMOVE:
            remove(state, action.payload);

            break;
        case Actions.QUERYSTRINGLOADED:
            state.queryString = action.payload;
            loadQueryString(state);
            break;

        case Actions.INITIALSTATELOADED:
            state.isLoaded = true;
            state.root = action.payload.root;
            loadQueryString(state);
            break;

    }

    return JSON.parse(JSON.stringify(state));
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
