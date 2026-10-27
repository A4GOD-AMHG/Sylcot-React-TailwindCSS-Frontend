import { useCallback, useState } from 'react';
import CategoryService from '@/services/CategoryService';
import { notifyError } from '@/utils/toast';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await CategoryService.getCategories();
            setCategories(data || []);
        } catch (error) {
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { categories, loading, getCategories };
};

export default useCategories;
