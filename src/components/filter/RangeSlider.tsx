import { FC } from 'react';

interface Props {
    event:any;
    id:string;
    value:string;
    name:string;
    min:string;
    max:string;
    step:string;
}

const RangeSlider:FC<Props> = (props) => {
  return(
    <fieldset data-testid={props.id} className="p-2">
        <legend className="block font-medium">{props.name}</legend>
        <label htmlFor={props.id} className="min-w-0 flex-1 text-gray-600">{props.value}</label>
        <input id={props.id} onClick={props.event} type="range" defaultValue={props.min} min={props.min} step={props.step} max={props.max} className="w-full h-3 accent-violet-600" />
    </fieldset>   
  );
};

export default RangeSlider
