import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full fixed top-5 z-50">
            <div className=" px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl text-gray-800 font-extrabold">InSync</h1>
                <ul className="flex space-x-8 items-center">
                    <li>
                        <Link to="/about" className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
