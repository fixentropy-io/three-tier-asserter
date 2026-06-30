import { describe, expect, test } from 'bun:test';
import { type Report, asserterHandler } from '@fixentropy-io/type/asserter';

import threeTierAsserter from '../..';

describe('Three-Tier Asserter', () => {
    test('assert with no dragees', () => {
        const report: Report = asserterHandler(threeTierAsserter, []);
        expect(report.pass).toBeTrue();
        expect(report.namespace).toBe('three_tier');
    });
});
