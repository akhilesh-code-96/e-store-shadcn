const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    issue: { type: String, required: true },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
