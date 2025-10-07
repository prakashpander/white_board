const { generateToken04 } = require("../zegoServerAssistant.js");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const appID = Number(process.env.APPID);

const serverSecret = process.env.SERVER_SECRET;
const effectiveTimeInSeconds = 86400;

exports.genrateZegoToken = (req, res) => {

    try {
        const { userId, roomId } = req.body;

        const payload = JSON.stringify({ room_id: roomId });

        const token = generateToken04(appID, userId, serverSecret, effectiveTimeInSeconds, payload);

        res.status(200).json({
            token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error
        });
        console.log("post request mai error aaya hai = ", error);
    };
};
