import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../utils/test-utils';
import BasePill from '../BasePill';

describe('<BasePill />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(
      <BasePill backgroundColor="#F04747" text="react" />,
    );

    expect(getByText('react')).toBeDefined();
  });
});
