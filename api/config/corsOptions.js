const allowedHosts = ["http://localhost:3000"];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedHosts.indexOf(origin) != -1 || !origin) {
            callback(null, true);
        } else {
            callback(Error("CORS not allowed"));
        }
    },
};

module.exports = corsOptions;