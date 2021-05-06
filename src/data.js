import faker from 'faker';

faker.seed(123);

export const brands = [
	'Brustro',
	'Bianyo',
	'Camel',
	'DOMS',
	'Faber Castell',
	'Staedtler'
];

export const productsList = [...Array(50)].map((item) => ({
	id: faker.random.uuid(),
	name: faker.commerce.productName(),
	image: faker.random.image(),
	price: faker.commerce.price(),
	material: faker.commerce.productMaterial(),
	brand: faker.random.arrayElement([...brands]),
	inStock: faker.random.boolean(),
	fastDelivery: faker.random.boolean(),
	ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
	offer: faker.random.arrayElement(['30% off', '70% off', '20% off']),
	idealFor: faker.random.arrayElement(['Men', 'Women', 'Girl', 'Boy', 'Senior']),
	level: faker.random.arrayElement([
		'beginner',
		'amateur',
		'intermediate',
		'advanced',
		'professional'
	]),
	color: faker.commerce.color()
}));
