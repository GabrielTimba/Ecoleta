import {Request,Response} from 'express';
import knex from '../database/connection';

class PointsControllers{

    async create(req:Request,res:Response){
        const {name,email,whatsapp,latitude,longitude,city,uf,items}= req.body;

        const trx=await knex.transaction();
        const points={
            image:req.file.filename ,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const ids =await trx('points').insert(points);

        const point_id=ids[0];

        const pointItems=items
            .split(',')
            .map((item:string)=>Number(item.trim()))
            .map((item: Number)=>{
                return {
                    item_id:item,
                    point_id
                }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return res.json({id:point_id,...points});
    }

    async show(req:Request,res:Response){
        const id =req.params.id;

        const point=await knex('points').where('id',id).select('*').first();

        if(!point){
            return res.status(400).json({message:'point not found'});
        }
        const items = await knex('items')
                    .join('point_items','items.id','=','point_items.item_id')
                    .where('point_items.point_id',id)
                    .select('items.title');
        const serializedPoint={
            ...point,
            image_url:`http://192.168.1.160:3333/uploads/${point.image}`, 
        }
        return res.json({point:serializedPoint,items});
    }

    async index(req:Request,res:Response){
        const {city,uf,items}= req.query;

        const parsedItems= String(items).split(',').map(item=>Number(item.trim()));
        const points= await knex('points')
                    .join('point_items','point_items.point_id','=','points.id')
                    .whereIn('point_items.item_id',parsedItems)
                    .where('city',String(city))
                    .where('uf',String(uf))
                    .distinct()
                    .select('points.*');

        const serializedPoints=points.map(point=>{
            return {
                ...points,
                image_url:`http://192.168.1.160:3333/uploads/${point.image}`, 
            }
        })

        return res.json(serializedPoints);
    }

}

export default PointsControllers;