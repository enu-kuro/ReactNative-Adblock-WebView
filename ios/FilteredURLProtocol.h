//http://qiita.com/koyopro/items/7ae28b5f58f99e87c1f9

@interface FilteredURLProtocol : NSURLProtocol
+(BOOL)canInitWithRequest:(NSURLRequest *)request;
+(NSURLRequest *)canonicalRequestForRequest:( NSURLRequest *)request;
-(void)startLoading;
-(void)stopLoading;
@end