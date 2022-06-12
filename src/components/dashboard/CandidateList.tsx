import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getAllCandidates, removeCandidate } from '../../queries/candidateListQuery';
import CandidateCard from './recruiting/CandidateCard';
import { User } from '../../store/models/userModel';


const CandidateList:FC = () => {
  const loggedInUser = useAppSelector((state) => state.user.user);
  const emptyList:Array<User> = []
  const [users, updateUsers] = useState(emptyList)

  useEffect(()=>{
  const fetchData = async () => {
    const candidates = await getAllCandidates(loggedInUser)
    updateUsers(candidates)
    
  }
  fetchData()
    .catch(console.error);

  },[loggedInUser,deleteEvent])

  function deleteEvent(event:any) {
    const uid:string = event.target.value;
    removeCandidate(loggedInUser, uid)
  }

  return(
    <div data-testid="candidates-list" className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Skills
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                    <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((person) => <CandidateCard key={person.uid} person={person} deleteEvent={deleteEvent}/>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList
