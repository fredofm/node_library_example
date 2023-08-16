
const boolDefaultTrueValuesRegex = /true|TRUE|True/; // Add other /true|1|on/
const boolDefaultFalseValuesRegex = /false|FALSE|False/; // Add other /false|0|off/

/**
 * This function promotes the passed parameter to a boolean primitive, based on a default regexp of valid values:
 * 
 * - true = `/true|TRUE/`
 * - false = `/false|FALSE/`
 * 
 * @param {*} val value that will be promoted to boolean.
 * @param {RegExp} trueValuesRegexp By default it will check `/true|TRUE|True/` but it can be overwritten a different regexp e.g. `/true|1|on/`.
 * @param {RegExp} falseValuesRegexp By default it will check `/false|FALSE|False/`  but it can be overwritten a different regexp e.g. `/false|0|off/`
 * @returns {boolean|undefined} the {@link boolean} value of the passed parameter if it can be promoted to boolean, undefined {@link otherwise}.
 */
export const toBoolean = (val, trueValuesRegexp = boolDefaultTrueValuesRegex, falseValuesRegexp = boolDefaultFalseValuesRegex) => {
    let booleanValue = undefined;

    if (isBoolean(val, trueValuesRegexp, falseValuesRegexp)) {
        booleanValue = trueValuesRegexp.test(val.toString());
    }

    return booleanValue;
};

/**
 * This function will check that the passed parameter can be promoted to a boolean primitive.
 * 
 * @param {*} val value that will be checked.
 * @param {RegExp} trueValuesRegexp By default it will check `/true|TRUE/` by you can overwrite this behaviour passing your own regexp e.g. `/true|1|on/`.
 * @param {RegExp} falseValuesRegexp By default it will check `/false|FALSE/` by you can overwrite this behaviour passing your own regexp e.g. `/false|0|off/`
 * @returns {boolean} `true` if the passed parameter can be considered a boolean value, otherwise `false`.
 */
export const isBoolean = (val, trueValuesRegexp = boolDefaultTrueValuesRegex, falseValuesRegexp = boolDefaultFalseValuesRegex) => {
    if (val === undefined || val === null) return false;

    return trueValuesRegexp.test(val.toString()) || falseValuesRegexp.test(val.toString());
};

/**
 * This function will check if the received parameter is blank or not:
 * - null
 * - undefined
 * - empty string (only contains whitespace characters)
 * 
 * @param {any} value text to check for blank condition 
 * @returns {boolean} `true` if blank, `false` if not.
 */
export const isBlank = (value) => {
    return isEmpty(value) || /^\s*$/.test(value);
};

/**
 * This function will check if the received parameter is empty or not:
 * - null
 * - undefined
 * 
 * @param {any} value 
 * @returns {boolean} `true` if empty, `false` if not.
 */
export const isEmpty = (value) => {
    // null or undefined
    return value == null ? true : false;
};