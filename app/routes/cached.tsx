import { useLoaderData } from '@remix-run/react';

export function headers() {
	// Return stale-while-revalidate headers. Cache for 5 minutes, but
	// revalidate in the background for up to 1 hour.
	return {
		'cache-control': 's-maxage=300, stale-while-revalidate=3600'
	};
}

export async function loader({ request }) {
	const headers = Object.fromEntries(request.headers.entries());
	// Wait 5 seconds to simulate a slow response
	await new Promise(resolve => setTimeout(resolve, 5000));
	return { date: new Date().toISOString(), headers };
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
