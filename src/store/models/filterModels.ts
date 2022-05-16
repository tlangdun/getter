export let EmptyFilters = {
    skills: new Array(),
    programmingLanguages: new Array(),
    jobRoles: new Array(),
    countries: new Array(),
    region: new Array(),
    spokenLanguages: new Array(),
    work_experience: [ "All" ,"0", "1-3", "4-6", "7-10+"]
}

export type Filters= {
    skills: string[],
    programmingLanguages:string[],
    jobRoles: string[],
    countries: string[],
    region: string[],
    spokenLanguages: string[],
    work_experience: string[]
}
