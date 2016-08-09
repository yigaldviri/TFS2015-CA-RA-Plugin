# **CA Technologies Run RA Deployment Plan**

The CA Release Automation Plug-In lets you create a deployment out of a deployment plan and run it on a specific environment.

## **Usage**

The extension installs the following components:

 - A service endpoint for connecting to the RA Server.
 - A RA Run Deployment task, to run an RA deployment out of a deployment plan.

Follow the steps given below to setup the extension and to use it properly. 

### **Create a CA Release Automation Server endpoint**

Visual Studio Team Services or Team Foundation Server requires a service connection to a RA Server to run deployments.  

   1. Open the **Services** tab in your Visual Studio Team Services or Team Foundations Server **Control Panel**.

 ![VSTS/TFS Control Panel](Images/adminPanel.png)

   2. From the **New Service Endpoint** list, select **CA Release Automation Server**.

 ![New RA Service Connection](Images/newService.png)

   3. In the **Add New CA Release Automation Server Connection** pop-up dialog, provide the required details to connect to the RA Server:
     * Provide a user friendly name for the service endpoint in the **Connection Name** like **Nolio**.
     * Enter the **RA Server URL**, like **http://nolio-server:8080/** or **https://nolio-secured-server:443/**. Note that **port is needed**.
     * Enter a **Username** and **Password** that has the required access to the RA Server. Press **OK** to create the connection.

 ![RA Connection](Images/connection.png)


### **Run an existing deployment plan**

 Lets say you have a Nolio application called 'Online services' and as part of the 'Web-application' project you want to deploy this sprint (sprint 7) latest build (number 56) to the QA environment.
 In order to do so follow the next steps: 
 
 1. Open your build or release definition and add the RA - Run Deployment Plan task. The task can be found in the **Deploy** section of the **Add Tasks** dialog.

 ![Add RA - Run Deployment Plan Task](Images/addVMwareTask.png)

 2. To run an existing deployment plan, fill-in the task parameters as described below:
    * **RA Service Connection**: In the dropdown, select the RA Server connection that was created above.
    * **Strategy**: In the dropdown, select the 'Run Existing Deployment Plan' option.
    * **Deployment Plan Name**: The existing deployment plan name you have created in Nolio.
    * **Application Name**: Nolio Application name.
    * **Project Name**: The Nolio Project which the deployment plan related to.
    * **Build Name**: The deployment plan build number **as you defined when creating the deployment plan**, not TFS build number.
    * **Deployment Name**: The name of the new created deployment. Note that you may use [TFS variables](https://www.visualstudio.com/docs/build/define/variables) in all of these fields.
    * **Deployment Stage To Perform**: The deployment stage you wish to execute. All The preceding stages will be executed..
    * **Environment**: The name of the environment to deploy on.
    
    Leave the advanced options empty as it relevant only for Scratch strategy.

 ![Snapshot VMware VMs](Images/snapshotTask.png)


### **Create and run a deployment plan from scratch**

 Lets say you have a Nolio application called 'Online services' and as part of the 'Web-application' project you want to deploy a template of the latest build to the QA environment.
 In order to do so follow the next steps: 
 
 1. Open your build or release definition and add the RA - Run Deployment Plan task just as described [above](#run-an-existing-deployment-plan).

 2. To run a deployment plan from scratch, fill-in the task parameters as described below:
    * **RA Service Connection**: In the dropdown, select the RA Server connection that was created above.
    * **Strategy**: In the dropdown, select the 'Run Deployment Plan from Scratch' option.
    * **Application Name**: Nolio Application name.
    * **Project Name**: The Nolio Project which the deployment plan should related to.
    * **Template Name**: TThe existing Template name you have created in Nolio.
    * **Deployment Template Name**: The existing Deployment Template name you have created in Nolio.
    * **Deployment Plan Name**: The name of the new created deployment plan. Note that you may use [TFS variables](https://www.visualstudio.com/docs/build/define/variables) in all of these fields
    * **Build Name**: The deployment plan build number. Use '$(Build.BuildNumber)' for TFS build number.
    * **Deployment Name**: The name of the new created deployment.
    * **Deployment Stage To Perform**: The deployment stage you wish to execute. All The preceding stages will be executed..
    * **Environment**: The name of the environment to deploy on.
    * **Timeout**: Maximum time to wait for Nolio Server to finish the deployment, default is 0 - meaning no timeout.
    
 3. You may also add these optional advanced fields in Scratch mode:
    * **Artifact Package**: Add an artifact package to the new Deployment Plan. You can use an existing package or an XML which will create a new one.
    * **Manifest**: Add a XML Manifest to supply values for Nolio Release Parameters.
    * **Properties**: Add a pairs of key-value to supply values to Nolio Template Properties.
    
    
 ![Snapshot VMware VMs](Images/snapshotTaskScratch.png)
 
