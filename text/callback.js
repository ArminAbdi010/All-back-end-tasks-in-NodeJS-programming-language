const { required } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/course")
  .then(console.log("DB connected"))
  .catch((e) => {
    console.log(e.message);
  });

const modelCourse = mongoose.model(
  "course",
  new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
  })
);

const createCourse = new modelCourse({
  name: "javaScript",
  price: 40000000,
});

async function SaveCourse() {
  try {
    console.log(await createCourse.save());
  } catch (e) {
    console.log(e.message);
  }
}

async function findCourse() {
  try {
    const findCourse = await modelCourse
      .find({ price: { $gte: 4000, $lte: 9000000000 } })
      .skip()
      .limit(1)
      .sort({ name: -1 })
      .select({ name: 1 });
    console.log(findCourse);
  } catch (e) {
    console.log(e.message);
  }
}

// SaveCourse();
// findCourse();
