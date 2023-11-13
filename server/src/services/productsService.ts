import { Types } from "mongoose";
import productsDal from "../dal/productsDal.js";
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";


const getProductByID  = async (ID: Types.ObjectId) => {
    const product = productsDal.getProductByID(ID)

    if(!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)

    return product
}

const increaseClickedCount = async (ID: Types.ObjectId) => {
    const increased = await productsDal.increaseClickedCount(ID)
        if(!increased) throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return increased;
};

const deleteQuantity = async (ID: Types.ObjectId,quantityToDelete: number) => {
    const product = await productsDal.getProductQuantity(ID)

    if(!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    console.log(product.quantity,quantityToDelete);
    
    if (product.quantity < quantityToDelete)
        throw new RequestError(`there is only ${product.quantity} in stock`,STATUS_CODES.BAD_REQUEST)

    return await productsDal.deleteQuantity(ID,quantityToDelete)
}

export default {getProductByID, increaseClickedCount, deleteQuantity}