import { next } from '@vercel/edge';

export const config = {
	// Only run the middleware on /cached
	matcher: '/cached'
};

export default function middleware(request) {
	// If the request has the no_cache=1 cookie, then set a header to disable caching
	console.log('Running middleware');
	if (request.headers.get('cookie')?.includes('no_cache=1')) {
		console.log('Setting no-cache header');
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set('Authorization', 'bearer 1234');
		return next({
			request: {
				headers: requestHeaders
			}
		});
	}

	// Otherwise, do nothing and let the request continue
	return next();
}
