export const config = {
	// Only run the middleware on /blocked
	matcher: '/blocked'
};

export default function middleware(request) {
	const url = new URL(request.url);
	console.log('Running middleware', url.pathname);
	url.pathname = 'index';

	// Always redirect to /index
	return Response.redirect(url);
}
