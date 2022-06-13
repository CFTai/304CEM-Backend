const res = require("express/lib/response");

function queryAll(object, filter={}) {
    let result;
    try {
        result = object.find(filter);
    } catch {
        return next(new Error('Issue'))
    } finally {
        return result;
    }
}

function insertOne(object, data={}) {
    const obj = new object(data);
    obj.save(function (err) {
        if (err) console.log('error', err);
    })
    return obj
}

function insertMany(object, data={}) {
    data.forEach(element => {
        const obj = new object(element);
        obj.save(function (err) {
            if (err) console.log('error', err);
            return 'Records saved'
        })
    });
}

function updateOne(object, target, data={}) {
    let result;
    try {
        result = object.findByIdAndUpdate(target._id, data)
    } catch (err) {
        return next(new Error('Update error'))
    } finally {
        return result
    }
}

function updateMany(object, target, data={}) {
    let result;
    try{
        result = object.updateMany(target, data)
        // target format: {field:{condition e.g. $gte :value}}
    } catch (err) {
        return next(new Error('Update many error'))
    } finally {
        return result
    }
}

function deleteOne(object, target) {
    try {
        return object.deleteOne(target)
    } catch (err) {
        return next(new Error('Delete error'))
    }
}

module.exports = {
    queryAll: queryAll,
    insertOne: insertOne,
    insertMany: insertMany,
    updateOne: updateOne,
    updateMany: updateMany,
    deleteOne: deleteOne,
};
