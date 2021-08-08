const env = process.env.NODE_ENV || 'dev';

const config = () => {
  switch (env) {
    case 'dev':
      return {
        db_url: `mongodb+srv://teddiur:${process.env.MONGODB_PASSWORD}@cluster0.lge5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        jwt_pass: process.env.JWT_PASSWORD,
        jwt_expires: '7d',
      };
    case 'stg':
      return {
        db_url: `mongodb+srv://teddiur:${process.env.MONGODB_PASSWORD}@cluster0.lge5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        jwt_pass: process.env.JWT_PASSWORD,
        jwt_expires: '7d',
      };
    case 'prd':
      return {
        db_url: `mongodb+srv://teddiur:${process.env.MONGODB_PASSWORD}@cluster0.lge5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        jwt_pass: process.env.JWT_PASSWORD,
        jwt_expires: '1d',
      };
  }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
