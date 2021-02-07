import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  sendCourseImage,
  getMyCourses,
} from "../../redux/actions/courseActions";

const DropZone = () => {
  const { sendImage, coursesCreated } = useSelector(
    (state) => state.courseReducer
  );
  const courseId = coursesCreated._id;
  const [files, setFiles] = useState([]);
  const formData = new FormData();

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5000000,
    minSize: 1000,
    onDrop: (acceptedFiles) => {
      formData.append("files", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (sendImage) {
      dispatch(sendCourseImage(files, courseId));
      history.replace("/teacherhome");
    }
    return () => history.replace("/teacherhome");
  }, [sendImage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const thumbs = files.map((file) => (
    <div className="dropzone__preview" key={file.name}>
      <img
        className="dropzone__preview--image"
        src={file.preview}
        alt="preview failed"
      />
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="dropzone__flexed">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="dropzone__container" />
        <div className="dropzone__text">
          Drag 'n' drop your course image here
        </div>
        <div className="dropzone__text"> or </div>
        <div className="dropzone__button">select your course image</div>
        <div className="dropzone__max">max: 1 image</div>
      </div>
      <div>{fileRejectionItems}</div>
      <div>{thumbs}</div>
    </div>
  );
};

export default DropZone;
