module.exports = {
    runModel: async (model, data) => {
        try {
            const result = await model.predict(data);
            return result;
        } catch (error) {
            throw new Error('Error running model: ' + error.message);
        }
    },
    
    validateInput: (data) => {
        // Implement input validation logic here
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid input data');
        }
    }
};