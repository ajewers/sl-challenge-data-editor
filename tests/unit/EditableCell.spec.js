import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

// Component under test
import EditableCell from '@/components/EditableCell.vue';

// Mock up the Vuex store with some initial data
import store from '@/store.js';
store.replaceState({
  file: null,
  fields: ['MockField'],
  entries: [{
    MockField: 'Mock Value'
  }],
  activeCell: ""
});

// Mock some props
const mockProps = {
  value: 'Mock Value',
  id: 'Mock Cell ID',
  entry: 0,
  field: 'MockField'
}

const mockNewValue = "New Value";

describe('Editable Table Cell', () => {
  const wrapper = shallowMount(EditableCell, {
    propsData: mockProps,
    mocks: {
      $store: store
    }
  });

  it('Renders props.value when passed', () => {
    expect(wrapper.vm.value).to.equal(mockProps.value);
    expect(wrapper.text()).to.include(mockProps.value);
  });

  it('Shows the text input and hides the text value when clicked', () => { 
    wrapper.trigger('click');

    expect(wrapper.find('#input').isVisible()).to.equal(true);
    expect(wrapper.find('#value').isVisible()).to.equal(false);
  });

  it('Also updates the active cell value in the store when clicked', () => {
    expect(store.getters.activeCell).to.equal(mockProps.id);
  });

  it('Resets visibilities when escape is pressed', () => {
    wrapper.find('#input').trigger('keyup.esc');

    expect(wrapper.find('#input').isVisible()).to.equal(false);
    expect(wrapper.find('#value').isVisible()).to.equal(true);
  });

  it('Updates store when value is changed and enter is pressed', () => {
    wrapper.trigger('click');
    wrapper.find('#input').setValue(mockNewValue);
    wrapper.find('#input').trigger('keyup.enter');

    expect(store.getters.entries[mockProps.entry][mockProps.field]).to.equal(mockNewValue);
  });

  it('Also resets visibilities after saving is complete', () => {
    expect(wrapper.find('#input').isVisible()).to.equal(false);
    expect(wrapper.find('#value').isVisible()).to.equal(true);
  });

  it('Visiblity is reset if the active cell value changes to another whilst editing', () => {
    wrapper.trigger('click');

    expect(wrapper.find('#input').isVisible()).to.equal(true);
    expect(wrapper.find('#value').isVisible()).to.equal(false);

    store.commit('setActiveCell', "ADifferentCellID");

    expect(wrapper.find('#input').isVisible()).to.equal(false);
    expect(wrapper.find('#value').isVisible()).to.equal(true);
  });
});
