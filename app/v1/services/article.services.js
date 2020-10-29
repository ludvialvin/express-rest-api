const knex = require("../../../plugins/db.js");

const Article = function(article) {};

Article.getAll = async (result) => {
    try {
		let resArticles = await knex('articles as a')
		.select('a.*', 'b.title as category', 'c.title as sub_category')
		.leftJoin('content_articles_categories as b', 'b.id', '=', 'a.category_id')
		.leftJoin('content_articles_sub_categories as c', 'c.id', '=', 'a.sub_category_id')
		.where('a.is_deleted', 0)
		.orderBy('id', 'desc');
        result(null, resArticles)
    }
    catch (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }
};

module.exports = Article;
