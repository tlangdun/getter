type WorkExperience = {
  description: string;
  employer: string;
  job_role: string;
  end_date: string;
  start_date: string;
}

export type GetterUser = null | {
    uid: string;
    address_postcode: string;
    availability: string;
    birth_date: string;
    canton: string;
    city_of_residence: string;
    email: string;
    job_role: string;
    first_name: string;
    last_name: string;
    pic_url: string;
    short_bio: string;
    salary_range: {
      start: number;
      end: number;
    }
    work_experience: WorkExperience[];
  };