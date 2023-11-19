import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
        console.log("Response Data", response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const examData = exams.map((exam, index) => {
    const durationInSeconds = exam.duration;
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    return (
      <>
        <Col span={6} key={index}>
          <div className="card-lg flex flex-col gap-1 p-2">
            <h1 className="text-2xl">{exam?.name}</h1>
            <h1 className="text-md">Category : {exam.category}</h1>
            <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
            <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
            <h1 className="text-md">Duration : {durationInMinutes} Minutes</h1>

            <button
              className="primary-outlined-btn"
              onClick={() => navigate(`/user/write-exam/${exam._id}`)}
            >
              Start Exam
            </button>
          </div>
        </Col>
      </>
    );
  });

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to QuizMasterPro`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {/* {exams.map((exam, index) => (
            <Col span={6} key={index}>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl">{exam?.name}</h1>

                <h1 className="text-md">Category : {exam.category}</h1>

                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))} */}
          {examData}
        </Row>
      </div>
    )
  );
}

export default Home;
