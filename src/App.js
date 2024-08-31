import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/PageNotFound";
import Skills from "./Pages/Skills/Skills";
import Projects from "./Pages/Projects/Projects";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const [active, setActive] = useState("");

    const showSidebar = () => {
        setActive("active");
    };

    const closeSidebar = () => {
        setActive("");
    };

    return (
        <>
            <Router>
                <Logo />
                <Routes>

                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route
                            path="profile"
                            element={
                                <Profile
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />


                        <Route
                            path="Dashboard"
                            element={
                                <Home
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />

                        <Route
                            path="Projects"
                            element={
                                <Projects
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />

                        <Route
                            path="Skills"
                            element={
                                <Skills
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
            <Analytics />
            <SpeedInsights />
        </>
    );
}

export default App;
