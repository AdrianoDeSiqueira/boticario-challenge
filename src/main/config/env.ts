export default {
  specificITR: process.env.SPECIFIC_INDIVIDUAL_TAXPAYER_REGISTRATION || '15350946056',
  mongoUrl: process.env.MONGO_URL || '',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tgh098==-',
  cashbackApi: process.env.CASHBACK_API || 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback',
  cashbackApiToken: process.env.CASHBACK_API_TOKEN || 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
}
