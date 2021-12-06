module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      state: {
        type: String,
        enum: 'approved' || 'denied' || 'pending',
        default: 'pending',
        trim: true,
        required: true,
      },
      type: {
        type: String,
        enum: 'vacation' || 'timeoff',
        default: 'pending',
        trim: true,
        required: true,
      },
      paid: {
        type: Boolean,
        required: true,
        default: true,
      },
      contract: {
        type: ObjectId,
        required: true,
      },
      employee: {
        type: ObjectId,
        required: true,
      },
      approved_by: {
        type: ObjectId,
        required: true,
      },
      date: {
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

  const EmployeeRequest = mongoose.model("employee_request", schema);
  return EmployeeRequest;
};

