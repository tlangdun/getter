export let EmptyFilters: Filters= {
    skills: new Array(),
    programmingLanguages: [],
    jobRoles: [],
    countries: [],
    region: [],
    spokenLanguages: [],
    work_experience: [ "All" ,"0", "1-3", "4-6", "7-10+"]
}

export type Filters= {
    skills: {value: string, label: string, checked: boolean}[],
    programmingLanguages:{ value: string, label: string, checked: boolean }[],
    jobRoles: { value: string, label: string, checked: boolean }[],
    countries: { value: string, label: string, checked: boolean }[],
    region: { value: string, label: string, checked: boolean }[],
    spokenLanguages: { value: string, label: string, checked: boolean }[],
    work_experience: string[]
}
