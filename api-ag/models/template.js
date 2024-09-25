const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  componentName: {
    type: String,
    required: true,
  },
  componentType: {
    type: String,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
  componentData: {
    type: Object,
    required: false,
  },
});

const templateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  components: {
    type: [componentSchema],
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  validityFrom: {
    type: Date,
    required: false,
    default: null,
  },
  validityTo: {
    type: Date,
    required: false,
    default: null,
  },
  nullDate: {
    type: Date,
    required: false,
    default: null,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
