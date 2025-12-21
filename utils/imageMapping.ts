// Map destination queries to Unsplash image URLs
const imageMap: Record<string, string> = {
  'barcelona spain sagrada familia': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
  'prague czech republic castle': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
  'amsterdam canals netherlands': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
  'santorini greece sunset': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  'algarve portugal beach cliffs': 'https://images.unsplash.com/photo-1553770230-4a6e0dbcc1d0?w=800&q=80',
  'dubrovnik croatia coast': 'https://images.unsplash.com/photo-1555990538-c3d0a4626f85?w=800&q=80',
  'swiss alps matterhorn': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
  'dolomites italy mountains': 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
  'scottish highlands mountains': 'https://images.unsplash.com/photo-1600693414923-8f3d03b65e0f?w=800&q=80',
  'tokyo japan city skyline': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  'bangkok thailand temple': 'https://images.unsplash.com/photo-1563492065213-f357e176fdae?w=800&q=80',
  'singapore marina bay gardens': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
  'maldives beach overwater bungalow': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
  'bali indonesia beach temple': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  'phuket thailand beach': 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80',
  'himalayas nepal mountains everest': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
  'japanese alps mountains village': 'https://images.unsplash.com/photo-1624225372998-0a5c22f26db8?w=800&q=80',
  'cameron highlands malaysia tea plantation': 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800&q=80',
  'new york city skyline': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  'buenos aires argentina colorful buildings': 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
  'mexico city historic center': 'https://images.unsplash.com/photo-1518659744732-86c7706f1bc2?w=800&q=80',
  'cancun mexico caribbean beach': 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
  'rio de janeiro copacabana beach': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
  'caribbean beach turquoise water': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  'rocky mountains canada lake': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
  'patagonia torres del paine': 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=800&q=80',
  'andes peru machu picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
  'marrakech morocco medina': 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
  'cape town table mountain': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
  'cairo egypt pyramids': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80',
  'zanzibar tanzania beach': 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80',
  'seychelles beach granite rocks': 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80',
  'mauritius beach lagoon': 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80',
  'atlas mountains morocco berber village': 'https://images.unsplash.com/photo-1609198092357-520d0eb3f4f8?w=800&q=80',
  'drakensberg south africa mountains': 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800&q=80',
  'mount kilimanjaro tanzania': 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800&q=80',
  'sydney opera house harbour': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
  'auckland new zealand skyline': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
  'melbourne australia laneways': 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80',
  'great barrier reef australia coral': 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
  'fiji islands beach palm trees': 'https://images.unsplash.com/photo-1583414520292-cf5a7b364d99?w=800&q=80',
  'whitehaven beach whitsundays': 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80',
  'southern alps new zealand mount cook': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  'queenstown new zealand remarkables': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
  'blue mountains australia three sisters': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80'
};

// Additional mappings for destination highlights and attractions
const highlightImages: Record<string, string> = {
  // Barcelona
  'barcelona sagrada familia': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
  'barcelona park güell': 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80',
  'barcelona la rambla': 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80',
  'barcelona gothic quarter': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
  
  // Prague
  'prague prague castle': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
  'prague charles bridge': 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&q=80',
  'prague old town square': 'https://images.unsplash.com/photo-1600035804808-67c81935c9ad?w=800&q=80',
  'prague astronomical clock': 'https://images.unsplash.com/photo-1551969657-eb4c2e5a3f8f?w=800&q=80',
  
  // Amsterdam
  'amsterdam anne frank house': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
  'amsterdam van gogh museum': 'https://images.unsplash.com/photo-1584003564911-75a0c05e31e5?w=800&q=80',
  'amsterdam canal ring': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80',
  'amsterdam jordaan district': 'https://images.unsplash.com/photo-1533920379810-6bedac961555?w=800&q=80',
  
  // Santorini
  'santorini oia sunset': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  'santorini red beach': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
  'santorini caldera views': 'https://images.unsplash.com/photo-1524504542257-92eba4ea3e6c?w=800&q=80',
  'santorini ancient akrotiri': 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  
  // Algarve
  'algarve benagil cave': 'https://images.unsplash.com/photo-1588418058463-9a37d7fa3d00?w=800&q=80',
  'algarve lagos cliffs': 'https://images.unsplash.com/photo-1553770230-4a6e0dbcc1d0?w=800&q=80',
  'algarve praia da marinha': 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=800&q=80',
  'algarve vilamoura marina': 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
  
  // Croatian Coast
  'croatian coast dubrovnik walls': 'https://images.unsplash.com/photo-1555990538-c3d0a4626f85?w=800&q=80',
  'croatian coast plitvice lakes': 'https://images.unsplash.com/photo-1567171586119-6b6c8f5f8355?w=800&q=80',
  'croatian coast hvar island': 'https://images.unsplash.com/photo-1606146485162-7a3a5386c6e4?w=800&q=80',
  'croatian coast split palace': 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80',
};

export function getImageForDestination(query: string): string {
  // First try exact match in main map
  if (imageMap[query]) return imageMap[query];
  
  // Then try highlights map
  if (highlightImages[query]) return highlightImages[query];
  
  // Default fallback
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
}