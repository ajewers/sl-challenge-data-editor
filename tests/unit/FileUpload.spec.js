import { expect } from 'chai';
import { mount, shallowMount } from '@vue/test-utils';

// Component under test
import FileUpload from '@/components/FileUpload.vue';

// Mock up the Vuex store
import store from '@/store.js';

// A mock file to test insertion
const mockFile = {
  lastModified: 1569772224734,
  name: "TEST_001.csv",
  size: 146,
  type: "",
  webkitRelativePath: ""
};

// A mock CSV string
const mockCSVStr = "ID,Name,Email,Age\n001,Alistair Jewers,alistair.jewers@gmail.com,25\n002,Marshall Mathers,eminem@gmail.com,46\n003,Neil Armstrong,neil@nasa.gov,89";
const mockCSVStrBadLines = "ID,Name,Email,Age";
const mockCSVStrBadFieldCount = "ID,Name,Email,Age\n001,Alistair Jewers,alistair.jewers@gmail.com\n002,Marshall Mathers,eminem@gmail.com,46\n003,Neil Armstrong,neil@nasa.gov,89";

describe('File Upload', () => {
  const wrapper = shallowMount(FileUpload, {
    mocks: {
      $store: store
    }
  });

  it('Shows the file upload box if File is supported, and hides it if not', () => {
    wrapper.setData({ supported: false });
    expect(wrapper.find('.file-upload').exists()).to.equal(false);
    
    wrapper.setData({ supported: true });
    expect(wrapper.find('.file-upload').exists()).to.equal(true);
  });

  it('Parses a valid CSV file string and updates the store', () => {
    // Needs a file value to be set in the store
    store.commit('saveFile', mockFile);

    wrapper.vm.parseCSV(mockCSVStr);

    expect(store.getters.fields.length).to.equal(4);
    expect(store.getters.entries.length).to.equal(3);

    ["ID", "Name", "Email", "Age"].forEach(field => expect(store.getters.fields.includes(field)).to.equal(true));
  });

  it('Also updates class of the file upload box to indicate success', () => {
    expect(wrapper.find('.file-upload').classes().includes('success')).to.equal(true);
  });

  it('Resets the saved data and the file upload box when the reset link is clicked', () => {
    wrapper.find('#reset-link').trigger('click');

    expect(store.getters.file).to.equal(null);
    expect(store.getters.fields.length).to.equal(0);
    expect(store.getters.entries.length).to.equal(0);

    expect(wrapper.find('.file-upload').classes().includes('success')).to.equal(false);
  });

  it('Shows an error if the CSV provided does not have >=2 lines', () => {
    // Needs a file value to be set in the store
    store.commit('saveFile', mockFile);

    wrapper.vm.parseCSV(mockCSVStrBadLines);

    expect(wrapper.find('.file-upload').classes().includes('error')).to.equal(true);
    expect(wrapper.find('.call-to-action').text()).to.equal("CSV file must include at least two lines.");
  });

  it('Also resets the error and data after 3 seconds', () => {
    setTimeout(() => {
      // Error
      expect(wrapper.find('.file-upload').classes().includes('error')).to.equal(false);

      // Data
      expect(store.getters.file).to.equal(null);
      expect(store.getters.fields.length).to.equal(0);
      expect(store.getters.entries.length).to.equal(0);
    }, 3000);
  });

  it('Shows an error if the CSV provided has entries with incorrect numbers of fields', () => {
    // Needs a file value to be set in the store
    store.commit('saveFile', mockFile);

    wrapper.vm.parseCSV(mockCSVStrBadFieldCount);

    expect(wrapper.find('.file-upload').classes().includes('error')).to.equal(true);
    expect(wrapper.find('.call-to-action').text()).to.equal("Line 1 contains incorrect number of values.");
  });
});

// TODO:
//   - Test drag and drop
//   - Test with actual File object based on a real file
