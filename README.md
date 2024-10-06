# F-Droid App Automation with WebdriverIO

This project automates the testing of the **F-Droid** mobile app using **WebdriverIO** and **Appium**. The automation suite includes test cases that cover app settings navigation, theme switching, notification handling, and app switching between multiple apps.

## Technologies Used

- **WebdriverIO**: A Node.js-based automation framework for web and mobile applications.
- **Appium**: A cross-platform mobile automation tool used to interact with Android devices.
- **JavaScript**: The main programming language used for scripting the test cases.
- **Appium Inspector**: Used for identifying locators in the F-Droid app.
- **Android Emulator**: Used for testing on virtual Android devices.

## Project Features

- **Automated Settings Navigation**: The script navigates through the F-Droid app settings, accesses 'My Apps', and changes the theme to dark mode.
- **Notification Handling**: Automates the opening and clearing of notifications on the Android device.
- **App Switching**: The test suite switches between the F-Droid app and another app (General Store), and then returns to F-Droid.

## Test Scenarios

1. **Settings and Theme Change**
   - Navigate to settings.
   - Access the "My Apps" section.
   - Switch the theme to dark mode.

2. **Notification Management**
   - Open and clear the Android notifications.
   
3. **App Switching**
   - Switch between F-Droid and another app (General Store).
   - Return to F-Droid after interacting with the other app.
  ---
