//
//  AdblockManager.m
//  App
//
//  Created by Nobuhito Kurose on 1/14/16.
//  Copyright © 2016 Nobuhito Kurose All rights reserved.
//

#import "AdblockManager.h"
#import "FilteredURLProtocol.h"
@implementation AdblockManager


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setAdblock:(RCTResponseSenderBlock)callback)
{
  [NSURLProtocol registerClass:FilteredURLProtocol.class];
  NSString* result = @"setAdblock";
  callback(@[result]);
  
}

RCT_EXPORT_METHOD(unsetAdblock:(RCTResponseSenderBlock)callback)
{
  [NSURLProtocol unregisterClass:FilteredURLProtocol.class];
  NSString* result = @"unsetAdblock";
  callback(@[result]);
}
@end
