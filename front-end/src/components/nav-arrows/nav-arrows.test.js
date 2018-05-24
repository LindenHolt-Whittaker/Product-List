import React from 'react';
import ReactDOM from 'react-dom';
import NavArrows from './nav-arrows';

import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new ReactSixteenAdapter()});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <NavArrows/> , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('calls prop method onClick()', () => {
    const baseProps = {
        getProducts: jest.fn(),
    }
    const wrapper = shallow(<NavArrows {...baseProps} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onClick');

    expect(instance.onClick).not.toHaveBeenCalled();
    wrapper.find('.nav__arrow.right').simulate('click');
    expect(instance.onClick).toHaveBeenCalledWith('right');
    expect(baseProps.getProducts).toHaveBeenCalledWith('right');

    wrapper.find('.nav__arrow.left').simulate('click');
    expect(instance.onClick).toHaveBeenCalledWith('left');
    expect(baseProps.getProducts).toHaveBeenCalledWith('left');
});
  