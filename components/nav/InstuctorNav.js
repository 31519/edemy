import { useState, useEffect, useContext } from "react";

import Link from 'next/link'


const InstuctorNav = () => {

    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
        // console.log("pathname", window.location.pathname)
      }, [process.browser && window.location.pathname]);
    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link href="/instructor">
                <p className={`nav-link ${current === '/instructor' && "active"}`}>Dashboard</p>
            </Link>
            <Link href="/instructor/course/create">
                <p className={`nav-link ${current === '/instructor/course/create' && "active"}`}>Course create</p>
            </Link>
        </div>
    )

}
export default InstuctorNav