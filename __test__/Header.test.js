import React from 'react';
import Header from '../src/component/Header.tsx';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const mockStore = configureStore([]);

describe('please...', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      state: 'plz'
    });
    component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });
  it('you? can?', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
