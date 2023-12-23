import React from "react";
import { Link } from "react-router-dom";
import { Navbar as MTNavbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import logo from "../assets/Logo.png";

function Navbar() {
    const [openNav, setOpenNav] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <div color="transparent" className="bg-black pt-5">
            <div className="container mx-auto flex items-center justify-between text-white">
                <Link to="/">
                    <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
                        BookTopia
                    </Typography>
                </Link>
                {/* Mobile Toggle Button */}
                <div className="lg:hidden">
                    <div
                        onClick={() => setOpenNav(!openNav)}
                        className="cursor-pointer text-white text-lg"
                    >
                        {openNav ? "Close" : "Menu"}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        {[
                            {href: "/all", label: "All"},
                            {href: "/science", label: "Science" },
                            { href: "/tech", label: "Tech" },
                            { href: "/selfgrowth", label: "Self-growth" },
                            { href: "/others", label: "Others" },
                        ].map((link) => (
                            <Typography
                                key={link.href}
                                as="li"
                                variant="small"
                                color="inherit"
                                className="capitalize"
                            >
                                {/* Close mobile nav on link click */}
                                <Link
                                    to={link.href}
                                    className="flex items-center gap-1 p-1 font-bold"
                                    onClick={() => setOpenNav(false)}
                                >
                                    {link.label}
                                </Link>
                            </Typography>
                        ))}
                    </ul>
                </div>
                <div className="hidden gap-2 lg:flex">
                    <Link to="/signin">
                        <Button variant="text" size="sm" color="white" fullWidth>
                            signin
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button variant="text" size="sm" color="white" fullWidth>
                            Profile
                        </Button>
                    </Link>
                </div>
            </div>
            <MobileNav
                className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
                open={openNav}
            >
                <div className="container mx-auto">
                    {[
                        { href: "/all", label: "All" },
                        { href: "/science", label: "Science" },
                        { href: "/tech", label: "Tech" },
                        { href: "/selfgrowth", label: "Self-growth" },
                        { href: "/others", label: "Others" },
                    ].map((link) => (
                        <Typography
                            key={link.href}
                            as="li"
                            variant="small"
                            color="inherit"
                            className="capitalize mb-2"
                        >
                            <Link
                                to={link.href}
                                className="flex items-center gap-1 p-1 font-bold"
                                onClick={() => setOpenNav(false)}
                            >
                                {link.label}
                            </Link>
                        </Typography>
                    ))}

                    <Link to="/signup" className="mb-2 block">
                        <Button variant="text" size="sm" fullWidth>
                            Sign In
                        </Button>
                    </Link>

                    <Link to="/profile" className="w-full block">
                        <Button variant="text" size="sm" fullWidth>
                            Profile
                        </Button>
                    </Link>

                </div>
            </MobileNav>
        </div>
    );
}

export default Navbar;
