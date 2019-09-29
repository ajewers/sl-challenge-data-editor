import { expect } from 'chai';
import { getters } from '@/store.js';
import { mutations } from '@/store.js';

const { file, fields, entries, activeCell } = getters;
const { saveFile, saveCSVData, updateEntry, clearData, setActiveCell } = mutations;

// Some test data to insert
const testFields = ["ID", "Name", "Age"];

const testEntries = [
  {
    ID: "001",
    Name: "Ali Jewers",
    Age: 25
  },
  {
    ID: "002",
    Name: "David Beckham",
    Age: 44
  }
];

// A mock file to test insertion
const testFile = {
  lastModified: 1569772224734,
  name: "TEST_001.csv",
  size: 146,
  type: "",
  webkitRelativePath: ""
}

describe('Vuex Getters', () => {
  const state = {
    file: testFile,
    fields: testFields,
    entries: testEntries,
    activeCell: "TestActiveCell"
  };

  it('File', () => {
    expect(file(state)).to.equal(state.file);
  });

  it('Fields', () => {
    expect(fields(state)).to.equal(state.fields);
  });

  it('Entries', () => {
    expect(entries(state)).to.equal(state.entries);
  });

  it('Active Cell', () => {
    expect(activeCell(state)).to.equal(state.activeCell);
  });
});

describe('Vuex Mutations', () => {
  it('Save File', () => {
    const state = {
      file: null
    };

    saveFile(state, testFile);

    expect(state.file).to.equal(testFile);
  });

  it('Save CSV Data', () => {
    const state = {
      fields: [],
      entries: []
    };

    saveCSVData(state, { fields: testFields, entries: testEntries });

    expect(state.fields.length).to.equal(testFields.length);
    expect(state.entries.length).to.equal(testEntries.length);

    testFields.forEach((testField, index) => {
      expect(state.fields[index]).to.equal(testField);
    });

    testEntries.forEach((testEntry, index) => {
      expect(state.entries[index]).to.equal(testEntry);
    });
  });

  it('Update Entry', () => {
    const state = {
      fields: ["ID", "StringValue"],
      entries: [
        {
          ID: "001",
          StringValue: "Test String 001"
        },
        {
          ID: "002",
          StringValue: "Test String 002"
        },
        {
          ID: "003",
          StringValue: "Test String 003"
        }
      ]
    };

    updateEntry(state, { entry: 1, field: "StringValue", value: "Modified String" });

    expect(state.entries[1].StringValue).to.equal("Modified String");

    expect(state.entries[0].StringValue).to.equal("Test String 001");
    expect(state.entries[2].StringValue).to.equal("Test String 003");
  });

  it('Clear Data', () => {
    const state = {
      fields: ["ID", "StringValue"],
      entries: [
        {
          ID: "001",
          StringValue: "Test String 001"
        },
        {
          ID: "002",
          StringValue: "Test String 002"
        },
        {
          ID: "003",
          StringValue: "Test String 003"
        }
      ]
    };

    clearData(state);

    expect(state.fields.length).to.equal(0);
    expect(state.entries.length).to.equal(0);
  });

  it ('Set Active Cell', () => {
    const state = {
      activeCell: null
    };

    setActiveCell(state, "ActiveCellID");

    expect(state.activeCell).to.equal("ActiveCellID");
  });
});
