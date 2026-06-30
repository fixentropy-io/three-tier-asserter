/**
 * **controllers-allowed-dependencies :**
 * Controllers can only have dependencies of type "three_tier/service"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *     "dragees": [
 *         {
 *             "name": "ARepository",
 *             "profile": "three_tier/repository"
 *         },
 *         {
 *             "name": "AController",
 *             "profile": "three_tier/controller",
 *             "depends_on": {
 *                 "ARepository": ["field"]
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
 *             "name": "AService",
 *             "profile": "three_tier/service"
 *         },
 *         {
 *             "name": "AController",
 *             "profile": "three_tier/controller",
 *             "depends_on": {
 *                 "AService": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Controllers Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@fixentropy-io/type/asserter';
import type { Dragee, DrageeDependency } from '@fixentropy-io/type/common';
import { controllerProfile, profileOf, profiles, serviceProfile } from '../three-tier.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] =>
    dependencies.map(dependency =>
        expectDragee(
            root,
            dependency,
            `This controller must not have any dependency other than "${serviceProfile}"`,
            dragee => profileOf(dragee, serviceProfile)
        )
    );

export default {
    label: 'Controllers Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[controllerProfile]
            .findIn(dragees)
            .map(controller => directDependencies(controller, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
