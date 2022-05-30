const steps = [
    {
        step: 'Step 1: Search for interesting roles and talented people ',
        answer:
            'Are you looking for an exciting role in a tech company? Or are you looking for new team members? Browse through our open roles in highly innovative companies and and through profiles of motivated employees. ',
    },
    {
        step: 'Step 2: Publish an open role or your profile ',
        answer:
            'Log in with your e-mail and upload the information you want to share: This can be just your LinkedIn profile, your contact details, your skills or even more information on what you offer and what you are looking for.  ',
    },
    {
        step: 'Step 3: Connect ',
        answer:
            'Found an interesting role or future team member? Then connect directly with each other over the indicated contact details. ',
    },
]

const HowToSection = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Just three steps away from your next project.
                        </p>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-2">
                        <dl className="space-y-12">
                            {steps.map((faq) => (
                                <div key={faq.step}>
                                    <dt className="text-lg leading-6 font-medium text-gray-900">{faq.step}</dt>
                                    <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HowToSection