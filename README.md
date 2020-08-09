# Any Step reporting

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Key highlights 

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

  