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
  componentData: {
    type: Object,
    required: true,
  },
});

const templateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  components: {
    type: [componentSchema],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
