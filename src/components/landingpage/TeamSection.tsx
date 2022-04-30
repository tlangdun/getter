const people = [
    {
        name: 'Tenzin Samdrup Langdun',
        role: 'Product Owner',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQFVfBzbTlk1Eg/profile-displayphoto-shrink_800_800/0/1594148488814?e=1652918400&v=beta&t=g0scKZgzjdAWaRQtdKzpOy1p0kfBihC-68ooDqVHY1Q',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/tenzin-langdun/',
    },
    {
        name: 'Martin Oswald',
        role: 'Frontend Lead',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQFnfHHTmajkQw/profile-displayphoto-shrink_400_400/0/1641507565447?e=1652918400&v=beta&t=x8-4kY85UgAXq9hi3G3kH7sEY0DBOPUPZOLp5AMi5hs',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/martin-oswald-b2b604226/',
    },
    {
        name: 'Cakir Beyeler',
        role: 'Backend Lead',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQH4keUix5SFZg/profile-displayphoto-shrink_400_400/0/1584093559001?e=2147483647&v=beta&t=eAsLmSnCh8Vr1gk8lzSEc_JNCdTKoZd1zungsItH3UQ',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/cakirbeyeler/',
    },
    {
        name: 'Renée Villiger',
        role: 'SCRUM Master',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQFJZBLrxwUHNw/profile-displayphoto-shrink_400_400/0/1568810162790?e=2147483647&v=beta&t=3JoQpiHNnUWt8xYH9aP_k2lW01W_T_Op_CJjh8VqDyQ',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/renee-villiger/',
    },
    {
        name: 'Thomas Good',
        role: 'Database Specialist',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C5603AQHtMfk_7drTLw/profile-displayphoto-shrink_400_400/0/1517887872775?e=1652918400&v=beta&t=rfBHIwKLflboaUJDNWN90NS6VWF7yaiPIqCj0P1HfOs',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/thomas-good-91b87b150/',
    },
    {
        name: 'Luca Neyer',
        role: 'Frontend',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQH6llauSUjelw/profile-displayphoto-shrink_400_400/0/1608728852348?e=1652918400&v=beta&t=-LCPgVG1AbwFVrvsmVtyKhQrR6pcfDpL_AWZaet8wAM',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/lucaneyer/',
    },
    {
        name: 'Stella Damdin',
        role: 'Backend',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4E03AQG53RUm02Ln3A/profile-displayphoto-shrink_400_400/0/1640651540416?e=1652918400&v=beta&t=6upU1XEeVBxUUUlYa8ryOzyiAstX1cSkYvCEBqCC9mE',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/stella-damdin-58b97b228/',
    },
    {
        name: 'Valentin Kleisner',
        role: 'Frontend',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Halil Sino',
        role: 'Backend',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Joo Ho Park',
        role: 'Frontend',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },

]

const TeamSection = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>
                        <p className="text-xl text-gray-500">
                            Started at ZHAW (Zurich University of Applied Sciences) now we here.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
                    >
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="space-y-6">
                                    <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                                    <div className="space-y-2">
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <ul role="list" className="flex justify-center space-x-5">
                                            <li>
                                                <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Twitter</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TeamSection