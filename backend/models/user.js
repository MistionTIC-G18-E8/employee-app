bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

module.exports = (mongoose) => {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  var schema = mongoose.Schema(
    {
      email: {
        type: String,
        default: '',
        trim: true,
        required: true,
        maxlength: 100,
        unique: true
      },
      employee: {
        type: ObjectId,
        required: true,
        unique: true
      },
      password: {
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


  // Only invoked in save, not update, need a different method to update the password
  schema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

  schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  schema.methods.updatePassword = async function(newPassword, cb) {
    var user = this;
    user.password = newPassword;
    user.save().then(() => {
      cb(true);
    }).catch((err) => {
      cb(err);
    });
  };

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
