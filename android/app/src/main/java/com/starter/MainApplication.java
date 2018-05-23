package com.starter;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// RNFirebase optional packages
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;

// RNNavigation
import com.reactnativenavigation.NavigationApplication;
// *** REMOVE `import com.reactnativenavigation.NavigationReactPackage;`. ***

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
	
	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}
	
	// *** REMOVE `new NavigationReactPackage()`. ***
	protected List<ReactPackage> getPackages() {
		return Arrays.<ReactPackage>asList(
			new MainReactPackage(),
			// Add these packages as appropriate
			new RNFirebaseAuthPackage(),
			new RNFirebaseDatabasePackage(),
			new RNFirebaseStoragePackage(),
			new RNFirebaseAnalyticsPackage(),
			new RNFirebaseFirestorePackage()
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
	
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
		MultiDex.install(this);
	}
	
}
