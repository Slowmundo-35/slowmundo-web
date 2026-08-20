const fs = require('fs');

// 1. Home.tsx
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Hero section image
homeCode = homeCode.replace('1515542706656-8bc542cc7ed8', '1522856339183-5a7071ea91ce'); // Train traveler -> Girl looking out train window

// L'échappée nordique (id: 10) smallImage1 and smallImage2
homeCode = homeCode.replace('1513554162181-79e43685f039', '1476610182048-b716b8518aae');
homeCode = homeCode.replace('1520114008139-4d6402446738', '1531366936337-7c912a4589a7');

// La Route de la Soie Verte (id: 11) mainImage, smallImage1, smallImage2
homeCode = homeCode.replace('1540866225557-9e4c86aa3151', '1528629297340-d1af345df05b');
homeCode = homeCode.replace('1518600863-718eebdfc62f', '1492582846171-84090b83e4a2');
homeCode = homeCode.replace('1581414436511-9fbdac6ec771', '1511210419358-132d7b43fcf3');

// Dolce Vita en Train (id: 12) mainImage
homeCode = homeCode.replace('1516483638261-f40af5a5fac6', '1498503182468-3b51cbb6cb24');

// Lunes de miel green
homeCode = homeCode.replace('1530739943632-4e0fa80cdbb5', '1510414842594-a618690c4800');

fs.writeFileSync('src/pages/Home.tsx', homeCode);

// 2. trips.ts
let tripsCode = fs.readFileSync('src/data/trips.ts', 'utf8');

// L'échappée nordique (id: 10) in trips.ts
tripsCode = tripsCode.replace('1513554162181-79e43685f039', '1476610182048-b716b8518aae');
tripsCode = tripsCode.replace('1520114008139-4d6402446738', '1531366936337-7c912a4589a7');

// La Route de la Soie Verte (id: 11) in trips.ts
tripsCode = tripsCode.replace('1540866225557-9e4c86aa3151', '1528629297340-d1af345df05b');
tripsCode = tripsCode.replace('1518600863-718eebdfc62f', '1492582846171-84090b83e4a2');
tripsCode = tripsCode.replace('1581414436511-9fbdac6ec771', '1511210419358-132d7b43fcf3');

// Dolce Vita en Train (id: 12) in trips.ts
tripsCode = tripsCode.replace('1516483638261-f40af5a5fac6', '1498503182468-3b51cbb6cb24');

// Charme Autrichien (id: 8) main image
tripsCode = tripsCode.replace('1605658145450-4dfefbda2c5a', '1513407987258-294b0d01fb29');

fs.writeFileSync('src/data/trips.ts', tripsCode);

// 3. Services.tsx
let servicesCode = fs.readFileSync('src/pages/Services.tsx', 'utf8');
servicesCode = servicesCode.replace('1513622470522-26c311c1b181', '1544644181-1484b3f6c10f');
fs.writeFileSync('src/pages/Services.tsx', servicesCode);

// 4. APropos.tsx
let aproposCode = fs.readFileSync('src/pages/APropos.tsx', 'utf8');
aproposCode = aproposCode.replace('1513622470522-26c311c1b181', '1544644181-1484b3f6c10f');
fs.writeFileSync('src/pages/APropos.tsx', aproposCode);

console.log("Images replaced");
