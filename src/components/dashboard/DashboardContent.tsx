import { FC } from 'react';
import ContentCard from './defaultpage/ContentCard';
import FullCard from './defaultpage/FullCard';
let fullCardContent = {
  title: "Recruiting Dashboard",
  text: "Filter through our database and find matching talents. Save your queries for future searches and chat with the talents in the messages tab."
}
let contentCard1 = {
  title:"Recruiting",
  text:"Filter through all candidates and find candidates that suits the needs of your company / client.",
  image:"https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Frecruiting-pexels-gustavo-fring-3874035.jpg?alt=media&token=37d1f285-acb7-4d0f-b06a-0ba5a1e99521",
  link:"/dashboard/recruiting"
}
let contentCard2 = {
  title:"Queries",
  text:"Save and edit your queries for easier access in your future recruiting process.",
  image:"https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Fqueries-pexels-pixabay-356079.jpg?alt=media&token=4c10794f-a07c-4cf9-8cca-f27ad28e5c0b",
  link:"/dashboard/queries"
}
let contentCard3 = {
  title:"Messages",
  text:"Start a new conversation with a candidate over the recruiting page. Write with the Candidates in the messages tab.",
  image:"https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Fmessages-pexels-pixabay-261763.jpg?alt=media&token=53ba4e1c-e67c-40c4-b1ea-ed19c32c802a",
  link:"/dashboard/messages"
}
const DashboardContent:FC = () => {
  return(
    <>
    <div data-testid="dashboard">
      <FullCard title={fullCardContent.title} text={fullCardContent.text}/>
      <div data-testid="content-card" className="grid grid-flow-col gap-6 max-w-7xl mx-auto sm:px-2 lg:px-2 mt-2">
          <div className="col-span-1 rounded">
            <ContentCard 
            title={contentCard1.title}
            text={contentCard1.text}
            link={contentCard1.link} 
            image={contentCard1.image}
            />
          </div>
          <div className="col-span-1 rounded">
            <ContentCard 
            title={contentCard2.title}
            text={contentCard2.text}
            link={contentCard2.link} 
            image={contentCard2.image}
            />
          </div>
          <div className="col-span-1 rounded">
            <ContentCard 
            title={contentCard3.title}
            text={contentCard3.text}
            link={contentCard3.link} 
            image={contentCard3.image}
            />
          </div>      
        </div>
    </div>
    </>
  );
};

export default DashboardContent
