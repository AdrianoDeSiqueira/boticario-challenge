export default {
  specificITR: process.env.SPECIFIC_INDIVIDUAL_TAXPAYER_REGISTRATION || '15350946056',
  mongoUrl: process.env.MONGO_URL || '',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tgh098==-'
}
