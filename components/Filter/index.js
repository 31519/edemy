import styles from "./style.module.css";
import Share from "../Share";
import Link from "next/link";
import { useRouter } from "next/router";

import { Select, Button, Avatar, Badge } from "antd";
const { Option } = Select;

const Filter = ({
  classState,
  subState,
  years,
  setClassState,
  setSubState,
  setYears
}) => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <Select
            style={{ width: "100" }}
            size="large"
            label="Years"
            defaultValue='Years'
            onChange={(v) => {
              setYears(v);
              console.log("year", v)
            }}
          >
            <Option value="2012">2012</Option>
            <Option value="2013">2013</Option>
            <Option value="2014">2014</Option>
            <Option value="2015">2015</Option>
            <Option value="2016">2016</Option>
            <Option value="2017">2017</Option>
            <Option value="2018">2018</Option>
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
            <Option value="2021">2021</Option>
            <Option value="2022">2022</Option>

          </Select>
        </div>
        <div className={styles.box}>
        <Select
            style={{ width: "100" }}
            size="large"
            defaultValue="Class"
            onChange={(v) => {
              setClassState(v);
            }}
          >
            <Option value="1">Class 1</Option>
            <Option value="2">Class 2</Option>
            <Option value="3">Class 3</Option>
            <Option value="4">Class 4</Option>
            <Option value="5">Class 5</Option>
            <Option value="6">Class 6</Option>
            <Option value="7">Class 7</Option>
            <Option value="8">Class 8</Option>
            <Option value="9">Class 9</Option>
            <Option value="10">Class 10</Option>
            <Option value="11">Class 11</Option>
            <Option value="12">Class 12</Option>

          </Select>
        </div>
        <div className={styles.box}>
        <Select
            style={{ width: "100" }}
            size="large"
            defaultValue="Subjects"
            onChange={(v) => {
              setSubState(v);
            }}
          >
            <Option value="Mathematics">Mathematics</Option>
            <Option value="Science">Science</Option>
            <Option value="Social">Social</Option>
            <Option value="Health">Health</Option>
            <Option value="Khasi">Khasi</Option>
            <Option value="English">English</Option>

          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
