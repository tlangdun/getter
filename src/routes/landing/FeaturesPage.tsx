import { FC } from 'react';
import {CheckIcon} from "@heroicons/react/outline";

const features = [
  { name: 'Overview', description: 'All the information you need in one place.',
  },
  { name: 'Filtering', description: 'Find what you need with advanced filters in no time.' },
  { name: 'Networking', description: 'Add your connections for future reference and networking.',
  },
  { name: 'Skills', description: 'Include your skills to be seen by more employers.' },
  { name: 'Notifications', description: 'Get notified about the newest job offers and news in the IT world.' },
]

const FeaturesPage: FC = () => {
  return(
      <><>
        <div data-testid="features"></div>
      </>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div>
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Everything you need</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">All-in-One Platform</p>
              <p className="mt-4 text-lg text-gray-500">
                Hassle-free. Simple. Fast.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                {features.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true"/>
                        <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                    </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </>
  );
};

export default FeaturesPage
