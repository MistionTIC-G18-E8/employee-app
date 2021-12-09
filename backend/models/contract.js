module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      daily_rate: {
        type: Number,
        default: 0,
        required: true,
      },
      monthly_rate: {
        type: Number,
        default: 0,
        required: true,
      },
      employee: {
        type: ObjectId,
        required: false,
      },
      start: {
        type: Date,
        default: Date.now,
        required: true,
      },
      end: {
        type: Date,
        default: Date.now,
        required: false,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Contract = mongoose.model("contract", schema);
  return Contract;
};
