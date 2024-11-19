import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = function() {
    return (
        <footer className="sticky flex h-10 items-center justify-center bg-black bg-opacity-55 text-gray-200">
            <p>
                Made with <FontAwesomeIcon icon={faHeart} className="mx-0.5 mb-0.5 inline-block w-4" /> by AUC Students
            </p>
        </footer>
    );
};

export default Footer;
