import { FC } from 'react';
import { List } from 'reselect/es/types';
import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom';
interface Props{
    navigation:List;
}

function classNames(...classes:List) {
    return classes.filter(Boolean).join(' ')
}

/**
 * Set active path if href matches current url
 * @param navigation 
 * @param pathname 
 */
function setCurrentPath(navigation:List,pathname:string) { 
    navigation.forEach(element => {
        element.current = (pathname.includes(element.href))
    });
    if(pathname.split('/').length > 2) {
        navigation[0].current = false
    }
}

const MenuItems:FC<Props> = (props) => {
    let location = useLocation()   
    setCurrentPath(props.navigation,location.pathname)
    return(
    <>
    {props.navigation.map((item) => (

        <NavLink
            key={item.name}
            to={item.href}
            className={classNames(
            item.current
                ? 'bg-violet-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
            )}
        >
            <item.icon
            className={classNames(
                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-4 h-6 w-6'
            )}
            aria-hidden="true"
            />
            {item.name}
        </NavLink>    
    ))}
    </>
    );
};

export default MenuItems


