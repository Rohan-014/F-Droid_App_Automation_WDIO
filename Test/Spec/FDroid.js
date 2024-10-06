describe('FDroid App Testing', () => {
    it('Setting Test', async() => {

        const settings = await $("~Settings");
        const MYapps = await $('android=new UiSelector().className("android.widget.RelativeLayout").instance(3)');
        const fdroid = await $('android=new UiSelector().className("android.view.ViewGroup").instance(2)');
        const dark = await $('android=new UiSelector().text("Dark")');

        await settings.click(); // cliked on settings
        await MYapps.click(); // clicked on MY apps
        await fdroid.click(); // clicked on fdroid app
        await $('~Navigate up').click(); // navigating back
        await $('~Navigate up').click(); // navigating back

        const scrollable = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Theme"))';
        const theme = await $(`android=${scrollable}`);
        await theme.click();// clicked on theme
        await dark.click(); // clicked on dark theme
        
    });

    it('Notification', async() => {
        // to access the notification
        await driver.openNotifications();
        await driver.back();
    });

    it('switching app', async() => {

        await driver.activateApp('com.androidsample.generalstore'); // Switch to another app
        await driver.pause(5000); // Perform any action or pause to observe the app
        await driver.terminateApp('com.androidsample.generalstore'); // Close the other app
        
        // Switch back to FDroid app 
        await driver.activateApp('org.fdroid.fdroid'); // Switch back to FDroid
        
    });
    
});