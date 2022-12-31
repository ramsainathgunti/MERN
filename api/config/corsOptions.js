const allowedHosts = ["http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedHosts.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;