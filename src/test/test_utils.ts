import { createRuleFailedOnAsserter, createRulePassedOnAsserter } from '@fixentropy-io/type/test-utils';
import threeTierAsserter from '../..';

export const rulePassed = createRulePassedOnAsserter(threeTierAsserter, require);

export const ruleFailed = createRuleFailedOnAsserter(threeTierAsserter, require);
