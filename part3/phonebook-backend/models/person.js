require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.connect(url)
	.then(console.log("connected to mongoDB"))
	.catch((error) => {
		console.log("error conecting to mongoDB:", error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			// must fit DDD-DDDDDDDD
			// DD-DDDDDDDD
			validator: (v) => {
				return /\d{3}-\d/.test(v) || /\d{2}-\d/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
	}
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Person", personSchema);