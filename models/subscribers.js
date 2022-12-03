const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const SubscribersSchema = new Schema ({
    email:{
        type: String,
        required: true,
        //validate: [ isEmail, 'invalid email' ]
    },
    subscribed:{
        type: Boolean,
        required:false
    },
    location:{
        type: String,
        required: false
    }
}, { timestamps : true });

const Subscribers=mongoose.model('Subscriber',SubscribersSchema );
module.exports = Subscribers;