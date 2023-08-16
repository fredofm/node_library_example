
import { isBlank, isBoolean, toBoolean, isEmpty } from "../src/primitiveUtils"

describe("Check that isBoolean function returns the correct value", () => {
  it.each`
    value       | trueRegExp    | falseRegExp   | expectedResult
    ${true}     | ${undefined}  | ${undefined}  | ${true}
    ${"true"}   | ${undefined}  | ${undefined}  | ${true}
    ${"TRUE"}   | ${undefined}  | ${undefined}  | ${true}
    ${false}    | ${undefined}  | ${undefined}  | ${true}
    ${"false"}  | ${undefined}  | ${undefined}  | ${true}
    ${"FALSE"}  | ${undefined}  | ${undefined}  | ${true}
    ${"notbool"}| ${undefined}  | ${undefined}  | ${false}
    ${"0"}      | ${undefined}  | ${undefined}  | ${false}
    ${"1"}      | ${undefined}  | ${undefined}  | ${false}
    ${""}       | ${undefined}  | ${undefined}  | ${false}    
    ${null}     | ${undefined}  | ${undefined}  | ${false}    
    ${undefined}| ${undefined}  | ${undefined}  | ${false}  
    ${"0"}      | ${undefined}  | ${/false|0/}  | ${true}
    ${"1"}      | ${/true|1/}   | ${undefined}  | ${true}  
  `(
    'When value="$value", trueRegExp="$trueRegExp" and falseRegExp="$falseRegExp" then expected result="$expectedResult"',
    ({ value, trueRegExp, falseRegExp, expectedResult }) => {
      const result = isBoolean(value, trueRegExp, falseRegExp);

      expect(result).toBe(expectedResult);      
    }
  );
});

describe("Check that toBoolean function returns the correct value", () => {
    it.each`
      value       | trueRegExp    | falseRegExp      | expectedResult
      ${true}     | ${undefined}  | ${undefined}     | ${true}
      ${"true"}   | ${undefined}  | ${undefined}     | ${true}
      ${"TRUE"}   | ${undefined}  | ${undefined}     | ${true}
      ${false}    | ${undefined}  | ${undefined}     | ${false}
      ${"false"}  | ${undefined}  | ${undefined}     | ${false}
      ${"FALSE"}  | ${undefined}  | ${undefined}     | ${false}
      ${"notbool"}| ${undefined}  | ${undefined}     | ${undefined}
      ${"0"}      | ${undefined}  | ${undefined}     | ${undefined}
      ${"1"}      | ${undefined}  | ${undefined}     | ${undefined}
      ${""}       | ${undefined}  | ${undefined}     | ${undefined}    
      ${null}     | ${undefined}  | ${undefined}     | ${undefined}    
      ${undefined}| ${undefined}  | ${undefined}     | ${undefined}  
      ${"0"}      | ${undefined}  | ${/false|0|off/} | ${false}
      ${"1"}      | ${/true|1|on/}| ${undefined}     | ${true}
      ${0}        | ${undefined}  | ${/false|0|off/} | ${false}
      ${1}        | ${/true|1|on/}| ${undefined}     | ${true}
      ${"off"}    | ${undefined}  | ${/false|0|off/} | ${false}
      ${"on"}     | ${/true|1|on/}| ${undefined}     | ${true}    
    `(
      'When value="$value", trueRegExp="$trueRegExp" and falseRegExp="$falseRegExp" then expected result="$expectedResult"',
      ({ value, trueRegExp, falseRegExp, expectedResult }) => {
        const result = toBoolean(value, trueRegExp, falseRegExp);
  
        expect(result).toBe(expectedResult);      
      }
    );
  });

  describe("Check that isBlank function returns the correct value", () => {
    it.each`
      str          | expectedResult
      ${"value"}   | ${false}
      ${" value "} | ${false}
      ${""}        | ${true}
      ${" "}       | ${true}      
      ${null}      | ${true}
      ${undefined} | ${true}
      ${1}         | ${false}
      ${0}         | ${false}
      ${false}     | ${false}
      ${true}      | ${false}
      ${true}      | ${false}
    `(
      'When value="$str" then expected result="$expectedResult"',
      ({ str, expectedResult }) => {
        const result = isBlank(str);
  
        expect(result).toBe(expectedResult);      
      }
    );
  });

  describe("Check that isEmpty function returns the correct value", () => {
    it.each`
      str          | expectedResult
      ${"value"}   | ${false}
      ${" value "} | ${false}
      ${""}        | ${false}
      ${" "}       | ${false}      
      ${null}      | ${true}
      ${undefined} | ${true}
      ${1}         | ${false}
      ${0}         | ${false}
      ${false}     | ${false}
      ${true}      | ${false}
      ${true}      | ${false}
    `(
      'When value="$str" then expected result="$expectedResult"',
      ({ str, expectedResult }) => {
        const result = isEmpty(str);
  
        expect(result).toBe(expectedResult);      
      }
    );
  });