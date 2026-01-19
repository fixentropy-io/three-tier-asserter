import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Entity Rules', () => {
    const ENTITY_FOLDER = './three-tier/entities-rules/';
    const ENTITIES_ALLOWED_DEPENDENCIES_RULE = 'entities-allowed-dependencies';

    describe('An entity can only depend on other entities', () => {
        rulePassed(
            `${ENTITY_FOLDER}${ENTITIES_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            ENTITIES_ALLOWED_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${ENTITY_FOLDER}${ENTITIES_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            ENTITIES_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
