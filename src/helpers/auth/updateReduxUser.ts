
import { UserActions } from '../../store/slices/UserSlice';
import store from '../../store/store';
import getUser from './getUser';

const updateReduxUser = (uid: string) => {
    getUser(uid).then(u => {
        store.dispatch(UserActions.setFirebaseUser(u))
    })
}

export default updateReduxUser