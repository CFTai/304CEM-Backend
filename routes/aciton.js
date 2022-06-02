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
        return 'Insert success';
    })
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

module.exports = {
    queryAll: queryAll,
    insertOne: insertOne,
    insertMany: insertMany,
};

// const json = [{"name":"Home kit","price":59.99,"salePrice":null,"stock":13,"size":"XS","description":"Home kit","newWeight":200},{"name":"Home kit","price":59.99,"salePrice":null,"stock":9,"size":"S","description":"Home kit","newWeight":200},{"name":"Home kit","price":59.99,"salePrice":null,"stock":4,"size":"M","description":"Home kit","newWeight":200},{"name":"Home kit","price":59.99,"salePrice":null,"stock":10,"size":"L","description":"Home kit","newWeight":200},{"name":"Home kit","price":59.99,"salePrice":null,"stock":18,"size":"XL","description":"Home kit","newWeight":200},{"name":"Away kit","price":59.99,"salePrice":null,"stock":7,"size":"XS","description":"Away kit","newWeight":200},{"name":"Away kit","price":59.99,"salePrice":null,"stock":3,"size":"S","description":"Away kit","newWeight":200},{"name":"Away kit","price":59.99,"salePrice":null,"stock":1,"size":"M","description":"Away kit","newWeight":200},{"name":"Away kit","price":59.99,"salePrice":null,"stock":6,"size":"L","description":"Away kit","newWeight":200},{"name":"Away kit","price":59.99,"salePrice":null,"stock":14,"size":"XL","description":"Away kit","newWeight":200},{"name":"Third kit","price":59.99,"salePrice":null,"stock":1,"size":"XS","description":"Third kit","newWeight":200},{"name":"Third kit","price":59.99,"salePrice":null,"stock":9,"size":"S","description":"Third kit","newWeight":200},{"name":"Third kit","price":59.99,"salePrice":null,"stock":19,"size":"M","description":"Third kit","newWeight":200},{"name":"Third kit","price":59.99,"salePrice":null,"stock":8,"size":"L","description":"Third kit","newWeight":200},{"name":"Third kit","price":59.99,"salePrice":null,"stock":13,"size":"XL","description":"Third kit","newWeight":200}];
// json.forEach(element => {
//     const product = new Product(element);
//     console.log(product);
//     product.save(function (err) {
//         if (err) console.log('error', err);
//         // saved!
//     })
// });