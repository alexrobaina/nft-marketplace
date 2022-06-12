import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../utils/test-utils';
import BaseTitle from '../BaseTitle';

describe('<BaseTitle />', () => {
  test('Should component must render correctly', () => {
    const { getByText }: any = render(<BaseTitle title="Texto de prueba" />);

    expect(getByText('Texto de prueba')).toBeDefined();
  });

  test('Should center text', () => {
    const { getByText }: any = render(<BaseTitle center title="Texto de prueba" />);

    const component = getByText('Texto de prueba');

    expect(component.className).toEqual('title center');
    expect(component).toBeDefined();
  });
});
