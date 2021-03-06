import { FC } from 'react';

const default_image = 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fdefault_userpicture.jpeg?alt=media&token=4c74d6c3-e93e-48aa-b59e-87e3a3894c51'

const people = [
  {
    name: 'Tenzin Langdun',
    role: 'Co-Founder / CEO',
    linkedinUrl: 'https://ch.linkedin.com/in/tenzin-langdun',
    imageUrl:
      'https://i.imgur.com/P6q35qW.png',
  },
  {
    name: 'Martin Oswald',
    role: 'Co-Founder / CEO',
    linkedinUrl: 'https://ch.linkedin.com/in/martin-oswald-b2b604226',
    imageUrl:
      'https://res.cloudinary.com/teepublic/image/private/s--J2pueZiw--/t_Preview/b_rgb:ffffff,c_limit,f_auto,h_630,q_90,w_630/v1590756532/production/designs/10745440_0.jpg',
  },
  {
    name: 'Thomas Gucci',
    role: 'Developer',
    linkedinUrl: 'https://ch.linkedin.com/in/thomas-good-91b87b150',
    imageUrl:
      'https://i.kym-cdn.com/photos/images/newsfeed/002/122/112/891.png',
  },
  {
    name: 'Stella Damdin',
    role: 'Developer',
    linkedinUrl: 'https://ch.linkedin.com/in/stella-damdin-58b97b228',
    imageUrl:
      'https://wojakparadise.net/wojak/212/img',
  },
  {
    name: 'Cakir Beyeler',
    role: 'Atatürk',
    linkedinUrl: 'https://ch.linkedin.com/in/cakirbeyeler',
    imageUrl:
      'https://wojakparadise.net/wojak/7540/img',
  },
  {
    name: 'Renée Villiger',
    role: 'Developer',
    linkedinUrl: 'https://ch.linkedin.com/in/renee-villiger',
    imageUrl:
      'https://ih1.redbubble.net/image.75722584.2724/flat,1000x1000,075,f.jpg',
  },
  {
    name: 'Luca Neyer',
    role: 'Developer',
    linkedinUrl: '',
    imageUrl:
      'https://blog.cdn.own3d.tv/resize=fit:crop,height:400,width:600/1yUTadzQTDWnMKQunV2T',
  },
  {
    name: 'Valentin Kleisner',
    role: 'Developer',
    linkedinUrl: '',
    imageUrl:
      'https://preview.redd.it/dykbx17c8d2y.jpg?width=640&crop=smart&auto=webp&s=ab4030376ad757db62cfd8ff12a3d9ac86edc450',
  },
  {
    name: 'Joo Ho Park',
    role: 'Developer',
    linkedinUrl: 'https://ch.linkedin.com/in/joo-ho-park-a1b045230',
    imageUrl:
      'https://ih1.redbubble.net/image.398317233.0814/flat,750x,075,f-pad,750x1000,f8f8f8.u8.jpg',
  },
  {
    name: 'Halil Sino',
    role: 'Developer',
    linkedinUrl: '',
    imageUrl:
      'https://img-9gag-fun.9cache.com/photo/aZmnxNX_700bwp.webp',
  },
  // More people...
];

const AboutUsPage: FC = () => {
  return (
    <>
      <div data-testid='about-us'></div>
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8'>
            <div className='space-y-5 sm:space-y-4'>
              <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                Meet our leadership
              </h2>
              <p className='text-xl text-gray-500'>
                We are a team of 9 developers who want to offer you a new and
                better way of advertising. Our goal is to simplify your
                application process and bring you a better experience in the
                professional world.
              </p>
            </div>
            <div className='lg:col-span-2'>
              <ul
                className='space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8'>
                {people.map((person) => (
                  <li key={person.name}>
                    <div className='flex items-center space-x-4 lg:space-x-6'>
                      <img
                        className='w-16 h-16 rounded-full lg:w-20 lg:h-20'
                        src={person.imageUrl? person.imageUrl : default_image}
                        alt=''
                      />
                      <div className='font-medium text-lg leading-6 space-y-1'>
                        <h3>{person.name}</h3>
                        <p className='text-purple-600'>{person.role}</p>
                        {person.linkedinUrl && <li>
                          <a
                            href={person.linkedinUrl}
                            className='text-gray-400 hover:text-gray-500'>
                            <span className='sr-only'>LinkedIn</span>
                            <svg
                              className='w-5 h-5'
                              aria-hidden='true'
                              fill='currentColor'
                              viewBox='0 0 20 20'>
                              <path
                                fillRule='evenodd'
                                d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </a>
                        </li>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
