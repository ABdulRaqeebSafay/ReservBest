import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  userEmail: String,
  userPassword: String,
  role: String,
  hotelName: { type: String, required: function() { return this.role === 'admin'; } },
});

const User = mongoose.model('User', userSchema);

export default User;
