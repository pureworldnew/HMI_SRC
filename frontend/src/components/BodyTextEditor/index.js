import RichTextEditor from 'react-rte';
import React, { useState } from 'react';

export default function BodyTextEditor({ value, setValue }) {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(value, 'markdown')
  );

  const handleChange = (value) => {
    setEditorValue(value);
    setValue(value.toString('markdown'));
  };

  return (
    <RichTextEditor
      value={editorValue}
      onChange={handleChange}
      required
      id="body-text"
      name="bodyText"
      type="string"
      multiline
      variant="filled"
      style={{ minHeight: 410 }}
    />
  );
}
