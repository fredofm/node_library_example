import { PARAMETER_TYPES } from "./parametersHelper";
import { isBlank, isBoolean, isEmpty  } from "./primitiveUtils";

// Comma list values. Any character except line break. Leading and trailing comma character not allowed.
const PATTERN_LIST = "^(?:[^,\\t\\r]*[^,\\s]+[^,\\t\\r]*)(?:,[^,\\t\\r]*[^,\\s]+[^,\\t\\r]*)*$";
// Any character except line break. Leading and trailing whitespace not allowed.
const PATTERN_TEXT = "^\\S+(?: +\\S+)*$"; 
const PATTERN_NUMBER = "^-?\\d*[\\.,]?\\d+$";
const PARAMETER_REQUIRED = "required";

/**
 * An parameter options object definition
 * @typedef {Object} options
 * @property {string=} enumValues - Allowed values when parameter type is `enum`
 * @property {number=} minValue - Min value when parameter type is `number`
 * @property {number=} maxValue - Max value when parameter type is `number`
 */

/**
 * Validation definition function following Prototype pattern.
 * 
 * @param {string} type validation supported type that will be compared with
 * the parameter type at runtime.
 * @param {function} callback validation function that will check if the parameter is valid or not.
 * This function will receive the value and {@link options} object as parameters and should return
 * `true` if the value is valid, `false` if not.
 * @param {function} errorMessage function that will build the error message to be returned if the callback function 
 * determines that the parameter value is not valid.
 * @returns the error message if not valid, otherwise null.
 */
const validationPrototype = (type, callback, errorMessage) => ({
  type,

  /**
   * This callback will check if the parameter is valid or not.
   *  
   *
   * @param {(string|number|boolean)} value
   * @param {options} options
   * @returns {string} error message if not valid, otherwise null.
   */
  validate: (value, options) => (callback(value, options) ? null : errorMessage(value, options)),
});

const numberMinValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_NUMBER,
  (value, options) => {
    return ((isEmpty(value) || value === "" || isEmpty(options?.minValue)) ? true : Number(value) >= Number(options?.minValue))
  },
  (value, options) => `Value should be greater than ${options.minValue}.`
);

const numberMaxValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_NUMBER,
  (value, options) => {
    return ((isEmpty(value) || value === "" || isEmpty(options?.maxValue)) ? true : Number(value) <= Number(options?.maxValue))
  },
  (value, options) => `Value should be less than ${options.maxValue}.`
);

const numberValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_NUMBER,
  (value, options) => (isEmpty(value) || value === "" ? true : new RegExp(PATTERN_NUMBER).test(value)),
  (value, options) => "Please match the format requested."
);

const stringValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_STRING,
  (value, options) => isEmpty(value) || value === '' ? true : new RegExp(PATTERN_TEXT).test(value),
  (value, options) => "Please match the format requested."
);

const listValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_LIST,
  (value, options) => isEmpty(value) || value === '' ? true : new RegExp(PATTERN_LIST).test(value),
  (value, options) => "Please match the format requested."
);

const boolValidation = validationPrototype(
  PARAMETER_TYPES.TYPE_BOOL,
  (value, options) => isEmpty(value) || value === '' ? true : isBoolean(value),
  (value, options) => "Please match the format requested."
);

const requiredValidation = validationPrototype(
  PARAMETER_REQUIRED,
  (value, options) => !isBlank(value),
  (value, options) => "This field is required. Please, enter a value."
);

const validations = [
  requiredValidation,
  numberValidation,
  numberMinValidation,
  numberMaxValidation,
  stringValidation,
  listValidation,
  boolValidation,
];

/**
 * This method will validate the parameter value constraints taking into account the parameter type (number, text, list, enum, bool)
 * and the "required" property.
 * 
 * The received parameter object must have the following structure:
 * 
 * ```json
 * {
 *   type: "number" | "text" | "list" | "enum" | "bool"
 *   value: <parameter_value>
 *   required: true | false
 * }
 * ```
 * 
 * @param {object} parameter the parameter to validate.
 * @returns {[string]} a string array with the list of detected errors.
 */
export const validateDeploymentPackageParameter = (parameter) => {
  const parameterConstraints = [];

  parameterConstraints.push(parameter.type);
  if (parameter.required === true) {
    parameterConstraints.push(PARAMETER_REQUIRED);
  }

  return validations
    .filter((validation) => parameterConstraints.includes(validation.type))
    .reduce((result, validation) => {
      const error = validation.validate(parameter.value, parameter.options);

      if (error) {
        result.push(error);
      }

      return result;
    }, []);
};