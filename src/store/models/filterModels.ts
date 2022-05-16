export let EmptyFilters = {
    skills: [],
    programmingLanguages: [],
    jobRoles: [],
    countries: [],
    region: [],
    spokenLanguages: [],
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
