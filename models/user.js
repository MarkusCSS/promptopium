import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique:[true,'Email already exists!'],
        required:[true,'Email is required!'],
    },
    username :{
        type: String,
        required:[true,'Username is required'],
        unique:true,
        match: /^[a-zA-Z0-9čšćČŠĆ\-_\.]{8,20}$/,
    },
    image:{
        type: String,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }]
   
},{timestamps:true});

const User = models.User || model("User",UserSchema);

export default User
