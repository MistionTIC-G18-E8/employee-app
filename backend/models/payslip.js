module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      amount: {
        type: Number,
        default: 0,
        required: true,
      },
      days: {
        type: Number,
        default: 0,
        required: true,
      },
      days_not: {
        type: Number,
        default: 0,
        required: true,
      },
      contract: {
        type: ObjectId,
        required: true,
      },
      employee: {
        type: ObjectId,
        required: true,
      },
      start: {
        type: Date,
        default: Date.now,
        required: true,
      },
      end: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Payslip = mongoose.model("payslip", schema);
  return Payslip;
};
