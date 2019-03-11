import Home from './Home';
import { shallow } from 'enzyme';
import React from 'react';

describe('Home', () => {
    it('Should render', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper).not.toBeNull();
    });
});