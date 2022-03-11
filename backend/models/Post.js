const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        validate: {
            validator: function () {
                if((!this.isModified('description') && this.image)) return true;
                if((!this.description && !this.image)) return false;
            },
            message: 'Something went wrong!'
        }
    },
    image: {
        type: String,
        validate: {
            validator: function () {
                if ((!this.isModified('image') && this.description)) return true;
                if (!this.image && !this.description) return true;
            },
            message: 'Enter image or description!'
        },
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;