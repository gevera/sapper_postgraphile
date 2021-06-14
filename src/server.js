import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { postgraphile } from 'postgraphile';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		postgraphile(
			process.env.DATABASE_URL || "postgres://admin:adminpassword@localhost:5432/medical_db",
			"public",
			{
			  watchPg: true,
			  graphiql: true,
			  enhanceGraphiql: true,
			}
		  ),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
