const db = require('../database/models/index')
const userModel = db.usersModel
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.signUp = async (req, res) => {
    try {
        const userObj = {
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: bcrypt.hashSync(req.body.password, 8)
        }

        const createUser = await userModel.create(userObj);

        if (createUser) {
            var token = jwt.sign({ id: createUser._id }, config.APP_SECRET);

            const updateAccessToken = await userModel.updateOne({ _id: createUser._id }, { access_token: token })
            if (updateAccessToken) {
                var data = {}
                data.user_details = createUser;
                data.token = token
                return res.status(200).send({
                    status: true,
                    message: 'Created successfully!',
                    data: data
                })
            }
            return res.status(200).send({
                status: true,
                message: 'User registered successfully!'
            })
        }

        return res.status(400).send({
            status: false,
            message: 'Something went wrong, while creating user!'
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.signIn = async (req, res) => {
    try {
        const userDetails = await userModel.findOne({ email: req.body.email }, '_id email password name mobile_no created_at');
        if (userDetails) {
            const passwordMatch = await bcrypt.compareSync(req.body.password, userDetails.password)
            if (passwordMatch) {

                var token = jwt.sign({ id: userDetails._id }, config.APP_SECRET);

                const updateAccessToken = await userModel.updateOne({ _id: userDetails._id }, { access_token: token })
                if (updateAccessToken) {
                    var data = {}
                    data.user_details = userDetails;
                    data.token = token
                    return res.status(200).send({
                        status: true,
                        message: 'user logged in successfully!',
                        data: data
                    })
                }


                return res.status(400).send({
                    status: false,
                    message: 'Something went wrong, try again later!'
                })
            }
            return res.status(200).send({
                status: true,
                message: 'Password mismatch!'
            })
        }
        return res.status(200).send({
            status: true,
            message: "User doesn't exist"
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.userDetails = async (req, res) => {
    try {
        const userDetails = await userModel.findById(req.userId)
        if (userDetails) {
            return res.status(200).send({
                status: true,
                message: 'User details fetched successfully!',
                data: userDetails
            })
        }
        return res.status(200).send({
            status: true,
            message: 'No data found!',
            // data: userDetails
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}