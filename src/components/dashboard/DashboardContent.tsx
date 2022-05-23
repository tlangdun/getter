import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { access_level } from '../../store/models/userModel';
import ContentCard from './defaultpage/ContentCard';
import { contentCardRecruiter, contentCardTalent, fullCardContentRecruiter, fullCardContentTalent } from './defaultpage/DashboardText';
import FullCard from './defaultpage/FullCard';

const DashboardContent:FC = () => {
  let fullCardContent;
  let contentCards;
  const user = useAppSelector((state) => state.user.user);
  
  if(user?.access_level === access_level.TALENT) {
    fullCardContent = fullCardContentTalent
    contentCards = contentCardTalent
  } else {
    fullCardContent = fullCardContentRecruiter
    contentCards = contentCardRecruiter
  }

  return(
    <>
    <div data-testid="dashboard">
      <FullCard title={fullCardContent.title} text={fullCardContent.text}/>
      <div data-testid="content-card" className="grid grid-flow-col gap-6 max-w-7xl mx-auto sm:px-2 lg:px-2 mt-2">
        {contentCards.map((contentCard) => {
          return (<div key={contentCard.title} className="col-span-1 rounded">
            <ContentCard 
            title={contentCard.title}
            text={contentCard.text}
            link={contentCard.link} 
            image={contentCard.image}
            />
           </div>)
        })}  
      </div>
    </div>
    </>
  );
};

export default DashboardContent
