const DB_URL = "/db.json";

const fetchDB = async () => {
    let responseObject = { errorMessage: '', data: {} };
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        const responseData = await response.json();
        responseObject.data = responseData;
    } catch (err) {
        responseObject.errorMessage = err.message;
    }
    return responseObject;
};

export const getCategories = async () => {
    const result = await fetchDB();
    if (result.errorMessage) return result;
    return {
        errorMessage: '',
        data: result.data.categories || []
    };
};

export const getProducts = async (catId) => {
    const result = await fetchDB();
    if (result.errorMessage) return result;
    const products = result.data.products || [];
    return {
        errorMessage: '',
        data: products.filter(p => p.catId === Number(catId))
    };
};

export const getProductById = async (id) => {
    const result = await fetchDB();
    if (result.errorMessage) return result;
    const products = result.data.products || [];
    const product = products.find(p => p.id === Number(id));
    return {
        errorMessage: '',
        data: product || null
    };
};

export const getProductsByQuery = async (query) => {
    const result = await fetchDB();
    if (result.errorMessage) return result;
    const products = result.data.products || [];
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    return {
        errorMessage: '',
        data: filtered
    };
};
