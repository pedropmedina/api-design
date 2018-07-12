import http from 'http';

import app from './server';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

let currentApp = app;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		// on 'request' event remove currentApp from server
		server.removeListener('request', currentApp);
		// assign new app with modification to server on 'request' event
		server.on('request', app);
		// reassign currentApp to the currently running app to continue cycle
		currentApp = app;
	});
}
