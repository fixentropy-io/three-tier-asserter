/**
 * **entities-allowed-dependencies :**
 * Entities can only have dependencies of type "three_tier/entity"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *     "dragees": [
 *         {
 *             "name": "AService",
 *             "profile": "three_tier/service"
 *         },
 *         {
 *             "name": "AnEntity",
 *             "profile": "three_tier/entity",
 *             "depends_on": {
 *                 "AService": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": false
 *     }
 * }
 * ```
 *
 * Example of correct dragees for this rule:
 *
 * ```json
 * {
 *     "dragees": [
 *         {
 *             "name": "AnotherEntity",
 *             "profile": "three_tier/entity"
 *         },
 *         {
 *             "name": "AnEntity",
 *             "profile": "three_tier/entity",
 *             "depends_on": {
 *                 "AnotherEntity": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Entities Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@fixentropy-io/type/asserter';
import type { Dragee, DrageeDependency } from '@fixentropy-io/type/common';
import { entityProfile, profileOf, profiles } from '../three-tier.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] =>
    dependencies.map(dependency =>
        expectDragee(
            root,
            dependency,
            `This entity must not have any dependency other than "${entityProfile}"`,
            dragee => profileOf(dragee, entityProfile)
        )
    );

export default {
    label: 'Entities Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[entityProfile]
            .findIn(dragees)
            .map(repository => directDependencies(repository, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
