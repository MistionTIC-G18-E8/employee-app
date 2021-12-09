module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    // TODO: Theres' further validation to be done on the schema
    {
      first_name: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 100
      },
      last_name: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 100
      },
      email: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 100
      },
      phone: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 20
      },
      address: {
        type: String,
        default: '',
        trim: true,
        required: false,
        maxlength: 200
      },
      gender: {
        type: String,
        enum : ['male', 'female'],
        trim: true,
        required: true,
      },
      joined_at: {
        type: Date,
        default:Date.now,
        required: false,
      },
      left_at: {
        type: Date,
        default:Date.now,
        required: false,
      },
      contract: {
        type: ObjectId,
        required: true,
      },
      jobtitle: {
        type: String,
        default: '',
        required: false,
        maxlength: 100
      },
      department: {
        type: String,
        default: '',
        required: false,
        maxlength: 100
      },
    },
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Employee = mongoose.model("employee", schema);
  return Employee;
};
