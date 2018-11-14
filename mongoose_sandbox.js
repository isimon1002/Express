'use strict'

let mongoose = require("mongoose");

let db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/sandbox")

db.on("error", (err) => {
	console.error("connection error:", err)
})

db.once("open", () => {
	console.log("db connection successful")
	let Schema = mongoose.Schema;
	let AnimalSchema = new Schema({
		type: {type: String, default: "goldfish"}, 
		color: {type: String, default: "golden"},
		size: String,
		mass: {type: Number, default: "0.007"},
		name: {type: String, default: "Angela"}
	});

	AnimalSchema.pre("save", function(next) {
		if(this.mass >= 100){
		this.size = "big"
		} else if (this.mass >= 5 && this.mass < 100){
			this.size = "medium"
		} else {
			this.size = "small"
		}
		next();
	})

	AnimalSchema.statics.findSize = function(size, callback){
		return this.find({size: size}, callback);
	}

	AnimalSchema.methods.findSameColor = function(callback){
		return this.model("Animal").find({color: this.color}, callback)
	}
	let Animal = mongoose.model("Animal", AnimalSchema);

	let elephant = new Animal({
		type: "elephant",
		color: "gray",
		mass: 6000,
		name: "Lawrence"
	})

	let animal = new Animal({})

	let whale = new Animal({
		type: "whale",
		color: "gray",
		mass: 190500,
		name: "Fig"
	})

	let animalData = [
		{
			type: "mouse",
			color: "gray",
			mass: 0.035,
			name: "Marvin"
		},
		{
			type: "nutria",
			color: "brown",
			mass: 6.35,
			name: "Gretchen"
		},
		{
			type: "wolf",
			color: "grayn",
			mass: 45,
			name: "Iris"
		},
		elephant,
		animal,
		whale
	]

	Animal.remove({}, (err) => {
		if (err) console.error(err);
		Animal.create(animalData, (err, animals) => {
			if (err) console.error(err);
			Animal.findOne({type: "elephant"}, (err, animals) => {
				elephant.findSameColor(function(err, animals){
				if (err) console.error(err);
			// Animal.findSize("medium",(err, animals) => {
				animals.forEach((animal) => {
					console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.")
				})
				db.close(() => {
					console.log("db connect closed")
				})
			})
		})
		}) 
	})
})
