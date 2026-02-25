import { type Asserter, findRule, findRules } from '@fixentropy-io/type/asserter';

export default {
    namespace: 'three-tier',
    rules: findRules('three-tier', `${import.meta.dir}/src/rules/`),
    rule: (file: string) => findRule('three-tier', `${import.meta.dir}/src/rules/`, file)
} satisfies Asserter;
