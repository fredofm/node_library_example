
import { validateDeploymentPackageParameter } from "../src/validationHelper"

describe("Test validateDeploymentPackageParameter function", () => {
  it.each`
    type        | value                        | required | options                          | numberOfErrors
    ${"bool"}   | ${"true"}                    | ${false} | ${{}}                            | ${0}
    ${"bool"}   | ${"TRUE"}                    | ${false} | ${{}}                            | ${0}
    ${"bool"}   | ${true}                      | ${false} | ${{}}                            | ${0}
    ${"bool"}   | ${"false"}                   | ${false} | ${{}}                            | ${0}
    ${"bool"}   | ${"FALSE"}                   | ${false} | ${{}}                            | ${0}
    ${"bool"}   | ${false}                     | ${false} | ${{}}                            | ${0}        
    ${"bool"}   | ${" "}                       | ${false} | ${{}}                            | ${1}
    ${"bool"}   | ${"test"}                    | ${false} | ${{}}                            | ${1}
    ${"bool"}   | ${666}                       | ${false} | ${{}}                            | ${1}
    ${"bool"}   | ${""}                        | ${true}  | ${{}}                            | ${1}
    ${"bool"}   | ${" "}                       | ${true}  | ${{}}                            | ${2}   
    ${"number"} | ${""}                        | ${false} | ${{}}                            | ${0}
    ${"number"} | ${"10"}                      | ${false} | ${{}}                            | ${0}
    ${"number"} | ${"10.3"}                    | ${false} | ${{}}                            | ${0}
    ${"number"} | ${"10,3"}                    | ${false} | ${{}}                            | ${0}
    ${"number"} | ${10}                        | ${false} | ${{}}                            | ${0}
    ${"number"} | ${10.3}                      | ${false} | ${{}}                            | ${0}
    ${"number"} | ${-10.3}                     | ${false} | ${{}}                            | ${0}
    ${"number"} | ${10}                        | ${false} | ${{minValue: 5, maxValue: 10}}   | ${0}
    ${"number"} | ${5}                         | ${false} | ${{minValue: 5, maxValue: 10}}   | ${0}
    ${"number"} | ${10.3}                      | ${false} | ${{maxValue: 11}}                | ${0}
    ${"number"} | ${-10.3}                     | ${false} | ${{minValue: -11}}               | ${0}
    ${"number"} | ${10.3}                      | ${false} | ${{maxValue: 10}}                | ${1}
    ${"number"} | ${-10.3}                     | ${false} | ${{minValue: -10}}               | ${1}
    ${"number"} | ${"-10.3"}                   | ${false} | ${{}}                            | ${0}
    ${"number"} | ${"1-0.3"}                   | ${false} | ${{}}                            | ${1}
    ${"number"} | ${"10.3-"}                   | ${false} | ${{}}                            | ${1}
    ${"number"} | ${"a"}                       | ${false} | ${{}}                            | ${1}
    ${"number"} | ${"10 "}                     | ${false} | ${{}}                            | ${1}
    ${"number"} | ${"1 0.3"}                   | ${false} | ${{}}                            | ${1}
    ${"number"} | ${"1 0,3"}                   | ${false} | ${{}}                            | ${1}
    ${"number"} | ${""}                        | ${true}  | ${{}}                            | ${1}
    ${"number"} | ${" "}                       | ${true}  | ${{}}                            | ${2}
    ${"string"} | ${""}                        | ${false} | ${{}}                            | ${0}
    ${"string"} | ${"test_string"}             | ${false} | ${{}}                            | ${0}
    ${"string"} | ${"!\"·$%&/()=`+´,.-*/\\"}   | ${false} | ${{}}                            | ${0}    
    ${"string"} | ${"test string"}             | ${false} | ${{}}                            | ${0}
    ${"string"} | ${"test_string "}            | ${false} | ${{}}                            | ${1}
    ${"string"} | ${" test_string"}            | ${false} | ${{}}                            | ${1}
    ${"string"} | ${" "}                       | ${false} | ${{}}                            | ${1}
    ${"string"} | ${""}                        | ${true}  | ${{}}                            | ${1}
    ${"string"} | ${" "}                       | ${true}  | ${{}}                            | ${2}    
    ${"list"}   | ${""}                        | ${false} | ${{}}                            | ${0}
    ${"string"} | ${"!\"·$%&/()=`+´,.-*/\\"}   | ${false} | ${{}}                            | ${0}
    ${"string"} | ${"!\"·$%&/()=`+´,.-*/\\, !\"·$%&/()=`+´,.-*/\\"}   | ${false} | ${{}}     | ${0}
    ${"list"}   | ${"val1"}                    | ${false} | ${{}}                            | ${0}
    ${"list"}   | ${"val 1,val 2"}             | ${false} | ${{}}                            | ${0}
    ${"list"}   | ${"val1,val2"}               | ${false} | ${{}}                            | ${0}
    ${"list"}   | ${" val1 , val2 "}           | ${false} | ${{}}                            | ${0}
    ${"list"}   | ${" "}                       | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${"val1,,"}                  | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${"val1, , "}                | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${","}                       | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${"val1,,val2"}              | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${",val1,val2"}              | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${"val1,val2,"}              | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${" ,val1,val2, "}           | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${"val1, , "}                | ${false} | ${{}}                            | ${1}
    ${"list"}   | ${""}                        | ${true}  | ${{}}                            | ${1}
    ${"list"}   | ${" "}                       | ${true}  | ${{}}                            | ${2}    
  `(
    'type=$type, value="$value", required=$required, options=$options -> errors=$numberOfErrors',
    ({ type, value, required, options, numberOfErrors }) => {
      const parameter = {
        required: required,
        value: value,
        type: type,
        options: options
      };

      const errors = validateDeploymentPackageParameter(parameter);

      expect(errors).toHaveLength(numberOfErrors);
    }
  );
});
