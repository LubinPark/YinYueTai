/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "Orientation.h"

#import <AVFoundation/AVFoundation.h>  // react-native-video 引入的必要的package

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  //状态栏白色
  [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
  
  //react-native-video allow
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"YinYueTai"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

//状态栏白色
-(UIStatusBarStyle)preferredStatusBarStyle {
  return UIStatusBarStyleLightContent;
}

//react-native-orientation 支持旋转 添加
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
