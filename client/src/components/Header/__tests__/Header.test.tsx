import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../utils/test-utils';
import Header from '../Header';

describe('<Header />', () => {
  test('Should component must render correctly', () => {
    const { getByTestId }: any = render(<Header />);

    const component = getByTestId('header-app');

    expect(component.className).toEqual('header');
  });
});
