export const ERROR_MESSAGES = Object.freeze({
    INVALID_PAYLOAD: 'invalid_payload', //Dữ liệu gửi lên không hợp lệ
    INVALID_CREDENTIALS: 'invalid_credentials', //Thông tin đăng nhập không hợp lệ
    FEEDBACKS: Object.freeze({
        FEEDBACK_NOTFOUND: 'can_not_find_feedbacks',        //Không tìm thấy thông tin feedback
        CANNOT_CREATED: 'can_not_post_your_feedback',       //Không thể đăng feedback
    }),
    STORES: Object.freeze({
        STORE_NOTFOUND: 'can_not_find_stores',  //Không tìm thấy danh sách cửa hàng
    }),
})