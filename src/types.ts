export type FieldType = 'String' | 'Number' | 'Nested' | 'ObjectId' | 'Float' | 'Boolean';

// Defines the structure of a single schema field, including potential nesting
export type SchemaField = {
  key: string;
  type: FieldType;
  nestedFields: SchemaField[];
};

// Defines the overall structure of the form's data
export type FormValues = {
  schema: SchemaField[];
};
