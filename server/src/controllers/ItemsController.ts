import {Request,Response} from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(req:Request,res:Response){
        const items=await knex('items').select('*');
    
        const serializedItem=items.map(item=>{
            return {
                id:item.id,
                title:item.title,
                image_url:`http://192.168.1.160:3333/uploads/${item.image}`, 
            }
        })
    
        return res.json(serializedItem);
    }
}

export default ItemsController;