import {Typography, Input, Button} from "@material-tailwind/react";
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Edit() {
        const [book, setBook] = useState({
            id: 0,
            title: "",
            author: "",
            published: "",
            genre: "",
            cover_image: "",
            rating: 0,
        });

        let { id } = useParams();
        async function getBook() {
            let b = await axios.get(`http://localhost:5000/books/${id}`);
            setBook(b.data);
        }

        useEffect(() => {
            async function fetchBook() {
                let b = await axios.get(`http://localhost:5000/books/${id}`);
                setBook(b.data);
            }
            fetchBook();
        }, [id]);

        let navigate = useNavigate();

        function handleChange(event) {
            setBook({ ...book, [event.target.name]: event.target.value });
        }

        function handleSubmit() {
            axios.put(`http://localhost:5000/books/${id}`, book);
            navigate(`/desc/${book.id}`);
        }
    return (
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center m-auto mt-16">
            <div className="text-center">
                <Typography variant="h2" className="font-bold mb-4">Edit Book</Typography>
                <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Update the book details to Edit it to the library.</Typography>
            </div>
            <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    {['name', 'author', 'description', 'category', 'image'].map((field) => (
                        <div key={field}>
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
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
                    ))}
                </div>
                <Button className="mt-6" fullWidth type="submit">
                    Update Book
                </Button>
            </form>
        </div>
    );
}

export default Edit;