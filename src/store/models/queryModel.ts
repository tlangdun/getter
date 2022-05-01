export type QueryFilter = {
    availability: string | null; // 60 für 60%
    canton: string | null;
    job_role: string | null;
    skills: string[] | null;
    programming_languages: string[] | null;
    spoken_languages: string[] | null;
    work_experience: string | null; //0, 1-3, 4-6, 7-10+
};