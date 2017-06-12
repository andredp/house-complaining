// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormGroup, FormFeedback, Input } from 'reactstrap';
import { fieldPropTypes as FieldProps } from 'redux-form';

const Field = ({ input, label, type, meta: { error } }: FieldProps) =>
  (<FormGroup color={error ? 'danger' : ''}>
    <Input {...input} placeholder={label} type={type} state={error ? 'danger' : ''} />
    {error &&
      <FormFeedback>
        <FontAwesome name="exclamation-circle" /> {error}
      </FormFeedback>}
  </FormGroup>);

export default Field;
