# React Native / Firebase Starter

A simple starter project for React Native apps, (iOS and Android), powered by Firebase. Main features include:

* Authentication - user registration and login.
* CRUD - user profile
* Photo upload to Firebase Storage - user's profile picture
* Firebase Analytics

## Author

Ian Turner ( [@i_am_turner](http://twitter.com/i_am_turner) / [iamturner.co.uk](http://iamturner.co.uk) )

## Dependencies

This project uses:

* RN Firebase ([Link](https://github.com/invertase/react-native-firebase))
* RN Vector Icons ([Link](https://github.com/oblador/react-native-vector-icons))
* RN Navigation ([Link](https://github.com/wix/react-native-navigation))
* RN Prompt Android ([Link](https://github.com/shimohq/react-native-prompt-android))
* RN Image Picker ([Link](https://github.com/react-community/react-native-image-picker))
* RN Image Resizer ([Link](https://github.com/bamlab/react-native-image-resizer))

## Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/iamturner/ReactNative-Firebase.git

$ cd ReactNative-Firebase/

$ npm install
```

```sh
$ react-native link
```

### iOS

On the command prompt run the following commands

```sh
$ cd ios/

$ pod install
```
**_Note:_** *To run app from XCode after installing pods, use the .xcworkspace file.*

Download the GoogleService-Info.plist file from your Firebase console and add to XCode project.

```sh
$ cd ../

$ react-native run-ios
```

#### Camera Roll

To allow camera roll access, you must link the RCTCameraRoll library to your project manually.

1. Drag the following project into Libraries in your XCode project:

	* <your_project>/node_modules/react-native/Libraries/CameraRoll/RCTCameraRoll.xcodeproj

2. Still in XCode, select *Build Phases*, and add the following under *Link Binary With Libraries*

	* libRCTCameraRoll.a

---

### Android

A few files in the android folder require some editing after installing and linking dependencies. These are:

* android/app/build.gradle
* android/app/src/main/java/com/starter/MainApplication.java

Download the google-services.json file from your Firebase console and add to android/app folder, (make sure 'package_name' and 'bundle_id' properties are the same as applicationId - currently 'com.starter').

**_Note:_** *Before running ` react-native run-android ` for the first time, open the project in Android Studio to generate local.properties file.*

```sh
$ react-native run-android
```
**_Tip:_** *To open an Android emulator without opening Android Studio (for MacOS).*

On the command prompt run the following commands.

```sh
Library/Android/sdk/tools/emulator -list-avds
```
This returns a list of installed emulators. Choose which emulator you want to run, e.g. Pixel_API_25, and then enter:

```sh
Library/Android/sdk/tools/emulator -avd <EMULATOR_NAME>
```
