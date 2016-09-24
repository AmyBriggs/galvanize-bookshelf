exports.seed = function(knex) {
    return knex('favorites').del()
        .then(() => {
            return knex('favorites').insert([{
                id: 1,
                book_id: 1,
                user_id: 1,
                created_at: new Date('2016-06-29 14:26:16 UTC'),
                updated_at: new Date('2016-06-29 14:26:16 UTC'),
            }])
        })

}
