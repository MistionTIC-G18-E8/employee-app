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
      address: {
        type: String,
        default: '',
        trim: true,
        required: false,
        maxlength: 200
      },
      gender: {
        type: String,
        enum : 'male'||'female',
        trim: true,
        required: true,
        maxlength: 100
      },
      joined_at: {
        type: Date,
        default:Date.now,
        required: false,
        maxlength: 100
      },
      left_at: {
        type: Date,
        default:Date.now,
        required: false,
        maxlength: 100
      },
      contract: {
        type: ObjectId,
        required: true,
      },
      contract_start: {
        type: Date,
        default:Date.now,
        required: true,
      },
      contract_end: {
        type: Date,
        default:Date.now,
        required: false,
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
      salary: {
        type: Number,
        default: '',
        required: true,
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
