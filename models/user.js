const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const { generateToken } = require('../services/auth');
const userSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password :{
        type: String,
        required: true
    },
    profileImageURL:{
        type: String,
        default: "/images/man.png"
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {timestamps: true});


userSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(32).toString();
    const hash = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hash;
    next();


});

userSchema.static('authenticate', async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");
    const hash = createHmac("sha256", user.salt).update(password).digest("hex");
    const isCorrect = user.password === hash;
    if(!isCorrect) throw new Error("Password is incorrect");
    const token = generateToken(user);
    return token;
})
const User = model('User', userSchema);

module.exports = User;