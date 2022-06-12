import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../utils/test-utils';
import Layout from '../Layout';

describe('<Layout />', () => {
  test('Should render component corrently', () => {
    const { getByText }: any = render(
      <Layout testID="layout">
        <div>hola mundo</div>
      </Layout>,
    );

    const component: any = document.querySelector('.layout');

    expect(component.className).toEqual('layout');

    expect(getByText('hola mundo')).toBeDefined();
  });
});
