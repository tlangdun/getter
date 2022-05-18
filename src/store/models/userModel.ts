type WorkExperience = {
  description: string;
  employer: string;
  job_role: string;
  end_date: string;
  start_date: string;
}

export enum access_level {
  TALENT,
  RECRUITER,
  ADMIN
}

type BasicUser = {
    uid: string;
    access_level: access_level;
    email: string;
    first_name: string;
    last_name: string;
    pic_url: string;
    short_bio: string;
}

export type GetterUser = null | BasicUser | BasicUser & {
    address_postcode: string;
    availability: string;
    birth_date: string;
    country:string;
    canton: string;
    city_of_residence: string;
    job_role: string;
    spoken_languages: string[];
    skills: string[];
    programming_languages: string[];
    salary_range: {
      start: number;
      end: number;
    }
    work_experience: WorkExperience[];
  };

export type User = {
  uid: string;
  access_level: access_level;
  email: string;
  first_name: string;
  last_name: string;
  pic_url: string;
  short_bio: string;
  address_postcode: string;
  availability: string;
  birth_date: string;
  country:string;
  canton: string;
  city_of_residence: string;
  job_role: string;
  spoken_languages: string[];
  skills: string[];
  programming_languages: string[];
  salary_range: {
    start: number;
    end: number;
  }
  work_experience: WorkExperience[];
}