import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title:string;
    text:string;
    link:string;
    image:string;
}
const ContentCard:FC<Props> = (props) => {
  return(
    <>
        <Link to={props.link}>
        <div className="relative h-full rounded overflow-hidden shadow-lg">
            <div className='absolute inset-0'>
                <img className="h-full w-full object-cover" src={props.image} alt="Sunset in the mountains"/>
                <div className="absolute inset-0 bg-gray-400 mix-blend-multiply" />
            </div>
            <div className='relative'>
                <div className="px-6 py-4">
                    <div className="font-bold text-white text-xl mb-2">{props.title}</div>
                    <p className="text-white text-base">
                        {props.text}
                    </p>
                </div>
            </div> 
        </div>
        </Link>
    </>
  );
};

export default ContentCard
