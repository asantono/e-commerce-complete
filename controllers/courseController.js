const Course = require("../schemas/course");
const { ErrorHandler } = require("../utils/ErrorHandler");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const User = require("../schemas/user");
const Sale = require("../schemas/sale");

/////////
const storage = multer.memoryStorage();

exports.fileUpload = multer({ storage });
/////////

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: "us-west-2",
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.match(/^image/)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const writeTo = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

// 5mb
const maxSize = 5 * 1024 * 1024;

const singlePhoto = multer({
  storage: writeTo,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

exports.uploadPhoto = singlePhoto;

const deleteAPhotoFunction = (key) => {
  s3.deleteObject(
    {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    },
    function (err, data) {
      if (err) {
        return next(new ErrorHandler("Delete Failed", 404));
      }
    }
  );
};

exports.deleteCourse = async (req, res, next) => {
  const { _id } = req.body;
  const authorId = req.user._id;
  const { clearance } = req.user;
  try {
    let course = await Course.findById(_id);

    if (!course) {
      return next(new ErrorHandler(400, "Course not found"));
    }

    if (
      course.owner.toString() !== authorId.toString() &&
      clearance !== "admin"
    ) {
      return next(
        new ErrorHandler(400, "You are not authorized to delete this course")
      );
    }

    if (course.img.deleteKey) {
      await deleteAPhotoFunction(course.img.deleteKey);
    }

    await Course.findByIdAndDelete(_id);
    res.status(200).json({ deleted: true });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.imageUpload = async (req, res, next) => {
  try {
    const doc = await Course.findById(req.params.courseId);
    if (!req.file) {
      return next(
        new ErrorHandler(400, "Photos must be image files under 5mb")
      );
    }

    if (doc.img.deleteKey) {
      await deleteAPhotoFunction(doc.img.deleteKey);
    }

    doc.img.url = req.file.location;
    doc.img.deleteKey = req.file.key;
    doc.markModified("img");

    await doc.save();

    res.status(200).json({ img: doc.img });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.allCourses = async (req, res, next) => {
  try {
    const course = await Course.find();
    res.status(200).json({ course });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.someCourses = async (req, res, next) => {
  try {
    const { limit, pageNum } = req.body;
    const course = await Course.find()
      .skip(limit * pageNum)
      .limit(limit);
    res.status(200).json({ course });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.searchCourses = async (req, res, next) => {
  const { query } = req.body;
  let course = [];

  try {
    const titleSearch = Course.find({
      title: { $regex: query, $options: "i" },
    });

    const authorSearch = Course.find({
      author: { $regex: query, $options: "i" },
    });

    const featuresSearch = Course.aggregate([
      {
        $match: {
          features: { $regex: query, $options: "i" },
        },
      },
    ]);

    let [title, author, feature] = await Promise.all([
      titleSearch,
      authorSearch,
      featuresSearch,
    ]);

    course = title;

    let index;

    for (let i = 0; i < author.length; i++) {
      index = course.findIndex((el) => el.title === author[i].title);
      if (index === -1) course.push(author[i]);
    }

    for (let i = 0; i < feature.length; i++) {
      index = course.findIndex((el) => el.title === feature[i].title);
      if (index === -1) course.push(feature[i]);
    }

    res.status(200).json({ course });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(400, "Query Failed, Try again later"));
  }
};

exports.createdCourses = async (req, res, next) => {
  const { _id } = req.user;
  const doc = await User.findById(_id);

  try {
    if (!doc) {
      return next(new ErrorHandler(400, "User not found"));
    }

    const { coursesCreated } = doc;

    if (!coursesCreated) {
      return next(new ErrorHandler(400, "No Courses Created"));
    }

    res.status(200).json({ course: coursesCreated });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.createCourse = async (req, res, next) => {
  const {
    title,
    img,
    author,
    price,
    saleOptIn,
    position,
    length,
    accessType,
    certification,
    tagline,
    adText,
    features,
  } = req.body;

  const { _id } = req.user;

  try {
    const courseCreator = await User.findById(_id);

    if (!courseCreator) {
      return next(
        new ErrorHandler(400, "You must be an instructor to create a course")
      );
    }

    const newCourse = await Course.create({
      owner: _id,
      title,
      img,
      author,
      price,
      saleOptIn,
      position,
      length,
      accessType,
      certification,
      tagline,
      adText,
      features,
    });

    if (!newCourse) {
      return next(
        new ErrorHandler(400, "You must be an instructor to create a course")
      );
    }

    courseCreator.coursesCreated = [
      ...courseCreator.coursesCreated,
      newCourse._id,
    ];

    courseCreator.markModified("coursesCreated");
    await courseCreator.save();

    res.status(201).json({ newCourse });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.editCourse = async (req, res, next) => {
  const { _id } = req.body;
  const authorId = req.user._id;
  const { clearance } = req.user;
  try {
    const courseToEdit = await Course.findById(_id);

    if (!courseToEdit) {
      return next(new ErrorHandler(400, "Course Not Found"));
    }

    if (
      courseToEdit.owner.toString() !== authorId.toString() &&
      clearance !== "admin"
    ) {
      return next(
        new ErrorHandler(400, "You do not have permission to edit this course")
      );
    }

    for (let prop in req.body) {
      courseToEdit[prop] = req.body[prop];
    }

    courseToEdit.markModified("features");

    courseToEdit.save();

    res.status(201).json({ newCourse: courseToEdit });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.getSale = async (req, res, next) => {
  try {
    const sale = await Sale.findOne({ name: "current" });
    if (!sale) {
      return next(new ErrorHandler(400, "Sale Not Found"));
    }
    res.status(200).json({ sale });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};
