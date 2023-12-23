import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Desc() {
    const [book, setBook] = useState({
        id: 0,
        name: '',
        author: '',
        description: '',
        image: '',
        category: '',
        pdfLink: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getBook() {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBook(data);
                } else {
                    console.error('Failed to fetch book data');
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        }

        getBook();
    }, [id]);

    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:5000/books/${book.id}`);
            navigate(`/${book.category}`);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden dark:bg-gray-900">
                <div className="container px-5 py-20 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            className="h-[30vh] md:h-[35vh] lg:h-[70vh] m-auto block"
                            src={book.image}
                            alt={book.name}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-orange-400">
                                {book.name}
                            </h1>
                            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-300">
                                {book.author}
                            </h2>
                            <p className="leading-relaxed dark:text-gray-300">{book.description}</p>
                            <div className="flex flex-wrap mt-14">
                                <Link
                                    to={book.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex m-auto text-white bg-green-900 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded"
                                >
                                    Download PDF
                                </Link>
                                <Link
                                    to={`/edit/${book.id}`}
                                    className="flex m-auto text-white bg-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={deleteBook}
                                    className="flex m-auto text-white bg-red-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Desc;
