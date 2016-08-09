# Visual Studio Team Services Plugin
<br/>
<p align="center">
 <img title="What up, yo?" src="./truck.gif"/>
</p>
<br/>

## Overview
This project implements a Visual Studio Team Services (a.k.a new TFS / TFS 2015 / whatever) build step extension for integrating with CA Technologies Release Automation.
### Tech stack
 - Typescript 
 - Gulp  
 - Node / npm
 - TFX - Microsoft command line tool for packaging and publishing TFS stuff

The outcome is a VSIX file (sort of a JAR) which may be uploaded to Visual Studio Marketplace and shared with others (i/e/ clients).  

## How to build
We are using Gulp to run build task.  
In the project root directory run:  

    project-root-directory/> mvn install 


After that, execute one of this task according to your need:

 - Run ```gulp``` or ```gulp package``` to trigger a clean -> build -> package tasks which will generate the VSIX in _package directory.
 - Run ```gulp build``` to trigger clean -> build tasks which will generate the JS files in _build directory.
 - Run ```gulp clean``` to trigger clean which will clean all of the generated directories.
 - Run ```gulp lint``` to trigger ts-lint task.
  

**NOTICE**:  This product is owned and/or licensed by CA Technologies (“CA”). 
An active license agreement for CA Application Performance Management (“License Agreement”) is required for its use.  
Your use of this product is governed by the terms of the License Agreement.  
If you do not have an active License Agreement with CA, you may not use this product.  
For details, please contact CA.
