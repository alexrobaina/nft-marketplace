import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import BaseLabel from '../BaseLabel';

describe('<BaseLabel />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(<BaseLabel text="Text label" />, {});

    expect(getByText('Text label')).toBeDefined();
  });
});
