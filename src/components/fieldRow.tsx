import { useState } from 'react';
import { useFieldArray, Controller, useWatch, type Control, type UseFieldArrayRemove } from 'react-hook-form';
import { PlusCircle, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

// Corrected to match the new 'components' folder structure
import { Button } from './button';
import { Input } from './input';
import { Select } from './select';
import type { FormValues } from '../types';

type FieldRowProps = {
    control: Control<FormValues>;
    index: number;
    remove: UseFieldArrayRemove;
    field: { id: string }; 
    path: string;
}

// This is the core recursive component. It renders itself for nested fields.
export const FieldRow = ({ control, index, remove, path }: FieldRowProps) => {
  const { fields, append, remove: removeNested } = useFieldArray({
    control,
    name: `${path}.nestedFields` as any,
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const currentFieldType = useWatch({ control, name: `${path}.type` as any });

  return (
    <div className="pl-4 border-l-2 border-slate-300/70">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2">
        {(currentFieldType === 'Nested') && (
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 flex-shrink-0">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        )}
        <div className={`flex-grow ${(currentFieldType !== 'Nested') ? 'sm:ml-10' : ''}`}>
          <Controller
            name={`${path}.key` as any}
            control={control}
            rules={{ required: 'Key is required' }}
            render={({ field }) => <Input {...field} placeholder="Field Name" />}
          />
        </div>
        <div className="flex-shrink-0 sm:w-48 w-full">
            <Controller
              name={`${path}.type` as any}
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Float">Float</option>
                  <option value="Boolean">Boolean</option>
                  <option value="ObjectId">ObjectId</option>
                  <option value="Nested">Nested (Object)</option>
                </Select>
              )}
            />
        </div>
        <div className="flex-shrink-0">
            <Button variant="destructive" size="icon" onClick={() => remove(index)} className="h-10 w-full sm:w-10">
              <Trash2 size={16} />
            </Button>
        </div>
      </div>

      {(currentFieldType === 'Nested') && isExpanded && (
        <div className="pl-4 mt-2">
          {fields.map((nestedField, nestedIndex) => (
            <FieldRow
              key={nestedField.id}
              control={control}
              index={nestedIndex}
              remove={removeNested}
              field={nestedField}
              path={`${path}.nestedFields.${nestedIndex}`}
            />
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => append({ key: '', type: 'String', nestedFields: [] })}
            className="mt-2"
          >
            <PlusCircle size={16} className="mr-2" /> Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};
