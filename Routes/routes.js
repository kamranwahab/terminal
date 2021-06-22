const routes = {
    // Categories
    ADD_CATEGORY:'/add',
    GET_ALL_CATEGORIES:'/',
    GET_CATEGORY:'/:id',

    // Contact-US
    CONTACT_US:'/',
    GET_CONTACTS:'/contacts',
    GET_CONTACT:'/contacts/:id',
    REPLY_TO_USER:'/contacts/reply',

    // Products 
    ADD_PRODUCT:'/add',
    GET_PRODUCT:'/:id',
    GET_ALL_PRODUCTS:'/',
    UPDATE_PRODUCT:'/:id',
    DELETE_PRODUCT:'/:id',
    GET_PRODUCTS_BY_CATEGORY:'/category/:id',
    GET_SHORT_PRODUCTS:'/short',

    // Product Reciept
    ADD_PRODUCT_RECIEPT:'/add',
    GET_PRODUCT_RECIEPTS:'/',
    GET_PRODUCT_RECIEPTS_BY_CUSTOMER:'/user/:id',
    GET_PRODUCT_RECIEPT:'/:id',
    UPDATE_PRODUCT_RECIEPT:'/:id',
    SET_STATUS_TO_DELIVER:'/deliver/:id',
    SET_STATUS_TO_SHIPPED:'/shipped/:id',

    // Product Return
    ADD_PRODUCT_RETURN:'/add/:order_id',
    GET_PRODUCT_RETURNS:'/',
    GET_PRODUCT_RETURNS_BY_CUSTOMER:'/user/:id',
    GET_PRODUCT_RETURN:'/:id',

    // Users
    REGISTER_USER:"/register",
    LOGIN_USER:'/login',
    GET_ALL_USERS:'/',
    DELETE_USER:"/:id",
    UPDATE_USER:"/:id",
    GET_USER:"/:id",
    GET_USER_PROFILE:"/profile",

    // Feedbacks
    ADD_USER_FEEDBACK:"/add",
    GET_ALL_FEEDBACK:"/",
    UPDATE_FEEDBACK:"/:id",
    DELETE_FEEDBACK:"/:id",
    
}

module.exports = routes