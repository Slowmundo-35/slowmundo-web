const fs = require('fs');

const fixFile = (filepath) => {
  let code = fs.readFileSync(filepath, 'utf8');

  // Replace <motion.Link with <motion.a and replace to= with href=
  // Or better, import { motion, createMotionComponent } or use motion.create(Link)
  // Actually, standard is motion.create(Link) in new motion versions.
  // The easiest is just import { Link } and wrap it in a motion.div or just use motion.a if it's a link.
  // Wait, replacing motion.Link with motion.create(Link) or motion(Link)?
  // Let's replace <motion.Link with <Link, and then we might lose animations if they are layout ones, but here it's just hover.
  // Let's just create const MotionLink = motion.create(Link); and use <MotionLink
  
  if (code.includes('<motion.Link')) {
    if (!code.includes('const MotionLink')) {
      code = code.replace(
        "import { Link } from 'react-router-dom';",
        "import { Link } from 'react-router-dom';\nconst MotionLink = motion.create(Link);"
      );
    }
    code = code.replace(/<motion\.Link/g, '<MotionLink');
    code = code.replace(/<\/motion\.Link>/g, '</MotionLink>');
    fs.writeFileSync(filepath, code);
  }
};

fixFile('src/pages/Blog.tsx');
fixFile('src/pages/Article.tsx');
