import { form } from '@myCustomLib/validator';
const _validator = new form.particulars.Validator();

function sampleFunctionIWantToTest(formInfo) {
  var error = _validator.fullValidation(formInfo);

  if (error) {
    return true;
  }

  return false;
}

export { sampleFunctionIWantToTest };
