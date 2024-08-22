// Parser obiektów
module.exports = {
    parse: (obj) => {
        const recursiveParse = (data) => {
            if (typeof data === 'object' && data !== null) {
                for (const key in data) {
                    data[key] = recursiveParse(data[key]);
                }
            }
            return data;
        };
        return recursiveParse(obj);
    }
};