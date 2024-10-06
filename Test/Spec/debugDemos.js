describe('ApiDemos', () => {

    // anything i want to do with screen i will use driver object> example is pause and scroll 
    // anything i wnat to do with element i will use the locator

    it('',async () => {

        // UIAutomator2-driver can be access by driver object
       await driver.pause(5000);
       const app=await $("~App");
       const ActionBar= await $("~Action Bar");
        // any of the locator here in mobile testing we are going to give with $("~ACID") 
        app.click();
       await expect(ActionBar).toBeExisting();
        // tobeexisting will assert the element is present or exist


        
    });

    it('',async () => {

        const title=await $("android.widget.TextView");// class

        console.log(await title.getText());

        await expect(title).toHaveText("API Demos");
        
    });

    it('', async() => {

        const ActionBar= await $("~Action Bar");

        const ActionBarMechanics= await $("~Action Bar Mechanics");

        ActionBar.click();

        await  ActionBarMechanics.click();

    });
    
    it('scroll', async() => {

        const app=await $("~App");
        await app.click();
        //you need to give perticular android = locator
        await $('android=new UiSelector().text("Activity")').click();

        //xpath locator-no need to give any symbol
       const sec= await $('//android.widget.TextView[@content-desc="Secure Surfaces"]')
       driver.execute("mobile:scroll",{strategy:"accessibility id",selector:'Secure Surfaces'})
       //driver.execute("activity",{properties}) only accessibility id and class will working properties
        await sec.click();
    });
    
    it('',async () => {

        const app=await $("~App");
        await app.click();
        //you need to give perticular android = locator
        await $('android=new UiSelector().text("Activity")').click();

        //xpath locator-no need to give any symbol
       const sec= await $('//android.widget.TextView[@content-desc="Translucent"]')
       driver.execute("mobile:scroll",{strategy:"accessibility id",selector:'Translucent'})
       //driver.execute("activity",{properties}) only accessibility id and class will working properties
        await sec.click();
        
        
    });
    
    // it.only('swipe', async() => {

    //     const app=await $("~App");
    //     await app.click();
    //     //you need to give perticular android = locator
    //     await $('android=new UiSelector().text("Activity")').click();
    //     driver.execute("mobile:swipe",{direction:"down"})
        
    // });

    it('views',async () => {
        await $('~Views').click();
        await $('~Auto Complete').click();
        await $('~1. Screen Top').click();
        await $('android=new UiSelector().resourceId("io.appium.android.apis:id/edit")').setValue('india');
        // setvalue will be use to tap inside nattive app input

        await $('android=new UiSelector().resourceId("io.appium.android.apis:id/edit")').click();

        await $('~Give me Focus').click();
    });
    
    it('verify text multiple elements',async () => {

        const expectedList = [
            'API Demos', 'Accessibility', 'Animation', 'App', 'Content',
            'Graphics', 'Media', 'NFC', 'OS', 'Preference', 'Text', 'Views'
        ];

        const actualList =[]

        const classList= await $$('android.widget.TextView')
        //to find the element in a same class we will give $$

        for(const element of classList){
            const textElement= await element.getText();
            actualList.push(textElement);
        }

        console.log(actualList);
        await expect(actualList).toEqual(expectedList);
    });

    it('Notification', async() => {
        // to access the notification
        await driver.openNotifications();

        await $("~Clear all notifications.").click();
        
    });
    
    it('Alerts', async() => {

        const app=await $("~App");
        await app.click();

        await $("~Alert Dialogs").click();

        await $("~OK Cancel dialog with a message").click();

        // this for click ok button
        //await driver.acceptAlert();

        // this for click cancel button
        await driver.dismissAlert();

        $("~OK Cancel dialog with a long message").click();

       // await driver.acceptAlert();

       await driver.dismissAlert();
    });
    
    it('navigation',async () => {

        await driver.back();
       // await driver.back();
        await driver.pressKeyCode(4);// also for back but forcefull
        
         // Back Button: 4
        // Home Button: 3
        // Apps Button (Recent Apps): 187
        // Menu Button: 82
        // Search Button: 84
        // Enter Button: 66
        // Volume Up: 24
        // Volume Down: 25
        // Power Button: 26   

        await driver.pressKeyCode(3);
        await driver.pressKeyCode(187);
        await driver.pressKeyCode(82);
        await driver.pressKeyCode(84);
        await driver.pressKeyCode(66);
        await driver.pressKeyCode(24);
        await driver.pressKeyCode(25);
        await driver.pressKeyCode(26);
    });
    
    it.only('identify app type',async () => {

       const context= await driver.getContext();
       console.log(context)
        
    });
    

});