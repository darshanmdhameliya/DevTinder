const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRequest = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRequest);

// Get user by name

// app.get("/user", async (req, res) => {
//   const usersfirstname = req.body.firstName;

//   try {
//     const users = await User.find({ firstName: usersfirstname });
//     if (users.length === 0) {
//       res.status(404).end("user not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// });

// // findone

// app.get("/findone", async (req, res) => {
//   const users = req.body.emailId;

//   try {
//     const dd = await User.findOne({ emailId: users });
//     if (!dd) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(dd);
//     }
//   } catch (err) {
//     res.status(400).send("Something Went wrong");
//   }
// });

// // get all users
// app.get("/feed", async (req, res) => {
//   try {
//     const findusers = await User.find({});
//     res.send(findusers);
//   } catch (err) {
//     res.status(400).send("Something Went wrong");
//   }
// });

// //delete user
// app.delete("/deleteuser", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     // const user = await User.findByIdAndDelete({ _id: userId });
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully..");
//   } catch (error) {
//     res.status(400).send("User not deleted");
//   }
// });

// //update user throw body
// app.patch("/updateuser", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["userId", "gender", "age", "skill"];

//     const isAllowedUpdate = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isAllowedUpdate) {
//       throw new Error("Update not allowed!!");
//     }

//     if (data?.skill.length > 5) {
//       throw new Error("your skill don't put more than 5");
//     }

//     // const user = await User.findByIdAndUpdate(userId, data ,{returnDocument:"after"});
//     // console.log(user);
//     const user = await User.findByIdAndUpdate(userId, data, {
//       runValidators: true,
//     });

//     res.send("User updated successfully..");
//   } catch (error) {
//     res.status(400).send("User not updated : " + error.message);
//   }
// });

// // update user throw params id
// app.patch("/updateuser/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     // const ALLOWED_UPDATES =  [
//     //  "gender", "age","skill","emailId","photoUrl,password"
//     // ]

//     // const isAllowedUpdate = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))

//     // if(!isAllowedUpdate){
//     //   throw new Error("Update not allowed!!")
//     // }

//     if (data?.skill.length > 5) {
//       throw new Error("your skill don't put more than 5");
//     }

//     // const user = await User.findByIdAndUpdate(userId, data ,{returnDocument:"after"});
//     // console.log(user);
//     const user = await User.findByIdAndUpdate(userId, data, {
//       runValidators: true,
//     });

//     res.send("User updated successfully..");
//   } catch (error) {
//     res.status(400).send("User not updated : " + error.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database connected successfully....");
    app.listen(7777, () => {
      console.log("🚀 Server started at port number 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connect!!!! ");
  });
