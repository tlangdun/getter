import { FC } from 'react';
import { List } from 'reselect/es/types';

interface Props {
    event:any;
    list:List;
    name:string;
}
const CheckboxFilter:FC<Props> = (props) => {
  let id = props.name.replace(/\s+/g, '').toLowerCase()
  return(
    <fieldset className='max-h-44 overflow-y-auto p-2'>
        <legend className="block font-medium">{props.name}</legend>
        <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
            {props.list.map((option, optionIdx) => (
            <div key={option.value} data-testid={option.value} className="flex items-center text-base sm:text-sm">
                <input
                onClick={props.event}
                id={`${id}-${optionIdx}`}
                data-testid={`${id}-${optionIdx}`}
                name={id +"[]"}
                defaultValue={option.value}
                type="checkbox"
                className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-violet-600 focus:ring-violet-700"
                defaultChecked={option.checked}
                />
                <label htmlFor={`${id}-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                {option.label}
                </label>
            </div>
            ))}
        </div>
    </fieldset>
  );
};

export default CheckboxFilter
