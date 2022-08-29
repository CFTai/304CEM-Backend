
# 304CEM Assignment



 Hi, I'm Stephen and this is the repo of my 304CEM Assignment, which is created by using node.js and express.js.


## Installation

Make sure you have intstalled mongodb in your machine and power it on

```bash
    cd /path/to/the/304CEM-Backend
    npm i
    node app.js
```
I've made a postman collection for this repo and you could download it [here](
https://github.com/CFTai/304CEM-Backend/blob/main/304CEM.postman_collection.json)

Before start the service, 
you could generate a random product list by enter this:

```bash
    node test.js
```

You will get a json array like this

```bash
[
    {
        "sku":972,
        "name":"Home kit",
        "price":59.99,
        "salePrice":null,
        "stock":0,
        "size":"XS",
        "description":"Home kit",
        "newWeight":200
    },
    ....
]
```


## Features
