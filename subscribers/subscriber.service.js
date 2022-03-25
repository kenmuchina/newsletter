// const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// ------------------------- READ ----------------------------
async function getAll() {
    return await db.Subscriber.findAll();
}

async function getById(id) {
    return await getSubscriber(id);
}

// -------------------------- CREATE ---------------------------
async function create(params) {
    // validate that there is no such subscriber
    if (await db.Subscriber.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // instantiate a new subscriber
    const subscriber = await db.Subscriber.create(params);
    console.log(subscriber.dataValues)
    return subscriber.dataValues
    
    // hash password
    // subscriber.passwordHash = await bcrypt.hash(params.password, 10);

    // save subscriber
    // subscriber.save().then(() => {
    //     return subscriber.dataValues
    // })
}


// ------------------------ UPDATE -----------------------------------
async function update(id, params) {
    const subscriber = await getSubscriber(id);

    // validate
    const emailChanged = params.email && subscriber.email !== params.email;
    if (emailChanged && await db.Subscriber.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to subscriber and save
    Object.assign(subscriber, params);
    await subscriber.save();
}


// ---------------------------- DELETE -----------------------
async function _delete(id) {
    const subscriber = await getSubscriber(id);
    await subscriber.destroy();
}

// Helper functions
async function getSubscriber(id) {
    const subscriber = await db.Subscriber.findByPk(id);
    if (!subscriber) throw 'subscriber not found';
    return subscriber;
}
