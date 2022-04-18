/* This example requires Tailwind CSS v2.0+ */
const people = [
    {
        name: 'Tenzin Langdun',
        role: 'Co-Founder / CEO',
        linkedinUrl: 'https://ch.linkedin.com/in/tenzin-langdun',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Martin Oswald',
        role: 'Co-Founder / CEO',
        linkedinUrl: 'https://ch.linkedin.com/in/martin-oswald-b2b604226',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQFnfHHTmajkQw/profile-displayphoto-shrink_200_200/0/1641507565447?e=1654732800&v=beta&t=EsfLl-Grwsa1RJboaYBUjPbaUFLLuRuA4J1hzLj2lhk'},
    {
        name: 'Thomas Good',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/thomas-good-91b87b150',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C5603AQHtMfk_7drTLw/profile-displayphoto-shrink_200_200/0/1517887872775?e=1654732800&v=beta&t=5-RP54MLKEjESmshf47eHslmvFgahXU6S4Eoon9oIZE',
    },
    {
        name: 'Stella Damdin',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/stella-damdin-58b97b228',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4E03AQG53RUm02Ln3A/profile-displayphoto-shrink_200_200/0/1640651540416?e=1654732800&v=beta&t=7maGdB7cPKaQ4qaG9GuM-6yb18M7IJVyv6bQ0bTmQdE',
    },
    {
        name: 'Cakir Beyeler',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/cakirbeyeler',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQH4keUix5SFZg/profile-displayphoto-shrink_200_200/0/1584093559001?e=2147483647&v=beta&t=O3GhUnpVVmOV4xAkUBjY-7EMvpeMWU6Z_N8A4bdB-7E',
    },
    {
        name: 'Renée Villiger',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/renee-villiger',
        imageUrl:
            'https://media-exp1.licdn.com/dms/image/C4D03AQFJZBLrxwUHNw/profile-displayphoto-shrink_200_200/0/1568810162790?e=2147483647&v=beta&t=9MmdU7AiI4L5pEQfuv0BQV5KiLgqLpQhV1SJKKN53-w'},
    {
        name: 'Luca Neyer',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/lucaneyer',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Valentin Kleisner',
        role: 'Developer',
        linkedinUrl: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Joo Ho Park',
        role: 'Developer',
        linkedinUrl: 'https://ch.linkedin.com/in/joo-ho-park-a1b045230',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Halil Sino',
        role: 'Developer',
        linkedinUrl: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]

export default function Example() {
    return (
        <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our leadership</h2>
                        <p className="text-xl text-gray-500">
                            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae
                            ullamcorper
                            suspendisse. Vivamus fringilla.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
                            {people.map((person) => (
                                <li key={person.name}>
                                    <div className="flex items-center space-x-4 lg:space-x-6">
                                        <img className="w-16 h-16 rounded-full lg:w-20 lg:h-20" src={person.imageUrl}
                                             alt=""/>
                                        <div className="font-medium text-lg leading-6 space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                            <li>
                                                <a href={person.linkedinUrl}
                                                   className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                         viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}