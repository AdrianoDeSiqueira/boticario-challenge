export default {
  specificSocialSecurityNumber: process.env.SPECIFIC_SOCIAL_SECURITY_NUMBER || '15350946056',
  mongoUrl: process.env.MONGO_URL || '',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tgh098==-'
}
