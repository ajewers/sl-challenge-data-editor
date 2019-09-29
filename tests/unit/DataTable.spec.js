import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

// Component under test
import DataTable from '@/components/DataTable.vue';

// Mock some props
const mockProps = {
  fields: ["ID", "Name", "Age"],
  entries: [
    {
      ID: "001",
      Name: "Alistair Jewers",
      Age: "25"
    },
    {
      ID: "002",
      Name: "Jistair Alewers",
      Age: "52"
    },
    {
      ID: "003",
      Name: "Gandalf the Grey",
      Age: "3000"
    }
  ]
}

describe('Data Table', () => {
  const wrapper = shallowMount(DataTable, {
    propsData: mockProps
  });

  it('Creates a table header for each field', () => {
    mockProps.fields.forEach((field, index) => {
      let heading = wrapper.find('th#' + field + "-" + index);

      expect(heading.exists()).to.equal(true);
      expect(heading.text()).to.equal(field);
    });
  });

  it('Creates a table row for each entry', () => {
    mockProps.entries.forEach((entry, index) => {
      let row = wrapper.find('tr#entry-' + index);

      expect(row.exists()).to.equal(true);
    })
  });

  it('Creates a table cell for each value', () => {
    mockProps.entries.forEach((entry, enIndex) => {
      mockProps.fields.forEach(field => {
        let cell = wrapper.find('#entry-' + enIndex + "-" + field);
        
        expect(cell.exists()).to.equal(true);
        expect(cell.props('value')).to.equal(entry[field]);
      });
    });
  });
})