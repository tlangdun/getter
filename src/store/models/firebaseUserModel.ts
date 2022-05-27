export type WorkExperience = {
  description: string;
  employer: string;
  job_role: string;
  end_date: string;
  start_date: string;
}

export const availabilityMap = new Map<string, string>([
  ['0 - 20', '20'],
  ['20 - 40', '40'],
  ['40 - 60', '60'],
  ['60 - 80', '80'],
  ['80 - 100', '100'],
  ['20', '0 - 20'],
  ['40', '20 - 40'],
  ['60', '40 - 60'],
  ['80', '60 - 80'],
  ['100', '80 - 100'],
]);

export type firebaseRecruiter = {
  email: string,
  first_name: string,
  last_name: string,
  pic_url: string,
  short_bio: string,
}

export type firebaseUser = {
  email: string,
  first_name: string,
  last_name: string,
  pic_url: string,
  short_bio: string,
  address_postcode: string,
  availability: string,
  birth_date: string,
  country: string,
  canton: string,
  city_of_residence: string,
  job_role: string,
  salary_range: {
    start: number;
    end: number;
  },
  work_experience: WorkExperience[]
}

export const DEFAULT_PROFILE_PIC = 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7'