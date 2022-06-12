import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseErrorMessage from '../BaseErrorMessage';

describe('<BaseErrorMessage />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(<BaseErrorMessage text="Error" />, {});

    expect(getByText('Error')).toBeDefined();
  });
});
