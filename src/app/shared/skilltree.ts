import { Experience } from './../experiences/experience';

export function addSkill(tree: ISkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function removeSkill(tree: ISkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function findSkill(tree: ISkillTree, skillId: string): Skill {
    for (var skill of Array.from(enumerateTree(tree))) {
        if (skill.id === skillId) {
            return skill;
        }
    }
}

export function getByNavigationBarId(tree: ISkillTree, navBarId: string): Array<Skill> {
    let result: Array<Skill> = [];

    for (var skill of Array.from(enumerateTree(tree))) {
        if (skill.navigationBarId === navBarId) {
            result.push(skill);
        }
    }

    return result;
}

export function* enumerateTree(tree: ISkillTree): IterableIterator<Skill> {
    if (tree == null || tree.root == null) {
        return;
    }

    for (let skill of Array.from(enumerateSkill(tree.root))) {
        yield skill;
    }
}

export function* enumerateSkill(skill: Skill): IterableIterator<Skill> {
    if (skill.children == null || skill.children.length === 0) {
        return;
    }
    else {
        for (let child of skill.children) {
            yield child;
        }

        for (let child of skill.children) {
            for (let nephew of Array.from(enumerateSkill(child))) {
                yield nephew;
            }
        }
    }
}

export function* enumerateAncestors(tree: ISkillTree, skill: Skill): IterableIterator<Skill>  {
    if(skill && skill.parentId)
    {
        let parent = findSkill(tree, skill.parentId);

        if(parent)
        {
            yield parent;

            for(let ancestor of Array.from(enumerateAncestors(tree, parent)))
            {
                yield ancestor;
            }
        }
    }
}

export function convertToRegex(tree: ISkillTree): Array<RegExp> {
    if (tree == null || tree.root == null) {
        return;
    }

    var regexes = [];

    for (let skillset of tree.root.children) {
        let regex = null;

        for (let level of Array.from(enumerateLevels([skillset]))) {
            level.forEach(element => {
                if (element.isActive && !hasActiveChildren(element)) {
                    if (regex == null) {
                        regex = element.id;
                    }
                    else {
                        regex = regex.concat("|", element.id)
                    }
                }
            });

        }

        if (regex != null) {
            regexes.push(new RegExp(regex));
        }
    }

    return regexes;
}

function hasActiveChildren(element: Skill) {
    return element != null && element.children != null && element.children.some(e => e.isActive === true);
}

function* enumerateLevels(level: Skill[]): IterableIterator<Skill[]> {
    if (level == null || level.length === 0) {
        return;
    }
    else {
        let currentLevel = [];

        for (let skill of level) {
            if (skill.children && skill.children.length > 0) {
                currentLevel = currentLevel.concat(skill.children);
            }
        }

        yield currentLevel;

        for (let nephews of Array.from(enumerateLevels(currentLevel))) {
            yield nephews;
        }
    }
}

export class AppState {
    navigation: ISkillTree;
    main: Main;
    authentication: any;
}

export interface ISkillTree {
    root: Skill
    isLoaded: boolean,
    queryString: any
}

export class SkillTree implements ISkillTree {
    root: Skill;
    isLoaded: boolean;
    currentNav: string;
    currentSubnav: string;
    queryString: any;
}

export class Main {
    isLoaded?: boolean;
    experiences: Experience[];
}

export class Authentication {
    authenticatedUser: any;
}

export class Skill {
    id: string;
    isActive: boolean;
    isVisible: boolean;
    navigationBarId: string;
    children: Array<Skill>;
    parentId: string;
    label: string;
    weight:number;
}

export const MAINNAV = "MAINNAV";
export const SUBNAV = "SUBNAV";