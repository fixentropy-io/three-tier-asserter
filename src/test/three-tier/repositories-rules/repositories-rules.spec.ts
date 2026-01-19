import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Repository Rules', () => {
    const REPOSITORY_FOLDER = './three-tier/repositories-rules/';
    const REPOSITORIES_DEPENDENCIES_RULE = 'repositories-dependencies';

    describe('A repository must only be called from a service', () => {
        rulePassed(
            `${REPOSITORY_FOLDER}${REPOSITORIES_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            REPOSITORIES_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${REPOSITORY_FOLDER}${REPOSITORIES_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            REPOSITORIES_DEPENDENCIES_RULE
        );
    });
});
