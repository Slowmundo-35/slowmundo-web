const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

const replacement = `<motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base md:text-lg text-primary font-medium mb-10 leading-relaxed max-w-3xl mx-auto"
        >
          L'agence est basée sur la région rennaise, avec la possibilité de se rencontrer en personne pour co-créer votre voyage, ou en visio si vous êtes ailleurs.
        </motion.p>
        <motion.div`;

code = code.replace(/<motion\.div\s*initial=\{\{ opacity: 0, y: 20 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: 0\.2 \}\}/, replacement + '\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          transition={{ delay: 0.2 }}');

fs.writeFileSync('src/pages/Services.tsx', code);
