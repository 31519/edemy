import Head from "next/head";
import Image from "next/image";
import CourseDetail from "../../components/CourseDetail"

export default function Detail() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CourseDetail/>


    </div>
  );
}
