const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Ties' }, 
        { name: 'Hats' },
        { name: 'socks' }
    ]);

    console.log('categories seeded');

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Green Tie',
            description:
                'Solid green avoca sheep tie.',
            image: 'green-tie.jpg',
            category: categories[0]._id,
            price: 99.99,
            quantity: 1
        },
        {
            name: 'Wool Flat Cap',
            description: 
                'Avoca sheep wool, flat cap.',
            image: 'flat-cap.jpg',
            category: categories[1]._id,
            price: 129.99,
            quantity: 1
        },
        {
            name: 'Wool Socks',
            description: 
                'Assorted wool socks.',
            image: 'wool-socks.jpg',
            category: categories[2]._id,
            price: 29.99,
            quantity: 2
        }
    ]);

    console.log('products seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pwashington@testmail.com',
        password: 'password123',
        orders: [
            {
                products: [products[0]._id, products[0]._id, products[1]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        password: 'password1234',
    })

    console.log('users seeded');

    process.exit();
})