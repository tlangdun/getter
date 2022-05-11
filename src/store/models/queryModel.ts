export type QueryFilter = {
    availability: string | null; // 60 für 60%
    canton: string[] | null;
    country: string[] | null
    job_role: string[] | null;
    skills: string[] | null;
    programming_languages: string[] | null;
    spoken_languages: string[] | null;
    work_experience: string | null; //0, 1-3, 4-6, 7-10+
};

export let EmptyQueryFilter = {
    availability: null,
    canton: [],
    country: [],
    job_role: [],
    skills: [],
    programming_languages: [],
    spoken_languages: [],
    work_experience: null//0, 1-3, 4-6, 7-10+
}