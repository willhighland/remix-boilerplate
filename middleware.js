export const config = {
	// Only run the middleware on /blocked
	matcher: '/blocked'
};

export default function middleware(request) {
	const url = new URL(request.url);
	url.pathname = 'index';

	// Always redirect to /index
	return Response.redirect(url);
}
