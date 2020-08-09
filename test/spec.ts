import {reportEnums,reports} from '../lib';


import { StringBuilder } from 'typescript-string-operations';
const loginWaitMins = 2 * 360000;

const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = loginWaitMins * 100;
let TC_Brand: string = "Walmart";
describe('WALMART SMOKE TEST VALIDATIONS', () => {
  beforeEach(async () => {
    reportEnums.start = new Date().getTime();
  });
  afterEach(async () => {
    console.log("executionFailStatus123 :" + reportEnums.executionFailStatus);
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
  it('result report test', async () => {
    reportEnums.sb = new StringBuilder();
    let TC_ID: string = "result report test";
    reportEnums.testCaseID = TC_ID;
    try {
      
      await reports.testStepPass("CosmosDB", "OT ID : " + "<b>" + 'OTID' + "</b>", "PASS");

      await reports.testStepPass("CosmosDB", "intakeRequestId : " + "<b>" + 'inTakeID' + "</b>", "PASS");

    } catch (error) {
      reports.testStepFail("test failed ", "something went wrong", "PASS");
      reportEnums.executionFailStatus = true;
    }
  }); 
})
