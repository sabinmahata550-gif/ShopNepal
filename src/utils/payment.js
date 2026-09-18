import axios from "axios";
import config from "../config/config.js";
const payVaiKhalti = async (data) => {
    console.log("data is ",data)
    const body = {
        "return_url": config.khalti.returnUrl,
        "website_url": config.khalti.apiUrl,
        "amount": data.amount,
        "purchase_order_id": data.purchaseOrderId,
        "purchase_order_name": data.purchaseOrderName,
        "customer_info": data.customerInfo,
    };
    const response = await axios.post(config.khalti.apiUrl, body, {
        headers: {
            Authorization: `key ${config.khalti.secretKey}`
        }
    });

    return response.data;
}

export { payVaiKhalti  }