import { render, screen } from '@testing-library/react';
import FormInput from './FormInput';

describe('FormInput component', () => {
  const testLabel = 'test-label';
  const testId = 'id';
  const testName = 'test-name';
  const testType = 'test-type';
  const testValue = 'test-value';
  const onChangeHandler = () => {}
  const onBlurHandler = () => {}

  const formInput = (
    <FormInput
      label={testLabel}
      id={testId}
      name={testName}
      type={testType}
      value={testValue}
      handleChange={onChangeHandler}
      handleBlur={onBlurHandler}
    />
  );

  test('renders label', () => {
    render(formInput);
    const inputLabel = screen.getByText(testLabel, { exact: true });
    expect(inputLabel).toBeInTheDocument();
  });

});
