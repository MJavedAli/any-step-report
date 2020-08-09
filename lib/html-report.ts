import { browser, Ptor, ExpectedConditions, protractor, by, element, Key } from 'protractor';
import { String, StringBuilder } from 'typescript-string-operations';
import {reportEnums} from '../lib';
import { createWriteStream } from 'fs'
const path = require('path');
const fs = require('fs');

 class CreateReport {
    async testStepPass(sTestStep: string, sDesc: string, sStatus: string) {
        let screenshot_path: string = await this.captureScreenshot("PASS");
        try {
            await reportEnums.sb.Append("<tr><td bgcolor=#FFFFFF style=text-align:left>" + sTestStep + "</td>");
            await reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:left>" + sDesc + "</td>");
            await reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:center><a href=" + screenshot_path+" target=\"_blank\"" + ">Screenshot</a></td>");
            await reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:center><font color=" + "green" + ">PASS</font></td></tr>");
            }
        catch (Error) {
            await console.log("Unable to create PASS Test Report");
        }
    }

    async testStepFail(sTestStep: string, sDesc: string, sStatus: string) {
        reportEnums.executionFailStatus = true;
        console.log("executionFailStatusFail :" + reportEnums.executionFailStatus);
        console.log("In test StepFail failcount :" + reportEnums.failcount);
        let screenshot_path: string = await this.captureScreenshot("FAIL");

        try {
            reportEnums.sb.Append("<tr><td bgcolor=#FFFFFF style=text-align:left>" + sTestStep + "</td>");
            reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:left>" + sDesc + "</td>");
            reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:center><a href=" + screenshot_path +" target=\"_blank\"" +">Screenshot</a></td>");
            reportEnums.sb.Append("<td bgcolor=#FFFFFF style=text-align:center><font color=" + "red" + ">FAIL</font></td></tr>");
        }
        catch (Error) {
            console.log("Unable to create FAIL Test Report");
        }
     }
    async captureScreenshot(type: string) {
        let timeStamp: string = await this.dateNTime();
        let screenshotpath: string = null;
        try {
            const fName = '../Report/';
            const absolutePath = path.resolve(__dirname, fName);
            screenshotpath = await absolutePath + "\\CurrentReport" + "\\" + await timeStamp + "_screenshot.png";
            await browser.takeScreenshot().then(function (png) {
                var stream = createWriteStream(absolutePath + "\\CurrentReport" + "\\" + timeStamp + "_screenshot.png");
                console.log("ScreenSH path:" + absolutePath + "\\CurrentReport" + "\\" + timeStamp + "_screenshot.png");
                stream.write(new Buffer(png, 'base64'));
                stream.end();
            });
        } catch (e) {
            console.log("Screenshot is not captured :");
        }

        return screenshotpath;
    }
    async textcolor(text: string, colorOfText: string) {
        var sbTextClr = new StringBuilder();
        sbTextClr.Append(String.Format("<font color=\"%s\">%s</font>", colorOfText, text));
        let output = sbTextClr.toString();
        return output;
    }
    async createFinalTable(tableBody: string[], functionality: string) {
        let totalExecutionTime:string=reportEnums.totalTime.toString();
        totalExecutionTime=totalExecutionTime.substring(0,5);
        const fName = '../any-step-report/';
        const absolutePath = path.resolve(__dirname, fName);
        let sFinalTable: string = "<html><head>"
        +   "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "<style>" +
            ".collapsible {" +
            "  background-color: #777;" +
            "  color: white;" +
            "  cursor: pointer;" +
            "  padding: 18px;" +
            "  width: 100%;" +
            "  border: none;" +
            "  text-align: left;" +
            "  outline: none;" +
            "  font-size: 15px;" +
            "}" +
            "" +
            ".active, .collapsible:hover {" +
            "  background-color: #555;" +
            "}" +
            "" +
            ".content {" +
            "  padding: 0 18px;" +
            "  display: none;" +
            "  overflow: hidden;" +
            "  background-color: #f1f1f1;" +
            "}" +
        "</style>"+
        "</head>"
            + "<body bgcolor=#BDB76B>\n"
            + "<p>"
            + "<h1  bgcolor=#1E90FF ><img src=" + absolutePath + "//img.png" + " align=\"" + "left\"" + " style=\"" + "line-height:60px;height:60px;\"" + "> <hr><label style=\"" + "position: absolute; left: 450;\"" + ">" + functionality + "</label></h1>"

            + "</title <background color=\"#RRGGBB\">"

            + "<background color=\"#003300\">&nbsp;</background>"

            + "<p><hr><br><br>"

            + "<table border=\"1\" bordercolor=\"#003300\" style=text-align:left>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Type of Testing</b></td><td bgcolor=#F0FFFF style=text-align:left>Smoke Test</td></tr>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Date and Time</b></td><td bgcolor=#F0FFFF style=text-align:left>" + await this.dateNTime() + "</td></tr>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Total Scenario Executed</b></td><td bgcolor=#F0FFFF style=text-align:center>" + (reportEnums.totalTestCaseCount).toString() + "</td></tr>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Total Test Scenario Pass</b></td><td bgcolor=#F0FFFF style=text-align:center>" + (reportEnums.totalTestCaseCount - reportEnums.failcount).toString() + "</td></tr>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Total Test Scenario Fail</b></td><td bgcolor=#F0FFFF style=text-align:center>" + (reportEnums.failcount).toString() + "</td></tr>"
            + "<tr><td bgcolor=#008B8B style=text-align:left><b>Total Execution Time(Mins.)</b></td><td bgcolor=#F0FFFF style=text-align:left>" + totalExecutionTime.toString() + " minutes" + "</td></tr>"
            + "</table>"
            +"<h2>Click Test Case Link For Execution Details:</h2>"
            + tableBody.toString()
                .replace(",", "") //remove the commas
                .replace("[", "") //remove the right bracket
                .replace("]", "").trim() //remove the left bracket
                + "<script>\n" +
                "var coll = document.getElementsByClassName(\"collapsible\");\n" +
                "var i;\n" +
                "\n" +
                "for (i = 0; i < coll.length; i++) {\n" +
                "  coll[i].addEventListener(\"click\", function() {\n" +
                "    this.classList.toggle(\"active\");\n" +
                "    var content = this.nextElementSibling;\n" +
                "    if (content.style.display === \"block\") {\n" +
                "      content.style.display = \"none\";\n" +
                "    } else {\n" +
                "      content.style.display = \"block\";\n" +
                "    }\n" +
                "  });\n" +
                "}\n" +
                "</script></body>"

                + "</html>";
        return sFinalTable;
    }
    async individualTestCaseTable(sb: StringBuilder, TestName: string) {
        let individulaTable: string;
        let tcColor:string;
        let tcStatus:string;
        let startsTable: string;
        console.log("await reportEnums.executionFailStatus: "+await reportEnums.executionFailStatus);
        if (await reportEnums.executionFailStatus === true) {
             tcColor="<font color=" + "red" + ">";
             tcStatus="&#10060; ";
        }
        else{
            tcColor="<font color=" + "green" + ">";
            tcStatus="&#9989; ";
        }
        try {
            startsTable =
            "<button type=\"button\" class=\"collapsible\"><b>"+tcStatus+TestName+"</b></button>" +
            "<div class=\"content\">" +
            "<p>" +
            "<table border=\"1\" bordercolor=\"#003300\">"

                + "<tr>"
                + "<td bgcolor=#008B8B style=text-align:center><b>Test Steps</b></td>"
                + "<td bgcolor=#008B8B style=text-align:center><b>Test Case Description</b></td>"
                + "<td bgcolor=#008B8B style=text-align:center><b>Screenshot</b></td>"
                + "<td bgcolor=#008B8B style=text-align:center><b>Status</b></td>"
                + "</tr>";

            let steps: string = sb.ToString();
            let endTable: string = "</table>" +
            "</p>" +
            "</div>";
            individulaTable = startsTable + steps + endTable;
        }
        catch (Error) {
            console.log("individual report not created");
        }

        return individulaTable;
    }
    async saveTestReport(report: string, reportName: string) {
        try {
            this.archieveFile();
            var fs = require('fs');
            const fName = '../Report/';
            const absolutePath = path.resolve(__dirname, fName);
            console.log("Absolute Path: " + absolutePath);
            var dir = absolutePath + "\\CurrentReport";
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFile(absolutePath + "\\CurrentReport" + "\\" + reportName + ".html", report, function (err: string) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
        catch (e) {
            console.log("Report Not Saved");
        }
    }
    async archieveFile() {
        var fs = require('fs');
        const fName = '../Report/';
        const absolutePath = path.resolve(__dirname, fName);
        console.log("Archieve Path: " + absolutePath);
        var dir = absolutePath + "\\Archieve";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

    }
    async dateNTime() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + "-" + today.getMilliseconds();
        var dateTime = date + "-" + time;
        return dateTime.toString();
    }
    async screenshotPattern() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime.toString();
    }
}
export const reports: CreateReport = new CreateReport();
