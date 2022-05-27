import { FC } from 'react';

interface Props {
  rightLabel?: string;
  onRightHandler?(): any;
  rightEnabled?: boolean;
  rightHidden?: boolean;
  leftLabel?: string;
  onLeftHandler?(): any;
  leftEnabled?: boolean;
  leftHidden?: boolean;
}

const ButtonGroup: FC<Props> = ({
  onRightHandler,
  onLeftHandler,
  rightEnabled,
  leftEnabled,
  rightHidden,
  leftHidden,
  rightLabel,
  leftLabel
}) => {
  return (
    <div className='flex justify-end pb-8'>
      {!leftHidden && (
        <button
          onClick={onLeftHandler}
          disabled={!leftEnabled}
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
        {leftLabel}
        </button>
      )}
      {!rightHidden && (
        <button
          type='submit'
          onClick={onRightHandler}
          disabled={!rightEnabled}
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
        {rightLabel}
        </button>
      )}
    </div>
  );
};

export default ButtonGroup;
