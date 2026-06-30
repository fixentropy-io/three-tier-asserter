import type { Dragee } from '@fixentropy-io/type/common';

export const controllerProfile = 'three_tier/controller';
export const serviceProfile = 'three_tier/service';
export const repositoryProfile = 'three_tier/repository';
export const entityProfile = 'three_tier/entity';

const profilesName = [
    controllerProfile,
    serviceProfile,
    repositoryProfile,
    entityProfile
] as const;

export type Profile = (typeof profilesName)[number];

type ThreeTierProfileChecks = {
    [profile in Profile]: {
        findIn: (dragees: Dragee[]) => Dragee[];
        is: (profile: string) => boolean;
    };
};

export const profiles: ThreeTierProfileChecks = {} as ThreeTierProfileChecks;

for (const profile of profilesName) {
    profiles[profile] = {
        is: (value: string) => value === profile,
        findIn: (dragees: Dragee[]) => dragees.filter(dragee => dragee.profile === profile)
    };
}

export const profileOf = (dragee: Dragee, ...profilesFilter: Profile[]): boolean =>
    profilesFilter.map(kf => profiles[kf].is(dragee.profile)).some(b => b);
