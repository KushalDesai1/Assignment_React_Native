# Assignment_React_Native

<b>Pre-requisites</b>
1. Android Studio (to deploy app on Android emulator)
2. Xcode  (to deploy app on iPhone simulator)
3. React environment setup - https://reactnative.dev/docs/environment-setup

To install necessary dependencies, use ```npm install``` from the terminal.

To deploy app on emulator
1. Android: Run ```npx react-native run-android```
2. iPhone: Run ```npx react-native run-ios```

To deploy app on device
1. Android: Run ```npx react-native run-android``` (Please connect your Android device to your computer and enable USB debugging)
2. iPhone: Run ```npx react-native run-ios --device "<device_name>"```
(if above command fails, please run ```npx react-native run-ios --device --udid <udid_number>```)

To generate the android build, please follow these steps:
1. Open terminal and navigate to android folder in the project using ```cd android```
2. Enter ```./gradlew assembleDebug``` to generate the debug build in Android. The build will be generated at <project_folder>\android\app\build\outputs\apk\debug\app-debug.apk

Since the backend service used in developing the app was free & had limited requests, I could not take more screenshots.
Link to screenshots: https://drive.google.com/file/d/1_XMaJ4uCNLW4ToRjXF3zx6rMZ2JkhkbY/view?usp=sharing
