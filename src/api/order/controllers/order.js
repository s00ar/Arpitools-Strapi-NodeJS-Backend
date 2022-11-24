'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query };
        const { data, meta } = await super.find(ctx);
        meta.date = Date.now();

        let startingRange = ctx.query.filters?.id?.$gte?.[0]
        let endingRange = ctx.query.filters?.id?.$lte?.[0]
        let sellers_amount = []
        if (startingRange && endingRange) {
            sellers_amount = await strapi.db.connection.raw(`
                SELECT  seller_id,sum(amount),name FROM arpitools_api.orders_seller_links
                INNER JOIN orders ON orders.id=orders_seller_links.order_id
                INNER JOIN sellers ON sellers.id=orders_seller_links.seller_id
                where order_id >= ${startingRange} and order_id <= ${endingRange}
                GROUP BY orders_seller_links.seller_id
            `)
            sellers_amount = sellers_amount[0] ? JSON.parse(JSON.stringify(sellers_amount[0])) : []
        }
        return { data, meta, sellers_amount };
    }
}));
