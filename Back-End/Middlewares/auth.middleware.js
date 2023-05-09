const { client } = require("../Config/redis");
const { blackmodel } = require("../Models/blackmodel");
const jwt = require("jsonwebtoken")
require("dotenv").config()



const middleware = async (req, res, next) => {
    try {
        let token = await client.get('token');
        let refreshtoken = await client.get('refreshtoken');


        // console.log(token, refreshtoken);
        if(token){
            console.log('token hai');
        }else{
            console.log('token nhi hai');
        }
        if(refreshtoken){
            console.log('refresh token hai');
        }else{
            console.log('refresh token nhi hai');
        }

        if (!token) {

            if (!refreshtoken) {

                return res.status(400).send({ "msg": "Please login first. AccessToken Not Found (case 0)" });

            } else {
                try {
                    let decodRefreshToken = jwt.verify(refreshtoken, process.env.secretkey);

                    if (decodRefreshToken) {

                        let { id, verified, role } = decodRefreshToken

                        let token = jwt.sign({ id, verified, role }, process.env.secretkey, { expiresIn: "6hr" })
                        client.set('token', token, 'EX', 21600);

                        req.id = id
                        req.verified = verified
                        req.role = role

                        next()


                    } else {

                        return res.status(400).send({ "msg": "Please login first. case 1 " });

                    }
                } catch (error) {

                    return res.status(400).send({ "msg": "Please login first. case 2" });

                }
            }

        } else {
            try {

                const istokenblacklist = await blackmodel.findOne({ token: token });
                const isrefreshtokenblacklisted = await blackmodel.findOne({ token: refreshtoken });


                if (istokenblacklist || isrefreshtokenblacklisted) {
                    return res.status(400).send({ msg: "Not Authorized. PLease Login Again" });
                }

                try {

                    let decodedtoken = jwt.verify(token, process.env.secretkey);

                    let decodedrefreshtoken = jwt.verify(refreshtoken, process.env.secretkey);

                    if (!decodedtoken) {
                        if (!decodedrefreshtoken) {
                            return res.status(400).send({ msg: "not authorized" });
                        } else {
                            let { id, verified, role } = decodedrefreshtoken

                            let token = jwt.sign({ id, verified, role }, process.env.secretkey, { expiresIn: "6hr" })
                            client.set('token', token, 'EX', 21600);

                            req.id = id
                            req.verified = verified
                            req.role = role

                            next()

                        }

                    } else {

                        let { id, verified, role } = decodedtoken
                        req.id = id
                        req.verified = verified
                        req.role = role

                        next();
                    }




                } catch (error) {
                    return res.status(400).send({ "msg": "Please login first. case 3" });
                }

            } catch (error) {
                return res.status(400).send({ "msg": "Please login first. case 4" });
            }

        }


    } catch (error) {
        res.send(error)
        console.log(error)
    }


}

module.exports = {
    middleware
}