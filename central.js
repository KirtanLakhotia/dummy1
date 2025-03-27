// actual

// const express = require('express');
// const httpProxy = require('http-proxy');
// const axios = require('axios');

// const app = express();
// const proxy = httpProxy.createProxyServer({});
// const servers = ['http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003'];
// let currentIndex = 0;
// const serverStats = {}; // Store server stats

// // Round Robin Load Balancing
// app.use(async (req, res) => {
//     const target = servers[currentIndex]; 
//     currentIndex = (currentIndex + 1) % servers.length;

//     // Measure response time
//     const startTime = Date.now();
//     proxy.web(req, res, { target }, (err) => {
//         if (err) res.status(500).send("Error connecting to backend server.");
//     });
    
//     res.on('finish', () => {
//         const responseTime = Date.now() - startTime;
//         if (serverStats[target]) serverStats[target].responseTime = responseTime;
//     });
// });

// // Get Load Balancer Stats
// app.get('/stats', async (req, res) => {
//     const results = await Promise.all(servers.map(async (server) => {
//         try {
//             const response = await axios.get(`${server}/status`);
//             const { cpu, memory, activeConnections } = response.data;
            
//             // Store stats
//             serverStats[server] = {
//                 cpu,
//                 memory,
//                 activeConnections,
//                 responseTime: serverStats[server]?.responseTime || 0
//             };

//             return { server, cpu, memory, activeConnections, responseTime: serverStats[server].responseTime };
//         } catch (error) {
//             return { server, error: "Server not responding" };
//         }
//     }));

//     // Determine the best server (lowest response time)
//     const bestServer = results
//         .filter(s => !s.error)
//         .sort((a, b) => a.responseTime - b.responseTime)[0]?.server || "No server available";

//     res.json({ servers: results, bestServer });
// });

// app.listen(3000, () => {
//     console.log('Load Balancer running on port 3000');
// });





// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 5000;

// const backendServers = ['http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003'];

// app.get('/monitor', async (req, res) => {
//     try {
//         // Fetch status from all backend servers
//         const statusResponses = await Promise.all(
//             backendServers.map(server => axios.get(`${server}/status`).catch(err => null))
//         );

//         // Extract valid responses
//         const serversData = statusResponses
//             .filter(response => response !== null)
//             .map(response => response.data);

//         if (serversData.length === 0) {
//             return res.status(500).json({ message: 'No servers are responding' });
//         }

//         // Find the best server (based on lowest response time)
//         const bestServer = serversData.reduce((prev, curr) => (curr.responseTime < prev.responseTime ? curr : prev));

//         res.json({
//             servers: serversData,
//             bestServer: bestServer.server
//         });

//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching server statuses', error: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Central server running on port ${PORT}`);
// });





const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000; // Central server port

const SERVERS = ["https://dummy-i3nw.onrender.com"];

// Function to fetch statuses from all servers
const fetchAllServerStatuses = async () => {
    try {
        const statusPromises = SERVERS.map(server => axios.get(`${server}/status`));
        const responses = await Promise.all(statusPromises);
        return responses.map(res => res.data);
    } catch (error) {
        console.error("Error fetching server statuses:", error.message);
        return [];
    }
};

// API to get statuses of all servers
app.get("/status", async (req, res) => {
    const statuses = await fetchAllServerStatuses();
    res.json({ servers: statuses });
});

// Start central server
app.listen(PORT, () => {
    console.log(`Central server running on port ${PORT}`);
});
