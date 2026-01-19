import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Controller Rules', () => {
    const CONTROLLER_FOLDER = './three-tier/controllers-rules/';
    const CONTROLLERS_ALLOWED_DEPENDENCIES_RULE = 'controllers-allowed-dependencies';

    describe('A controller can only depend on services', () => {
        rulePassed(
            `${CONTROLLER_FOLDER}${CONTROLLERS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            CONTROLLERS_ALLOWED_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${CONTROLLER_FOLDER}${CONTROLLERS_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            CONTROLLERS_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
