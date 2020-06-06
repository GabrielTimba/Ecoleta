import Knex from 'knex';

export async function seed(knex:Knex){
    await knex('items').insert([
        {title:'Lampadas',image:'lampadas.svg'},
        {title:'Pilhas e Baterias',image:'baterias.svg'},
        {title:'Papeis e papelao',image:'papeis-papelao.svg'},
        {title:'Residuos Electronicos',image:'eletronicos.svg'},
        {title:'Residuos Organicos',image:'organicos.svg'},
        {title:'Oleo de Cozinha',image:'oleo.svg'}
    ])
}