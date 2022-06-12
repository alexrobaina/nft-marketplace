import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '../../../../utils/test-utils';
import BaseButton from '../BaseButton';

describe('<BaseButton />', () => {
  test('Should component must render correctly', () => {
    const { getByText } = render(<BaseButton text="Ingresar" type="submit" />);
    const button: any = document.querySelector('.button');

    expect(button.type).toEqual('submit');
    expect(getByText('Ingresar')).toBeDefined();
  });

  test('Should disabled button', () => {
    const { getByText } = render(<BaseButton disabled text="Ingresar" />);

    const button: any = document.querySelector('.button');

    expect(button.type).toEqual('button');
    expect(getByText('Ingresar')).toBeDefined();
  });

  test('Should button link', () => {
    const { getByTestId }: any = render(
      <BaseButton
        testId="test"
        isButtonLink
        text="Login"
        linkURL="https://testing-library.com/docs/react-testing-library/setup"
      />,
    );

    const button: any = getByTestId('button-link-test');
    fireEvent.click(button);

    expect(button).toBeDefined();
  });

  test('Should call function when make click', () => {
    const mockedFunction = jest.fn();
    const { getByTestId } = render(
      <BaseButton testId="test" onClick={mockedFunction} text="Ingresar" />,
    );

    const button: any = getByTestId('button-test');
    fireEvent.click(button);

    expect(mockedFunction).toHaveBeenCalled();
  });

  test('Should view loading when isLoading is true', () => {
    const mockedFunction = jest.fn();

    const { getByText } = render(
      <BaseButton testId="test" onClick={mockedFunction} text="Ingresar" isLoading />,
    );

    expect(getByText('Ingresar')).toBeDefined();
  });

  test('Should view disable when disabled is true', () => {
    const mockedFunction = jest.fn();

    const { getByTestId } = render(
      <BaseButton testId="test" onClick={mockedFunction} text="Ingresar" disabled />,
    );

    expect(getByTestId('button-test')).toBeDisabled();
  });
});
