export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H',
  pgUrl: process.env.PG_URL || 'postgresql://postgres:postgres@localhost:5432/cleannodeapi'
}
