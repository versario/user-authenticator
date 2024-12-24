import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Authentication API',
            version: '1.0.0',
            description: 'API documentation for the User Authentication project',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
    },
    apis: ['./src/user/infrastructure/routes/UserRoutes.js',
           './src/auth/infrastructure/routes/AuthRoutes.js',
          ],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
