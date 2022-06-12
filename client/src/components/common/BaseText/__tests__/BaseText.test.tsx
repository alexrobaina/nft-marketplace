import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../utils/test-utils';
import BaseText from '../BaseText';

describe('<BaseText />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(<BaseText text="Texto de prueba" />, {});

    expect(getByText('Texto de prueba')).toBeDefined();
  });
});
