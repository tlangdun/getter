import { Link } from "react-router-dom"

const HeroSection = () => {
    return (
        <div className="relative bg-gray-50">
            <main className="lg:relative">
                <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                    <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                            <span className="block xl:inline">Connecting employer and employee one</span>{' '}
                            <span className="block text-purple-600 xl:inline">match at a time</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                            Are you a business looking for a programmer? Are you a programmer looking for your next project?
                            Switzerland's first platform connecting programmers with their employer and vice versa. The most efficient
                            path to your next careeer milestone.
                        </p>
                        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <Link
                                    to="auth/signup"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Get started
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link
                                    to="/auth/login"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80"
                        alt=""
                    />
                </div>
            </main>
        </div>
    )
}

export default HeroSection