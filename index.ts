import { type Asserter, findRule, findRules } from '@dragee-io/type/asserter';

export default {
    namespace: 'three-tier',
    rules: findRules('three-tier', `${import.meta.dir}/src/rules/`),
    rule: (file: string) => findRule('ddd', `${import.meta.dir}/src/rules/`, file)
} satisfies Asserter;
