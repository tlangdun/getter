import { FC } from 'react';
import { List } from 'reselect/es/types';


interface Props {
    id:string;
    title:string;
    defaultValue:string;
    onChangeEvent:any;
    options:List;
}

const DropDownFilter:FC<Props> = (props) => {
  return(
    <fieldset data-testid={props.id}>
      <legend className="block font-medium">{props.title}</legend>
      <div>
        <label htmlFor={props.id} className="sr-only">
        {props.title}
        </label>
        <select
        onChange={props.onChangeEvent}
        id={props.id}
        name={props.id}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        defaultValue={props.defaultValue}
        >
        {props.options.map((option) => {
          return <option data-testid={"option-"+option} key={option}>{option}</option>

        })}  
        </select>
      </div>  
    </fieldset>
  );
};

export default DropDownFilter
