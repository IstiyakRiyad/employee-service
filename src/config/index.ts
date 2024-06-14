import dotenv from 'dotenv';
import { ConfigSchema } from './configSchema';


class Config {
	config: ConfigSchema;

	constructor() {
		this.loadAndValidateConfig()
	}

	loadAndValidateConfig() {
		dotenv.config();
		const response = ConfigSchema.safeParse(process.env);

		if(response.success) {
			this.config = response.data;
		}
		else {
			console.log("Config is failed");
			console.log(response.error);
			process.exit(1);
		}
	}
}

export default new Config().config;
