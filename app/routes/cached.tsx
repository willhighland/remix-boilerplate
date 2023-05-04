import { useLoaderData } from '@remix-run/react';

export function headers({ request }) {
	// Return stale-while-revalidate headers. Cache for 5 minutes, but
	// revalidate in the background for up to 1 hour.
	const headers = Object.fromEntries(request.headers.entries());

	return {
		'cache-control': 's-maxage=300, stale-while-revalidate=3600',
		headers
	};
}

export function loader() {
	return { date: new Date().toISOString() };
}

export default function Blocked() {
	const { date, headers } = useLoaderData();
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<h1>This should be cached</h1>
			<p>Current time: {date}</p>
			<pre>{JSON.stringify(headers, null, 2)}</pre>
		</div>
	);
}
