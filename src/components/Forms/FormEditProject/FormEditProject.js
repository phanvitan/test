import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
  UPDATE_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("submit edit");
  // };

  useEffect(() => {
    // setFieldValue('descriptopn',values.description);

    //goi api load project category
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });

    ///load su kien submit len drawer nut submit
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select name="categoryId" value={values.categoryId}>
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Descripiton</p>
            <Editor
              name="description123"
              initialValue={values.description}
              value={values.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('values',values)
    ///khi nguoi dung click submit: dua du lieu tu front end ve backend thong qua api
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    });
  },
  displayName: "EditProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});
export default connect(mapStateToProps)(EditProjectForm);
