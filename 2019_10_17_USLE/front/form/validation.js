import isEmail from 'validator/lib/isEmail';

export function email(value, values) {
  return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

export function checkPassword(password, checkPassword) {
  return password !== checkPassword ? 'Please Check Your Password' : null;
}

export function readTerm(value){
  console.log(value);
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce((fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}

export function requiredCheckbox(requiredFields, values) {
  console.log(requiredFields);
    console.log(values);
  return requiredFields.reduce((fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}

