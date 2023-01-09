import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

import axios from "axios";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    console.log("bvomelasjdflasdfjkjaksjdfkj");
    setLoading(true);
    axios.post("/api/make-instructor").then((res) => {
      console.log(res);
      console.log("1",window.location.href)
      window.location.href = res.data
      console.log("2",window.location.href)

    })
    .catch((err) => {
      console.log(err.response.status)
      toast("Stripe onboarding failed . Try again")
      setLoading(false)
    })
  };
  console.log("become instructor");
  return (
    <>
      <h1 className="jumbotron text-center square">Become Instructor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <UserSwitchOutlined className="display-1 pb-3" />
            <br />
            <h2>Setup payout to publish course on Edemy</h2>
            <p className="lead text-warning">
              Edemy partners with stripe to transfer earning to your bank
              account
            </p>
            <Button
              className=" mb-3"
              type="primary"
              block
              shape="round"
              icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
              size="large"
              onClick={becomeInstructor}
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing...." : "Payout setup"}
            </Button>
            <p className="lead">
              You will be redirected to stripe to complete onboarding process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
