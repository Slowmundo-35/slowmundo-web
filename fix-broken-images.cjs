const fs = require('fs');

function replaceInFile(filename) {
  if (!fs.existsSync(filename)) return;
  let code = fs.readFileSync(filename, 'utf8');
  
  // 1. Tramway en ville
  code = code.replace(/1544644181-1484b3f6c10f/g, '1480796927426-f609979314bd');
  
  // 2. Voyageur en train souriant
  code = code.replace(/1522856339183-5a7071ea91ce/g, '1471506480208-91b3a4cc78be');
  
  // 3. Route de la soie verte
  code = code.replace(/1528629297340-d1af345df05b/g, '1542051841857-5f90071e7989');
  code = code.replace(/1492582846171-84090b83e4a2/g, '1542401886-65d6c61db217');
  code = code.replace(/1511210419358-132d7b43fcf3/g, '1506125840744-167167210587');
  
  // 4. Lunes de miel green
  code = code.replace(/1510414842594-a618690c4800/g, '1493976040374-85c8e12f0c0e');

  fs.writeFileSync(filename, code);
}

['src/pages/Home.tsx', 'src/data/trips.ts', 'src/pages/Services.tsx', 'src/pages/APropos.tsx', 'src/pages/Voyages.tsx'].forEach(replaceInFile);

console.log("Images fixed");
