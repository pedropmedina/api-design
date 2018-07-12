import http from 'http';

import config from './config';
import app from './server';

const server = http.createServer(app);

let currentApp = app;

const port = config.port;

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
