import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Desc() {
    const [book, setBook] = useState({
        id: 0,
        name: '',
        background_image: '',
        rating: 0,
        category: '', // Added category to the initial state
        desc: '', // Added desc to the initial state
    });

    const { id } = useParams();

    useEffect(() => {
        async function getBook() {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden dark:bg-gray-900">
                <div className="container px-5 py-20 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            className="h-[30vh] md:h-[35vh] lg:h-[70vh] m-auto block"
                            src={book.background_image}
                            alt={book.name}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-300">
                                {book.category}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-orange-400">
                                {book.name}
                            </h1>
                            <p className="leading-relaxed dark:text-gray-300">{book.desc}</p>
                            <div className="flex mt-14">
                                <a
                                    href={`http://localhost:5000/books/${id}/download`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex ml-auto mr-16 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded "
                                >
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Desc;
