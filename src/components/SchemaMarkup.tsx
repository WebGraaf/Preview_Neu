import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaData {
  schemas: Record<string, unknown>[];
}

/**
 * SchemaMarkup Component
 * 
 * Loads JSON-LD structured data from /public/schema-markup.json
 * and injects it into the document head for SEO purposes.
 * 
 * The schema file can be edited directly in the /public folder
 * to update the structured data without code changes.
 */
const SchemaMarkup: React.FC = () => {
  const [schemas, setSchemas] = useState<Record<string, unknown>[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSchemas = async () => {
      try {
        const response = await fetch('/schema-markup.json');
        if (!response.ok) {
          console.warn('Schema markup file not found or could not be loaded');
          return;
        }
        const data: SchemaData = await response.json();
        if (data.schemas && Array.isArray(data.schemas)) {
          setSchemas(data.schemas);
        }
      } catch (error) {
        console.warn('Error loading schema markup:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSchemas();
  }, []);

  // Don't render anything until we've attempted to load
  if (!isLoaded || schemas.length === 0) {
    return null;
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SchemaMarkup;