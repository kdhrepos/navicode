import { Sequelize } from "sequelize-typescript";
import { Company } from "src/model/company.model";
import { Contraction } from "src/model/contraction.model";
import { Employee } from "src/model/employee.model";
import { Restaurant } from "src/model/restaurant.model";
import { Sale } from "src/model/sale.model";
import { Ticket } from "src/model/ticket.model";

export const databaseProviders = [
	{
		provide: "SEQUELIZE",
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: "mysql",
				host: "localhost",
				port: 8194,
				username: "root",
				password: "qwe123",
				database: "navicode",
			});
			sequelize.addModels([Company,Contraction,Ticket,Restaurant,Sale,Employee]);
			await sequelize.sync();
			// await sequelize.sync({alter : true});
			// await sequelize.sync({force : true});

			return sequelize;
		},
	},
];
