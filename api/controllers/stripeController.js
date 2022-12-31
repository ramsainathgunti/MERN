const createConnectAccount = async(req, res) => {
    console.log(req.username, req.email);
    console.log("You hit create COonnect Account");
    res.json("You hit create COonnect Account");
};

module.exports = createConnectAccount;