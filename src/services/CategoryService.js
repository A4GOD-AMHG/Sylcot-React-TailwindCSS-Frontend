import api from '@/services/api';

const CategoryService = {
    getCategories: async () => (await api.get('/categories')).data,
};

export default CategoryService;
