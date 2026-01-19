/**
 * **services-allowed-dependencies :**
 * Services can only have dependencies of types "three-tier/repository" or "three-tier/service"
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *     "dragees": [
 *         {
 *             "name": "AController",
 *             "profile": "three-tier/controller"
 *         },
 *         {
 *             "name": "AService",
 *             "profile": "three-tier/service",
 *             "depends_on": {
 *                 "AController": ["field"]
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
 *             "name": "ARepository",
 *             "profile": "three-tier/repository"
 *         },
 *         {
 *             "name": "AnotherService",
 *             "profile": "three-tier/service"
 *         },
 *         {
 *             "name": "AService",
 *             "profile": "three-tier/service",
 *             "depends_on": {
 *                 "ARepository": ["field"],
 *                 "AnotherService": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Services Allowed Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragee
} from '@dragee-io/type/asserter';
import type { Dragee, DrageeDependency } from '@dragee-io/type/common';
import { profileOf, profiles, repositoryProfile, serviceProfile } from '../three-tier.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult[] =>
    dependencies.map(dependency =>
        expectDragee(
            root,
            dependency,
            `This service must not have any dependency other than "${repositoryProfile}" or "${serviceProfile}"`,
            dragee => profileOf(dragee, repositoryProfile, serviceProfile)
        )
    );

export default {
    label: 'Services Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[serviceProfile]
            .findIn(dragees)
            .map(service => directDependencies(service, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
