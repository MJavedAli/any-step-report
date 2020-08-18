# Any Step HTML reporter

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Any step HTML reporter for Jasmine and Protractor has the ability to record report logs for any steps that you want to include with screenshots of each step if you want. 


## Usage
The any-step-reporter is available via npm:

$ npm install any-step-reports --save-dev

In your spec file import the following properties to capture and create detailed reports as :
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
<pre><code>
import {reportEnums,reports} from 'any-step-reports';
</code></pre>

## Options
### Destination folder

Output directory for created files. All screenshots and reports will be stored here.

If the directory doesn't exist, it will be created automatically or otherwise cleaned before running the test suite.

## Sample Spec
### Describe section 

<pre><code>
describe('ANY STEP SMOKE TEST VALIDATIONS', () => {
  beforeEach(async () => {
    reportEnums.start = new Date().getTime();
  });
  afterEach(async () => {
    console.log("executionFailStatus :" + reportEnums.executionFailStatus);
    if (reportEnums.executionFailStatus == true) {
      reportEnums.failcount = reportEnums.failcount + 1;
    }
    reportEnums.totalTestCaseCount = reportEnums.totalTestCaseCount + 1;
    reportEnums.end = new Date().getTime();
    var time: number = (reportEnums.end - reportEnums.start);
    reportEnums.totalTime = await (reportEnums.totalTime) + (time / 60000);

    await reportEnums.TestTable.push(await reports.individualTestCaseTable(reportEnums.sb, TC_Brand + " : " + reportEnums.testCaseID));
    await reports.saveTestReport(await reports.createFinalTable(reportEnums.TestTable, "Report Title"), "smokeReport");
    reportEnums.executionFailStatus = false;

  });
</code></pre>

### Spec section

<pre><code>
 it('result report test', async () => {
    reportEnums.sb = new StringBuilder();
    let TC_ID: string = "result report test";
    reportEnums.testCaseID = TC_ID;
    try {
      
      await reports.testStepPass("Step1", "Assert Key : " + "<b>" + 'Assert Actual' + "</b>", "PASS");

      await reports.testStepPass("Step2", "Assert Key : " + "<b>" + 'Assert Actual' + "</b>", "PASS");

    } catch (error) {
      reports.testStepFail("test failed ", "something went wrong", "FAIL");
      reportEnums.executionFailStatus = true;
    }
  }); 
})
</code></pre>

### Enums available as options 
      _executionFailStatus_: boolean =false;
      _totalTestCaseCount_:number = 0;
      _passcount_:number = 0;
      _failcount_=0;
      _actualExecutionTime_=0;
      _start_:any;
      _end_:any;
      _totalTime_:any=0;
      _TestTable_:string[] = new Array();
      _testCaseID_:string='';

      


