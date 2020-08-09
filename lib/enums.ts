import { StringBuilder } from 'typescript-string-operations';
class ReportEnums {
    public sb:StringBuilder;
    public executionFailStatus: boolean =false;
    public totalTestCaseCount:number = 0;
    public passcount:number = 0;
    public failcount=0;
    public actualExecutionTime=0;
    public start:any;
    public end:any;
    public totalTime:any=0;
    public TestTable:string[] = new Array();
    public testCaseID:string;
  }
  export const reportEnums: ReportEnums = new ReportEnums();
