  
const { v4: uuidv4 } = require('uuid');


let posts = [
    {
    id: 1,
    title: "2kg dumbbells",
    description: "Very good condition, pair of 2kg dumbbells!",
    category: "Fitness",
    location: "Oulu, FI",
    image: "http://image.thissite.com/images/123.png",
    price: 23.99,
    dateOfPosting: "2021-01-01",
    delivery: "Pick up",
    sellerName: "tester",
    sellerPhone: "0881231234",
    sellerEmail: "seller@thisstore.com"
  },
  {
    id: 2,
    title: "Used Phone",
    description: "Cracked screen, still works fine",
    category: "Electronics",
    location: "Helsinki, FI",
    image: "http://image.thissite.com/images/123.png",
    price: 233.99,
    dateOfPosting: "2021-01-01",
    delivery: "Pick up",
    sellerName: "tester",
    sellerPhone: "0881231234",
    sellerEmail: "seller@thisstore.com"
  },
  {
    id: 3,
    title: "500kg dumbbells",
    description: "Very good condition, pair of 2kg dumbbells!",
    category: "Fitness",
    location: "Oulu, FI",
    image: "http://image.thissite.com/images/123.png",
    price: 23.99,
    dateOfPosting: "2021-01-01",
    delivery: "Pick up",
    sellerName: "notty",
    sellerPhone: "0881231234",
    sellerEmail: "seller@thisstore.com"
  },
  {
    id: 3,
    title: "1999 Corolla",
    description: "Very good condition, pair of 2kg dumbbells!",
    category: "Cars",
    location: "Oulu, FI",
    image: "http://image.thissite.com/images/123.png",
    price: 0.99,
    dateOfPosting: "2021-01-01",
    delivery: "Pick up",
    sellerName: "kallelaama",
    sellerPhone: "0881231234",
    sellerEmail: "seller@thisstore.com"
  },
];

module.exports = {
    InsertPost: (title,
        description,
        category,
        location,
        image,
        price,
        dateOfPosting,
        delivery,
        sellerName,
        sellerPhone,
        sellerEmail) => {
    posts.push({
      id: uuidv4(),
      title,
      description,
      category,
      location,
      image,
      price,
      dateOfPosting,
      delivery,
      sellerName,
      sellerPhone,
      sellerEmail
    });
  },
  UpdatePost: (id,
        title,
        description,
        category,
        location,
        image,
        price,
        dateOfPosting,
        delivery,
        sellerName,
        sellerPhone,
        sellerEmail,
        index) => {
    let tempArr = []
    tempArr.push({
      id,
      title,
      description,
      category,
      location,
      image,
      price,
      dateOfPosting,
      delivery,
      sellerName,
      sellerPhone,
      sellerEmail
    })
    posts[index] = tempArr[0]
    tempArr = []
    ;
  },
  getAllPosts: () => posts,
  getAllUserPosts: (username) => posts.filter(p => p.sellerName == username),
  getAllCategoryPosts: (category) => posts.filter(p => p.category == category),
  getAllLocationPosts: (location) => posts.filter(p => p.location == location),
  getPost: (postId) => posts.find(p => p.id == postId),
  getPostIndex: (postId) => posts.findIndex(p => p.id == postId)
}