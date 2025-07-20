import { useForm, useFieldArray } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';

// Import your new, separated components
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { FieldRow } from './components/fieldRow';
import { JsonPreview } from './components/jsonPreview';
import type { FormValues } from './types'; // Import shared types

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      schema: [{ key: 'root', type: 'Nested', nestedFields: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schema',
  });

  const onSubmit = (data: FormValues) => {
    console.log('Final Schema:', JSON.stringify(data, null, 2));
    alert('Schema logged to console!');
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen font-sans text-slate-800 flex items-center">
      <div className="container mx-auto p-4 sm:p-6 md:p-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">JSON Schema Builder</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Visually create, edit, and nest fields to build your perfect schema.
          </p>
        </header>

        <main>
            <Tabs defaultValue="builder">
                <div className="flex justify-center mb-6">
                    <TabsList>
                        <TabsTrigger value="builder">Schema Builder</TabsTrigger>
                        <TabsTrigger value="json">JSON Preview</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="builder">
                     <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            {fields.map((field, index) => (
                                <FieldRow
                                key={field.id}
                                control={control}
                                index={index}
                                remove={remove}
                                field={field}
                                path={`schema.${index}`}
                                />
                            ))}
                            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                                <Button
                                    type="button"
                                    onClick={() => append({ key: '', type: 'String', nestedFields: [] })}
                                    className="w-full sm:w-auto"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Field to Root
                                </Button>
                                 <Button type="submit" variant="outline" className="w-full sm:w-auto">
                                    Save Schema (Log to Console)
                                 </Button>
                            </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="json">
                    <JsonPreview control={control} />
                </TabsContent>
            </Tabs>
        </main>
      </div>
    </div>
  );
}
