// https://gngsn.tistory.com/69?category=851217
//swagger 참고하기 yml버전
const swaggerUi = require('swagger-ui-express'); 
const swaggereJsdoc = require('swagger-jsdoc'); 

const options = { 
    swaggerDefinition: { 
        info: { 
            title: 'prac_sql TEST API', 
            version: '1.0.0', 
            description: 'Test API with express', 
        }, 
        host: 'localhost:5000', 
        basePath: '/' 
    }, 

    // apis 는 내가 설정한 api들을 swagger가 찾을 수 있도록 표시함.
    // "/routes 파일 아래 js 파일 내에 정의 하고 있으며, 
    // /swagger 폴더 아래 swagger 설정을 정의하고 있다"를 명시함.
    apis: ['./routes/*.js', './swagger/*'] 
}; 

const specs = swaggereJsdoc(options); 

module.exports = { 
    swaggerUi, 
    specs 
};