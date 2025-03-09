import { registerAs } from "@nestjs/config";

export default registerAs('appConfig', () => ({
    port: parseInt(process.env.PORT) || 3000,
}));