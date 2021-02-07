const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/allcourses").get(courseController.allCourses);

router.route("/morecourses").post(courseController.someCourses);

router.route("/searchCourses").post(courseController.searchCourses);

router.route("/sale").get(courseController.getSale);

router.use(authController.addUserToRequest);

router.route("/createCourse").post(courseController.createCourse);

router.route("/deleteCourse").post(courseController.deleteCourse);

router.route("/editCourse").post(courseController.editCourse);

router.route("/uploadImage/:courseId").post(
  //courseController.fileUpload.single("images"),
  courseController.uploadPhoto.single("images"),
  courseController.imageUpload
);

router.route("/createdCourses").get(courseController.createdCourses);

module.exports = router;
