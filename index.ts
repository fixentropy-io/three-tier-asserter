import { type Asserter, findRule, findRules } from '@fixentropy-io/type/asserter';

export default {
    namespace: 'three_tier',
    rules: findRules('three_tier', `${import.meta.dir}/src/rules/`),
    rule: (file: string) => findRule('three_tier', `${import.meta.dir}/src/rules/`, file)
} satisfies Asserter;
