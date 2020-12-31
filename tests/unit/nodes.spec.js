import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import Nodes from '@/views/Nodes.vue'
import Node from '@/components/Node.vue'
import store from '../../src/store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('<Nodes />', () => {
  const defaultProps = {};

  //mocks fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ el: { url: 'https://thawing-springs-53971.herokuapp.com' }, node_name: 'Test Name' }),
    })
  );

  const render = (props = {}) => shallowMount(Nodes, {
    store,
    propsData: {
      ...defaultProps,
      ...props
    }
  });
  
  it('renders', () => {
    const wrapper = render();
    expect(wrapper.find('.blocks-wrapper').exists()).toBeTruthy;
  });

  it('match the snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders nodes', () => {
    const wrapper = render();
    expect(wrapper.findComponent(Node).exists()).toBeTruthy;
  });
});