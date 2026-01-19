import { createRuleFailedOnAsserter, createRulePassedOnAsserter } from '@dragee-io/type/test-utils';
import threeTierAsserter from '../..';

export const rulePassed = createRulePassedOnAsserter(threeTierAsserter, require);

export const ruleFailed = createRuleFailedOnAsserter(threeTierAsserter, require);
