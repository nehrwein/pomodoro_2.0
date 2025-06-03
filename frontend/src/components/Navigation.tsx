import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "./ui/button";

const Navigation = () => {
  const { accessToken, setAccessToken } = useUserStore();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();

  const NavigationLinks = [
    { title: "Home", path: "/" },
    { title: "Settings", path: "/settings" },
    { title: "Report", path: "/report" },
  ];

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const onClickingLink = () => {
    // dispatch(timer.actions.deleteItems())
    // dispatch(timer.actions.setisRunning(false))
    // setSidebar(false)
  };

  const onLogOut = () => {
    setSidebar(false);
    setAccessToken(null);
    // batch(() => {
    //   dispatch(user.actions.setUserId(null))
    //   dispatch(user.actions.setUsername(null))
    //   dispatch(user.actions.setAccessToken(null))
    //   dispatch(user.actions.setError(null))
    //   dispatch(timer.actions.deleteItems())
    //   dispatch(timer.actions.setMode("work"))
    //   dispatch(timer.actions.setisRunning(false))
    //})
  };

  //TODO - icon x:  props.orange ? "var(--lightRed)" : window.location.pathname === "/" ? "var(--beige)" : "var(--lightRed)"};

  return (
    <>
      {accessToken && (
        <>
          <div className="z-10 h-8 py-1.5 flex justify-end items-center w-full absolute top-0">
            <Link to="#">
              <Menu onClick={showSidebar} />
            </Link>
          </div>
          <nav
            className={`bg-secondary border-l-2 border-red-400 h-screen flex flex-col justify-between fixed top-0 z-30 transition-all w-[250px] md:w-[400px] lg:w-[500px]`}
            style={{
              right: sidebar ? 0 : "-100%",
              transitionDuration: sidebar ? "350ms" : "850ms",
            }}
          >
            <ul className="w-full">
              <ul className="w-full h-5/6 flex items-center">
                <Link to="#">
                  <X
                    onClick={showSidebar}
                    className={`absolute top-0 right-0 mr-2.5 mt-1.5 z-30 bg-none text-3xl md:text-4xl md:mr-5 lg:text-5xl lg:mr-7 lg:mt-5`}
                  />
                </Link>
              </ul>
              {NavigationLinks.map((item) => {
                return (
                  <li
                    className="flex justify-start items-center py-2 px-0 pl-8 list-none h-16 lg:pl-20 lg:h-20"
                    key={item.title}
                  >
                    <Link
                      className="no-underline text-red-400 text-lg w-11/12 h-full flex items-center px-4 rounded hover:bg-red-400 hover:text-secondary md:text-3xl lg:text-4xl"
                      to={item.path}
                      onClick={onClickingLink}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button type="submit" onClick={onLogOut}>
              <p>Log out</p>
              <LogOut />
            </Button>
          </nav>
        </>
      )}
    </>
  );
};

export default Navigation;
