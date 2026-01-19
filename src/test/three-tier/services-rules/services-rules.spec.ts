import { describe } from 'bun:test';
import { ruleFailed, rulePassed } from '../../test_utils';

describe('Service Rules', () => {
    const SERVICE_FOLDER = './three-tier/services-rules/';
    const SERVICES_ALLOWED_DEPENDENCIES_RULE = 'services-allowed-dependencies';

    describe('A service can only depend on repositories or other services', () => {
        rulePassed(
            `${SERVICE_FOLDER}${SERVICES_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            SERVICES_ALLOWED_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${SERVICE_FOLDER}${SERVICES_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            SERVICES_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
