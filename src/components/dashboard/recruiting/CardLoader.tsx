import { FC, useEffect, useState } from 'react';
import Card from './Card';
import { useAppSelector } from '../../../store/hooks'
import { getDocumentsByFilter } from '../../../helpers/queries/databaseHelper';
import { db } from '../../../services/firebaseconfig';
import {addCandidate} from "../../../queries/candidateListQuery";

const CardLoader:FC = () => {
  const activeFilters = useAppSelector((state:any) => state.activeFilters);
  const loggedInUser = useAppSelector((state) => state.user.user);

  function addToCandidatesList(uid:string){
    addCandidate(loggedInUser,uid)
  }
  const [users, updateUsers] = useState(new Array())
  useEffect(()=>{
    let temp = Object.assign({}, activeFilters);
    let filters = temp.activeFilter

    getDocumentsByFilter(db,filters).then((resultValue) => {
      let candidates = resultValue
      updateUsers(candidates)
    }).catch(()=>{
      alert("error loading cards")
    })
  },[activeFilters])
  return(
    <>
      <ul data-testid="card-loader" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user:any) => (
              <Card event={addToCandidatesList} key={user.email} user={user}/>
          ))}
      </ul>
    </>
  );
};

export default CardLoader
