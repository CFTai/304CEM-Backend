// Random product generator

const Product = require('./models/product');

const generateProducts = (arrayLength) => (minCategory, maxCategory) => (minCost, maxCost) => {

    let a = new Array(arrayLength);
  
    for (let i = 0; i < a.length; i++) {
      const minCat = minCategory;
      const maxCat = maxCategory;
      const minPrice = minCost;
      const maxPrice = maxCost;
      const randomCategory = Math.floor(Math.random() * (+maxCat - +minCat)) + +minCat;
      const randomStock = Math.floor((Math.random() * 1000) % 2);
      const randomPrice = (Math.random() * (+maxPrice - +minPrice)) + +minPrice;
      a[i] = {
        "productId": 1000 + i + 1,
        "productCategory": `Category ${randomCategory}`,
        "productName": `Product ${i+1}`,
        "productImage": `https://picsum.photos/400?image=${Math.floor(Math.random()*1000)}`,
        "productStock": !!randomStock,
        "brand": randomCategory,
        "price": randomPrice,
        "stock": i, 
        "salePrice": randomPrice.toFixed(3)
      }
    }
    console.log('Below is your products json array');
    console.log(JSON.stringify(a));
  }

const generateKit = (kitType) => {
  const sizeGroup = ['XS', 'S', 'M', 'L', 'XL'];
  let a = new Array(kitType.length * sizeGroup.length);
  for (let i = 0; i<kitType.length; i++) {
    for (let j = 0; j<sizeGroup.length; j++) {
      const price = 59.99; // Default kit price
      const salePrice = null;
      const stock = Math.floor((Math.random() * 1000) % 20);
      const size = sizeGroup[j];
      const description = `${kitType[i]} kit`;
      const netWeight = 200;
      const name = `${kitType[i]} kit`;
      a[i*sizeGroup.length + j] = {
        "sku": Math.floor((Math.random() * 1000)),
        "name": name,
        "price": price,
        "salePrice": salePrice,
        "stock": stock,
        "size": size,
        "description": description,
        "newWeight": netWeight
      }
    }
  }
  console.log('Below is your products json array');
  console.log(JSON.stringify(a));
}
  
var result = generateKit(['Home', 'Away', 'Third']);
console.log(result)
// const json = [{"sku":"KIT00001","name":"Home kit","price":59.99,"salePrice":null,"stock":7,"size":"XS","description":"Home kit","newWeight":200},{"sku":"KIT00001","name":"Home kit","price":59.99,"salePrice":null,"stock":5,"size":"S","description":"Home kit","newWeight":200},{"sku":"KIT00001","name":"Home kit","price":59.99,"salePrice":null,"stock":5,"size":"M","description":"Home kit","newWeight":200},{"sku":"KIT00001","name":"Home kit","price":59.99,"salePrice":null,"stock":13,"size":"L","description":"Home kit","newWeight":200},{"sku":"KIT00001","name":"Home kit","price":59.99,"salePrice":null,"stock":19,"size":"XL","description":"Home kit","newWeight":200},{"sku":"KIT00002","name":"Away kit","price":59.99,"salePrice":null,"stock":13,"size":"XS","description":"Away kit","newWeight":200},{"sku":"KIT00002","name":"Away kit","price":59.99,"salePrice":null,"stock":7,"size":"S","description":"Away kit","newWeight":200},{"sku":"KIT00002","name":"Away kit","price":59.99,"salePrice":null,"stock":15,"size":"M","description":"Away kit","newWeight":200},{"sku":"KIT00002","name":"Away kit","price":59.99,"salePrice":null,"stock":14,"size":"L","description":"Away kit","newWeight":200},{"sku":"KIT00002","name":"Away kit","price":59.99,"salePrice":null,"stock":18,"size":"XL","description":"Away kit","newWeight":200},{"sku":"KIT00003","name":"Third kit","price":59.99,"salePrice":null,"stock":15,"size":"XS","description":"Third kit","newWeight":200},{"sku":"KIT00003","name":"Third kit","price":59.99,"salePrice":null,"stock":17,"size":"S","description":"Third kit","newWeight":200},{"sku":"KIT00003","name":"Third kit","price":59.99,"salePrice":null,"stock":13,"size":"M","description":"Third kit","newWeight":200},{"sku":"KIT00003","name":"Third kit","price":59.99,"salePrice":null,"stock":9,"size":"L","description":"Third kit","newWeight":200},{"sku":"KIT00003","name":"Third kit","price":59.99,"salePrice":null,"stock":9,"size":"XL","description":"Third kit","newWeight":200}];


// Using this generator or
// GET team member api
// CronJob everyday - Get team squad (require), news and stats (Optional) 
// The type of shirt (Home kit)