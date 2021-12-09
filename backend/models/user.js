module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      email: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 100
      },
      employee: {
        type: ObjectId,
        required: true,
      },
      salt: {
        type: String,
        default: '',
        trim: true,
        required: false,
      },
      hash: {
        type: String,
        default: '',
        trim: true,
        required: false,
      },
      // TODO: Define the constants for permissions
      permission: {
        type: Number,
        default: 10,
        required: true,
      }
    },
  );

  // TODO: Method save needs overwritting to hash password
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
