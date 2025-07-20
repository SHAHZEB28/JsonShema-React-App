import { useWatch, type Control } from 'react-hook-form';

import { Card, CardContent } from './card';
import type { FormValues, SchemaField } from '../types';

export const JsonPreview = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({ control });

  const isSchemaField = (field: any): field is SchemaField => {
      return field && typeof field.key === 'string' && typeof field.type === 'string' && Array.isArray(field.nestedFields);
  }

  const generateJson = (fields: (Partial<SchemaField> | undefined)[]): Record<string, any> | any[] => {
    const validFields = fields.filter(isSchemaField);
    if (validFields.length === 0) return [];
    
    const isArrayContext = validFields.every(f => f.key === '');

    if (isArrayContext) {
        return validFields.map(field => {
            switch (field.type) {
                case 'Nested': return generateJson(field.nestedFields);
                case 'String': return 'Sample String';
                case 'Number': return 12345;
                case 'Float': return parseFloat((Math.random() * 1000).toFixed(2));
                case 'Boolean': return Math.random() < 0.5;
                case 'ObjectId': return '60d5ec49e0d3f4a3c8c8a3e2';
                default: return null;
            }
        });
    }

    return validFields.reduce((acc: Record<string, any>, field) => {
      if (!field.key) return acc;
      switch (field.type) {
        case 'Nested':
          acc[field.key] = generateJson(field.nestedFields);
          break;
        case 'String':
          acc[field.key] = 'Sample String';
          break;
        case 'Number':
          acc[field.key] = 12345;
          break;
        case 'Float':
          acc[field.key] = parseFloat((Math.random() * 1000).toFixed(2));
          break;
        case 'Boolean':
          acc[field.key] = Math.random() < 0.5;
          break;
        case 'ObjectId':
          acc[field.key] = '60d5ec49e0d3f4a3c8c8a3e2';
          break;
        default:
          acc[field.key] = null;
      }
      return acc;
    }, {});
  };

  const jsonOutput = JSON.stringify(generateJson(formValues.schema as any || []), null, 2);

  return (
    <Card className="mt-4">
        <CardContent>
            <pre className="text-sm bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <code>{jsonOutput}</code>
            </pre>
        </CardContent>
    </Card>
  );
};
