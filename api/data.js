const products = [
  {
    id: 1,
    name: 'Butter Chicken',
    available_quantity: 5,
    price: 150,
    description: 'Perhaps the most ubiquitous Indian dish out there, butter chicken originally comes from New Delhi, and was invented by restaurateurs in the 1950s to salvage leftover chicken.'
  },

  {
    id: 2,
    name: 'Chicken Tikka Masala',
    available_quantity: 6,
    price: 180,
    description: 'Unlike butter chicken, this dish was not invented in India. It is a British invention and is often spicer than its similarly hued counterpart. You usually cannot go wrong with chicken tikka masala, no matter where you are ordering it.'
  },

  {
    id: 3,
    name: 'Saag Paneer',
    available_quantity: 3,
    price: 120,
    description: 'Paneer is a soft, unaged cheese that you will find yourself eagerly fishing for, in order to score all the cubes before everyone else does. But the saag, which can be made with other leafy greens besides spinach, such as mustard greens, is also delicious when scooped up with naan.'
  },

  {
    id: 4,
    name: 'Rogan Josh',
    available_quantity: 4,
    price: 200,
    description: 'A curry for lamb lovers, which has roots in Kashmiri and Persian cuisines. It is deeply flavored with aromatics like ginger, bay leaves, and cardamom, plus ground dried chiles. An absolutely soul-warming dish and a great curry to splurge on.'
  },

  {
    id: 5,
    name: 'Aloo Gobhi',
    available_quantity: 4,
    price: 120,
    description: 'This highly comforting option gets its yellow hue from turmeric, and rounds out a meal for both vegetarians and meat-eaters alike. Some versions have tomatoes while others do not, but no matter the specific ingredients, this is a side (or a vegan main) you will want to order.'
  },

  {
    id: 6,
    name: 'Tandoori Chicken',
    available_quantity: 4,
    price: 120,
    description: 'Traditionally, tandoori chicken is roasted in a clay oven called a tandoor. The chicken is marinated in yogurt and spices overnight before it goes in the tandoor on long skewers. If your kitchen or takeout spot does not have a clay oven, a grill or broiler will do the trick.'
  },
  {
    id: 7,
    name: 'Chana Dal',
    available_quantity: 4,
    price: 150,
    description: 'Chana dal is a dish consisting primarily of split chickpeas stewed with spices such as turmeric. Dal also refers to other legumes such as peas, kidney beans, and lentils, and it is possible you might also find these varieties on your restaurant menu.'
  },

  {
    id: 8,
    name: 'Chicken Korma',
    available_quantity: 5,
    price: 165,
    description: 'If spicy food is not your game, korma might be a safer bet. This curry dish is often made with coconut milk and ground up almonds or cashews, which give the sauce a pleasant nutty flavor and smoothness. The mildness of the sauce lets the aroma of milder spices shine.'
  },

  {
    id: 9,
    name: 'Chicken Jalfrezi',
    available_quantity: 6,
    price: 175,
    description: 'Chicken jalfrezi is characterized by its large pieces of onions and red and green peppers, which make this dish similar to a stir fry. The meat and vegetables are cooked in oil and spices, then tomatoes are added to create a thick, chunky sauce. Go crazy, jalfrezi.'
  },
  
  {
    id: 10,
    name: 'Biryani',
    available_quantity: 4,
    price: 155,
    description: 'Biryani is like Indian fried rice. Rice is the primary ingredient to which any combination of meats, vegetables, dried fruits, nuts, and spices are added. Some biryanis contain raisins, which add a level of sweetness to the otherwise savory and flavorful dish.'
  },
  
  {
    id: 11,
    name: 'Naan',
    available_quantity: 50,
    price: 20,
    description: 'Naan is the bread you will use to soak up all of the sauce left on your plate. It is usually pillowy soft, warm, and brushed with oil and herbs. You can customize your naan with a few different additions, and garlic is always a good way to go.'
  },
  
  
  {
    id: 12,
    name: 'Gajar ka Halwa',
    available_quantity: 4,
    price: 120,
    description: 'Gajar ka halwa is often consumed during Indian festivals like Diwali and Holi, but one bite of this traditional sweet dish will make any day feel like a holiday.'
  },
  

];



const users = [
    {
      'name': 'user',
      'password': 'qwerty'
    },
    {
      'name': 'example',
      'password': 'qwerty'
    }
];

module.exports = { 'products': products, users: users }