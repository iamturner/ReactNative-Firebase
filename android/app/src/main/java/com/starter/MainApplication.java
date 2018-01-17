package com.starter;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// RNFirebase optional packages
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

// RNNavigation
import com.reactnativenavigation.NavigationApplication;
// remove `import com.reactnativenavigation.NavigationReactPackage;`.

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
	
	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}
	
	// remove `new NavigationReactPackage()`.
	protected List<ReactPackage> getPackages() {
		return Arrays.<ReactPackage>asList(
			new MainReactPackage(),
			// Add these packages as appropriate
			new RNFirebaseAuthPackage(),
			new RNFirebaseDatabasePackage(),
			new RNFirebaseStoragePackage(), 
		);
	}
	
	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}

	@Override
	public String getJSMainModuleName() {
		return "index";
	}
	
}
