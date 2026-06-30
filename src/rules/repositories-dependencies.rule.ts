/**
 * **repositories-dependencies :**
 * Repositories must only be called from a Service
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
 *             "name": "ARepository",
 *             "profile": "three_tier/repository"
 *         },
 *         {
 *             "name": "AService",
 *             "profile": "three_tier/service",
 *             "depends_on": {
 *                 "ARepository": ["field"]
 *             }
 *         }
 *     ],
 *     "result": {
 *         "pass": true
 *     }
 * }
 * ```
 *
 * @module Repositories Dependencies
 *
 */
import { type RuleResult, RuleSeverity, expectDragee } from '@fixentropy-io/type/asserter';
import type { Dragee } from '@fixentropy-io/type/common';
import { profileOf, repositoryProfile, serviceProfile } from '../three-tier.model.ts';

const includeRepoName = (repositories: Dragee[], name: string) =>
    repositories.map(repo => repo.name).includes(name);

export default {
    label: 'Repositories Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] => {
        const repositories = dragees.filter(dragee => profileOf(dragee, repositoryProfile));

        const drageesWithRepositoryDependencies = dragees
            .flatMap(dragee => {
                if (!dragee.depends_on) return [];
                return Object.keys(dragee.depends_on)
                    .filter(name => includeRepoName(repositories, name))
                    .map(repositoryName => {
                        return { dragee, repositoryName };
                    });
            })
            .filter(drageeWithRepo => drageeWithRepo.repositoryName);

        return drageesWithRepositoryDependencies
            .map(({ dragee, repositoryName }) => {
                const repository = repositories.find(repo => repo.name === repositoryName)!;
                return expectDragee(
                    repository,
                    dragee,
                    `"${repositoryName}" repository must only be called inside a "${serviceProfile}"`,
                    dragee => profileOf(dragee, serviceProfile)
                );
            });
    }
};
