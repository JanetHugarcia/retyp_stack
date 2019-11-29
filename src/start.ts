import DemoServer from './DemoServer';

const PORT = 4000;
// Start the server or run tests
if (process.argv[2] !== 'test') {
    const server = new DemoServer();
    server.start(PORT);
}
