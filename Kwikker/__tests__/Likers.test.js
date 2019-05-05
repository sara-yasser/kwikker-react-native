import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import LikersList from '../App/Screens/Likers/Likers';


describe('Likers component', () => {
  it('list of users liked a certain kweek', () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn(), getParam: jest.fn(), state: { params: { kweekId: 'kweekId' } } };
    const wrapper = shallow(<LikersList
      navigation={navigationMock}
    />);
    const instance = wrapper.instance();
    expect(mockAxios.put).toHaveBeenCalledTimes(0);
  });
});