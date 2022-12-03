const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    tags:{
        type: Array,
        required: false
    },
    content:{
        type:[
            {
                subheading: String,
                subcontent: String,
                uls: Array,
                image: String
            }
        ],
        required: true
    },
    author:{
        type:{
            name:{
                type: String,
                required: true
            },
            about:{
                type: String,
                required: true
            }
        },
        required: true
    },
    topic:{
        type: String,
        required: false
    },
    blogtype:{
        type: String,
        required: true
    }
}, { timestamps : true });

const Blogmod=mongoose.model('Blog', blogSchema);
module.exports = Blogmod;