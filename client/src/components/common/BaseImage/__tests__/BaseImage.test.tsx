import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../utils/test-utils';
import BaseImage from '../BaseImage';

describe('<BaseImage />', () => {
  test('Should component must render correctly', () => {
    const { getByTestId } = render(
      <BaseImage
        circle
        center
        pointer
        width={100}
        height={100}
        alt="portrait"
        testId="test"
        marginTop={200}
        src="https://images.unsplash.com/photo-1634054191653-c16532a810db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80"
      />,
    );

    const image = getByTestId('base-image-test');

    expect(image).toBeDefined();
  });
});
