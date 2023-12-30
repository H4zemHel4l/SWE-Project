import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

function Add() {
    const [book, setBook] = useState({
        name: "",
        author: "",
        description: "",
        image: "",
        category: "",
        pdfLink: "",
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            // Handle the case where the token is not present (e.g., redirect to login)
            console.error("Token not available. Redirect to login page or handle authentication.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/books/create",
                book,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Book added:", response.data);
            navigate(`/desc/${response.data.data.book._id}`);
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };



    return (
        <>
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center m-auto mt-16">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">
                        Add Book
                    </Typography>
                    <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="text-lg font-normal"
                    >
                        Add the book details to add it to the library.
                    </Typography>
                </div>
                <form
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        {["name", "author", "category", "image", "description", "pdfLink"].map(
                            (field) => (
                                <div key={field}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="-mb-3 font-medium"
                                    >
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder={field}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        name={field}
                                        value={book[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <Button className="mt-6" fullWidth type="submit">
                        Add Book
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Add;
