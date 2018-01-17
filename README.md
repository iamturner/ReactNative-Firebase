# React Native / Firebase Starter

A simple starter project for React Native apps, (iOS and Android), powered by Firebase.

## Author

Ian Turner ( [@i_am_turner](http://twitter.com/i_am_turner) / [iamturner.co.uk](http://iamturner.co.uk) )

## Dependencies

This project uses:

* RN Firebase ([Link](https://github.com/invertase/react-native-firebase))
* RN Vector Icons ([Link](https://github.com/oblador/react-native-vector-icons))
* RN Navigation ([Link](https://github.com/wix/react-native-navigation))
* RN Prompt Android ([Link](https://github.com/shimohq/react-native-prompt-android))

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
*Note: To run app from Xcode after installing pods, use the .xcworkspace file.*

Download the GoogleService-Info.plist file from your Firebase console and add to Xcode project.

```sh
$ cd ../

$ react-native run-ios
```

### Android

A few files in the android folder require some editing after installing and linking dependencies. These are:

* android/app/build.gradle
* android/app/src/main/java/com/starter/MainApplication.java

Download the google-services.json file from your Firebase console and add to android/app folder, (make sure 'package_name' and 'bundle_id' properties are the same as applicationId - currently 'com.starter').

*Note: Before running ` react-native run-android ` for the first time, open the project in Android Studio to generate local.properties file.*

```sh
$ react-native run-android
```