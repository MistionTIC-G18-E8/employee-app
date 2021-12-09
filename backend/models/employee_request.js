module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      state: {
        type: String,
        enum: ['approved', 'denied', 'pending'],
        default: 'pending',
        trim: true,
        required: true,
      },
      type: {
        type: String,
        enum: ['leave', 'vacation', 'timeoff', 'sick', 'other'],
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
      days: {
        type: Number,
        required: false,
      },
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
      employee: {
        type: ObjectId,
        required: true,
      },
      approved_by: {
        type: ObjectId,
        required: false,
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

