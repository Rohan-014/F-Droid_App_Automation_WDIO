describe('Khan Academy', () => {
    it('t1',async() => {

        const dismiss=$('android=new UiSelector().text("Dismiss")')
        const search=$('~Search tab');
        const computing=$('android=new UiSelector().className("android.widget.Button").instance(6)')
        const computerSci=$('android=new UiSelector().text("Computer science theory")')
        const cryptography=$('android=new UiSelector().className("android.view.ViewGroup").instance(6)')
        const acbookmark=$('android=new UiSelector().className("android.widget.ImageView").instance(0)')
        const ccbookmark=$('android=new UiSelector().className("android.widget.ImageView").instance(6)')
        const mabookmark=$('android=new UiSelector().className("android.widget.ImageView").instance(5)')
        const infotheory=$('android=new UiSelector().className("android.view.ViewGroup").instance(12)')
        const mitbookmark=$('android=new UiSelector().className("android.widget.ImageView").instance(10)')
        const bookmarkTab=$('~Bookmarks tab');
        const edit=$('android=new UiSelector().text("Edit")')
        const delet=$('android=new UiSelector().text("Delete")');
        const Lifeskills=$('android=new UiSelector().className("android.widget.Button").instance(9)')
        const financialLite=$('android=new UiSelector().text("Financial Literacy")')
        const welcToFina=$('android=new UiSelector().className("android.view.ViewGroup").instance(8)')
        const welcToFinaDOC=$('android=new UiSelector().className("android.widget.Button").instance(2)')
        const home=$('~Explore tab')
        await dismiss.click();
        await search.click();
        await computing.click();
        await computerSci.click();
        await cryptography.click();
        await acbookmark.click();
        await driver.dismissAlert();
        await driver.execute("mobile:scroll",{strategy:"xpath",selector:"//android.widget.TextView[@text='Cryptography challenge 101']"})
        await ccbookmark.click();
        await driver.execute("mobile:scroll",{strategy:"xpath",selector:"//android.widget.TextView[@text='Modular arithmetic']"})
        await mabookmark.click();
        await driver.back();
        await infotheory.click();
        await mitbookmark.click();
        await bookmarkTab.click();
        const exp=[
            'Modern information theory','Modular arithmetic','Cryptography challenge 101','Ancient cryptography'
        ]
        const actualList =[]

        const classList= await $$('android.widget.Button')
       
        for(const element of classList){
            const textElement= await element.getText();
            actualList.push(textElement);
        }

        console.log(actualList);
        await expect(actualList).toEqual(expectedList);

        await edit.click();
        await delet.click();

        await search.click();
        await driver.back();
        await driver.back();
        await driver.back();
        await Lifeskills.click();
        await financialLite.click();
        await welcToFina.click();
        await welcToFinaDOC.click();
        await home.click();

        const recent=await $("android.widget.TextView");

        console.log(await recent.getText());

        await expect(recent).toHaveText("Intro to Financial Literacy");
        
        
    });
});