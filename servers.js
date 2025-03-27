// // const express = require('express');
// // const app = express();
// // const app1 = express();
// // const app2 = express();
// // const PORT = process.env.PORT || 4001; // Use different ports for each instance

// // app.get('/', (req, res) => {
// //     res.send(`Hello from Server running on port ${PORT}`);
// // });
// // app1.get('/', (req, res) => {
// //     res.send(`Hello from Server running on port 4002`);
// // });
// // app2.get('/', (req, res) => {
// //     res.send(`Hello from Server running on port 4003`);
// // });



// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });
// // app1.listen(4002, () => {
// //     console.log(`Server running on port 4002`);
// // });
// // app2.listen(4003, () => {
// //     console.log(`Server running on port 4003`);
// // });


// actual

// const express = require('express');
// const os = require('os');

// const app1 = express();
// const app2 = express();
// const app3 = express();

// // Track active connections for each server
// let activeConnections1 = 0;
// let activeConnections2 = 0;
// let activeConnections3 = 0;

// // Middleware to track active connections
// const trackConnections = (activeConnections) => (req, res, next) => {
//     activeConnections++;
//     res.on('finish', () => activeConnections--);
//     next();
// };

// // Status Route to Monitor Each Server
// const getStatus = (port, activeConnections) => (req, res) => {
//     const memoryUsage = process.memoryUsage().heapUsed / process.memoryUsage().heapTotal * 100;
//     const cpuUsage = os.loadavg()[0]; // 1-minute load average

//     res.json({
//         server: `http://localhost:${port}`,
//         cpu: cpuUsage.toFixed(2),
//         memory: memoryUsage.toFixed(2),
//         activeConnections
//     });
// };

// // Server 1 - Port 4001
// app1.use(trackConnections(activeConnections1));
// app1.get('/', (req, res) => {
//     res.send('Hello from Server running on port 4001');
// });
// app1.get('/status', getStatus(4001, activeConnections1));
// app1.listen(4001, () => console.log('Server running on port 4001'));

// // Server 2 - Port 4002
// app2.use(trackConnections(activeConnections2));
// app2.get('/', (req, res) => {
//     res.send('Hello from Server running on port 4002');
// });
// app2.get('/status', getStatus(4002, activeConnections2));
// app2.listen(4002, () => console.log('Server running on port 4002'));

// // Server 3 - Port 4003
// app3.use(trackConnections(activeConnections3));
// app3.get('/', (req, res) => {
//     res.send('Hello from Server running on port 4003');
// });
// app3.get('/status', getStatus(4003, activeConnections3));
// app3.listen(4003, () => console.log('Server running on port 4003'));




// const express = require('express');
// const os = require('os');
// const app1 = express();
// const app2 = express();
// const app3 = express();

// let activeConnections1 = 0;
// let activeConnections2 = 0;
// let activeConnections3 = 0;

// // Simulate response time calculation
// const getRandomResponseTime = () => Math.floor(Math.random() * 100) + 50; // Random 50-150ms

// const trackConnections = (activeConnections) => (req, res, next) => {
//     activeConnections++;
//     res.on('finish', () => activeConnections--);
//     next();
// };

// const getStatus = (port, activeConnections) => (req, res) => {
//     res.json({
//         server: `http://localhost:${port}`,
//         cpu: os.loadavg()[0].toFixed(2),
//         memory: ((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100).toFixed(2),
//         activeConnections,
//         responseTime: getRandomResponseTime()
//     });
// };

// // Server 1
// app1.use(trackConnections(activeConnections1));
// app1.get('/status', getStatus(4001, activeConnections1));
// app1.listen(4001, () => console.log('Server running on port 4001'));

// // Server 2
// app2.use(trackConnections(activeConnections2));
// app2.get('/status', getStatus(4002, activeConnections2));
// app2.listen(4002, () => console.log('Server running on port 4002'));

// // Server 3
// app3.use(trackConnections(activeConnections3));
// app3.get('/status', getStatus(4003, activeConnections3));
// app3.listen(4003, () => console.log('Server running on port 4003'));




// actual second 


// const express = require("express");

// const app1 = express();
// const app2 = express();
// const app3 = express();

// // Function to simulate dynamic server metrics
// const getServerStatus = (port) => {
//     return {
//         server: `http://localhost:${port}`,  // Use the actual port
//         cpu: (Math.random() * 5).toFixed(1), // Simulate CPU usage (1.0 - 5.0 GHz)
//         memory: (Math.random() * 60 + 30).toFixed(1), // Memory usage (30% - 90%)
//         activeConnections: Math.floor(Math.random() * 10), // Active users (0-9)
//         responseTime: Math.floor(Math.random() * 150) + 50 // Response time (50-200 ms)
//     };
// };

// // API to get status for each server
// app1.get("/status", (req, res) => {
//     res.json(getServerStatus(4001));  // Pass correct port
// });
// app1.listen(4001, () => console.log("Server running on port 4001"));

// app2.get("/status", (req, res) => {
//     res.json(getServerStatus(4002));  // Pass correct port
// });
// app2.listen(4002, () => console.log("Server running on port 4002"));

// app3.get("/status", (req, res) => {
//     res.json(getServerStatus(4003));  // Pass correct port
// });
// app3.listen(4003, () => console.log("Server running on port 4003"));





// const express = require("express");
// const os = require("os");

// const createWorkerApp = (port) => {
//     const app = express(); 
//     app.use(express.json());

//     // Heavy computation: Matrix multiplication
//     const matrixMultiply = (size) => {
//         let A = Array.from({ length: size }, () =>
//             Array.from({ length: size }, () => Math.random())
//         );
//         let B = Array.from({ length: size }, () =>
//             Array.from({ length: size }, () => Math.random())
//         );

//         let C = Array.from({ length: size }, () => new Array(size).fill(0));

//         console.time(`Matrix Multiplication on Port ${port}`);
//         for (let i = 0; i < size; i++) {
//             for (let j = 0; j < size; j++) {
//                 for (let k = 0; k < size; k++) {
//                     C[i][j] += A[i][k] * B[k][j];
//                 }
//             }
//         }
//         console.timeEnd(`Matrix Multiplication on Port ${port}`);

//         return C;
//     };

//     // API to receive input, process, and return results
//     app.post("/compute", (req, res) => {
//         const { size } = req.body;
//         const startTime = process.hrtime();
//         matrixMultiply(size);
//         const endTime = process.hrtime(startTime);
//         const elapsedTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to ms

//         res.json({
//             server: `app-${port}`,
//             cpu: os.loadavg()[0].toFixed(2),
//             memory: ((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100).toFixed(2),
//             elapsedTime: elapsedTime.toFixed(2) + " ms",
//         });
//     });

//     // Start the server
//     app.listen(port, () => console.log(`Worker Server (app-${port}) running on port ${port}`));
// };

// // Create three worker servers
// const ports = [4001, 4002, 4003];
// ports.forEach((port) => createWorkerApp(port));


const express = require("express");
const os = require("os");

const app1 = express();
// const app2 = express();
// const app3 = express();


const getCPUUsage = () => {
    const cpus = os.cpus();
    let totalIdle = 0, totalTick = 0;

    cpus.forEach((cpu) => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    return (100 - (totalIdle / totalTick) * 100).toFixed(1); // Percentage CPU usage
};
// Function to perform random matrix multiplication
const performMatrixMultiplication = (size = 100) => {
    const A = Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.random())
    );
    const B = Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.random())
    );
    const C = Array.from({ length: size }, () => Array(size).fill(0));
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
};

// Function to simulate dynamic server metrics
const getServerStatus = (port) => {
    performMatrixMultiplication(500); // Perform matrix multiplication to simulate CPU load
    
    return {
        server: `http://localhost:${port}`,  // Use the actual port
        // cpu: os.loadavg()[0].toFixed(2), // Real CPU load average
        cpu: getCPUUsage() + " %",
        memory: ((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100).toFixed(2), // Real memory usage
        activeConnections: Math.floor(Math.random() * 10), // Simulated active users (0-9)
        responseTime: Math.floor(Math.random() * 150) + 50 // Simulated response time (50-200 ms)
    };
};

// API to get status for each server
app1.get("/status", (req, res) => {
    res.json(getServerStatus(8080));  // Pass correct port
});
app1.listen(process.env.port || 8080,function(){
    console.log("server is runninh at port 3000") ;
})

// app2.get("/status", (req, res) => {
//     res.json(getServerStatus(4002));  // Pass correct port
// });
// app2.listen(4002, () => console.log("Server running on port 4002"));

// app3.get("/status", (req, res) => {
//     res.json(getServerStatus(4003));  // Pass correct port
// });
// app3.listen(4003, () => console.log("Server running on port 4003"));
