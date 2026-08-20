const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// Increase image height
code = code.replace(
  'aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl',
  'h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl w-full'
);

// Form Side alignment
// <div className="w-full md:w-8/12 lg:w-2/3 text-white flex flex-col items-center">
code = code.replace(
  'w-full md:w-8/12 lg:w-2/3 text-white flex flex-col items-center',
  'w-full md:w-8/12 lg:w-2/3 text-white flex flex-col items-start'
);

// Title alignment
// <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 leading-tight whitespace-nowrap truncate text-center">
code = code.replace(
  'text-lg sm:text-xl lg:text-2xl font-bold mb-6 leading-tight whitespace-nowrap truncate text-center',
  'text-lg sm:text-xl lg:text-2xl font-bold mb-6 leading-tight whitespace-nowrap truncate text-left'
);

// Form max-width (from max-w-lg to max-w-full to allow it to align nicely, or just keep it)
code = code.replace(
  '<form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg">',
  '<form onSubmit={handleSubmit} className="space-y-4 w-full">'
);

// Button alignment
// <div className="text-center w-full">
code = code.replace(
  '<div className="text-center w-full">',
  '<div className="text-left w-full mt-4">'
);

fs.writeFileSync('src/pages/Contact.tsx', code);
