import { FC } from 'react';

interface Props {
    event:any;
    value:string;
    name:string;
}

const RangeSlider:FC<Props> = (props) => {
  return(
    <fieldset className="w-1/2 p-2">
        <legend className="block font-medium">{props.name}</legend>
        <label htmlFor="availability-range" className="min-w-0 flex-1 text-gray-600">{props.value} %</label>
        <input id="availability-range" onClick={props.event} type="range" min="0" step="5" max="100" className="w-full h-3 accent-violet-600" />
    </fieldset>   
  );
};

export default RangeSlider
