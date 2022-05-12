import { FC } from 'react';

interface Props {
    title:string
    text:string
}
const FullCard:FC<Props> = (props) => {
  return(
    <>
    <div className="relative">
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-2">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
                <img
                className="h-full w-full object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Fdashboard-fullcard-pexels-lukas-590016.jpg?alt=media&token=d2d9b16f-f078-424c-b3f1-750be5fb0e9b"
                alt="Job Application"
                />
                <div className="absolute inset-0 bg-violet-600 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">{props.title}</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                {props.text}
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default FullCard
