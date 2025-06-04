const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/components/blogpost');

function extractSlug(content) {
  const match = content.match(/slug:\s*['"`](.*?)['"`]/);
  return match ? match[1].trim() : null;
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getDestinations() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.tsx'));
  const destinations = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const slug = extractSlug(content);

    if (slug) {
      destinations.push({
        title: slugToTitle(slug),
        slug: slug,
        path: `/blog/${slug}`,
      });
    } else {
      console.warn(`⚠️ Aucun slug trouvé dans ${file}`);
    }
  }

  console.log(JSON.stringify(destinations, null, 2));
}

getDestinations();
