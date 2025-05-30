import { API_PATHS } from '../utils/config'
import useFetch from './useFetch';

interface CategoryType {
    Category1: string;
    icon: string;
    image: string;
    Categories2: {
        label: string;
        Categories3: string[];
    }[];
    allCategories3: string[];
}


const useCategories = () => {
    const url = API_PATHS.CATEGORIES;
    const { data, loading, error } = useFetch<CategoryType[]>(url);
    
    console.log("categories data ===> ", data);

    const categories = data;
    return { categories, loading, error }
}

export default useCategories;