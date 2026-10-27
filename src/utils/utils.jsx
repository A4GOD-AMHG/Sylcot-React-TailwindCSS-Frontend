import {
    FaHome,
    FaBriefcase,
    FaFutbol,
    FaHeart,
    FaRegHeart,
    FaBook,
    FaShoppingCart,
    FaDollarSign,
    FaPlane,
    FaUsers,
    FaPaintBrush,
    FaPaw,
    FaUtensils,
    FaEllipsisH,
    FaExclamationTriangle,
    FaFlag,
    FaChevronDown,
} from 'react-icons/fa';

// Keys match the backend's category icon_name values (old Material names kept as aliases).
const categoryIcons = {
    'home': FaHome,
    'briefcase': FaBriefcase,
    'work_outline': FaBriefcase,
    'soccer': FaFutbol,
    'sports_soccer': FaFutbol,
    'heart': FaHeart,
    'favorite': FaHeart,
    'heart-outline': FaRegHeart,
    'favorite_border': FaRegHeart,
    'book': FaBook,
    'menu_book': FaBook,
    'shopping_cart': FaShoppingCart,
    'attach_money': FaDollarSign,
    'flight': FaPlane,
    'groups': FaUsers,
    'palette': FaPaintBrush,
    'pets': FaPaw,
    'restaurant': FaUtensils,
    'more_horiz': FaEllipsisH,
};

const getCategoryIcon = (categoryIcon, color) => {
    const IconComponent = categoryIcons[categoryIcon?.toLowerCase()] || FaEllipsisH;

    return <IconComponent className="text-lg" style={{ color }} />;
};

const getPriorityIcon = (priority) => {
    switch (priority) {
        case 'low':
            return <FaChevronDown className="text-green-600" />;
        case 'medium':
            return <FaExclamationTriangle className="text-yellow-500" />;
        case 'high':
            return <FaFlag className="text-red-500" />;
        default:
            return <FaExclamationTriangle />;
    }
};

export { getCategoryIcon, getPriorityIcon }