const mongoose = require('mongoose');
const config = require('./config');
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, user1] = await User.create({
        email: 'user@gmail.com',
        name: 'user',
        password: '123',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'user1@gmail.com',
        name: 'user1',
        password: '123',
        token: '8enDI2paOqusBavVWOnwL'
    });

    const [post1, post2] =  await Post.create({
        user: user,
        date: new Date().toISOString(),
        title: 'New post',
        description: 'New post description',
    }, {
        user: user1,
        date: new Date().toISOString(),
        title: 'New post1',
        description: 'New post description1',
    });

    await Comment.create({
        user: user,
        post: post2,
        text: 'New comment'
    }, {
        user: user1,
        post: post1,
        text: 'New comment1'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));